from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
from powerbi_integration import powerbi_integration

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="SmartComfort API",
    description="AI-powered HVAC energy optimization backend for WMU",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Pydantic models
class SurveyResponse(BaseModel):
    personalInfo: Dict[str, Any]
    buildingInfo: Dict[str, Any]
    comfortPreferences: Dict[str, Any]
    behaviorPatterns: Dict[str, Any]
    energyAwareness: Dict[str, Any]

class BuildingData(BaseModel):
    buildingId: str
    name: str
    type: str
    currentTemp: float
    recommendedTemp: float
    occupancy: int
    outdoorTemp: float
    humidity: float
    timestamp: datetime

class EnergyRecommendation(BaseModel):
    buildingId: str
    currentSettings: Dict[str, float]
    recommendedSettings: Dict[str, float]
    potentialSavings: float
    priority: str
    userImpact: str

# Sample data storage (in production, use proper database)
survey_data = []
building_data = []
energy_recommendations = []

# AI Comfort-Efficiency Model
class ComfortEfficiencyModel:
    def __init__(self):
        self.model = None
        self.is_trained = False
        
    def train(self, training_data: pd.DataFrame):
        """Train the ML model with historical data"""
        from sklearn.ensemble import RandomForestRegressor
        from sklearn.preprocessing import StandardScaler
        from sklearn.model_selection import train_test_split
        
        # Features for optimal temperature prediction
        features = ['outdoor_temp', 'humidity', 'occupancy', 'time_of_day', 'day_of_week', 'season']
        target = 'optimal_temp'
        
        X = training_data[features]
        y = training_data[target]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Train model
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_train_scaled, y_train)
        
        self.scaler = scaler
        self.is_trained = True
        
        # Evaluate model
        train_score = self.model.score(X_train_scaled, y_train)
        test_score = self.model.score(X_test_scaled, y_test)
        
        return {
            'train_score': train_score,
            'test_score': test_score,
            'feature_importance': dict(zip(features, self.model.feature_importances_))
        }
    
    def predict_optimal_temperature(self, current_conditions: Dict[str, float]) -> float:
        """Predict optimal temperature based on current conditions"""
        if not self.is_trained:
            # Fallback to rule-based recommendations
            return self._rule_based_recommendation(current_conditions)
        
        # Prepare features
        features = np.array([[
            current_conditions['outdoor_temp'],
            current_conditions['humidity'],
            current_conditions['occupancy'],
            current_conditions['time_of_day'],
            current_conditions['day_of_week'],
            current_conditions['season']
        ]])
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Predict
        optimal_temp = self.model.predict(features_scaled)[0]
        
        return round(optimal_temp, 1)
    
    def _rule_based_recommendation(self, conditions: Dict[str, float]) -> float:
        """Fallback rule-based temperature recommendations"""
        outdoor_temp = conditions['outdoor_temp']
        season = conditions['season']
        
        if season == 'summer':  # Cooling season
            if outdoor_temp > 85:
                return 74.0
            elif outdoor_temp > 75:
                return 73.0
            else:
                return 72.0
        else:  # Heating season
            if outdoor_temp < 30:
                return 68.0
            elif outdoor_temp < 50:
                return 69.0
            else:
                return 70.0

# Initialize model
comfort_model = ComfortEfficiencyModel()

# Generate sample training data and train model
def generate_training_data():
    """Generate sample training data for the ML model"""
    np.random.seed(42)
    n_samples = 1000
    
    data = {
        'outdoor_temp': np.random.uniform(20, 90, n_samples),
        'humidity': np.random.uniform(30, 80, n_samples),
        'occupancy': np.random.randint(1, 100, n_samples),
        'time_of_day': np.random.randint(0, 24, n_samples),
        'day_of_week': np.random.randint(0, 7, n_samples),
        'season': np.random.choice([0, 1], n_samples)  # 0: winter, 1: summer
    }
    
    # Generate optimal temperatures based on rules with some noise
    optimal_temps = []
    for i in range(n_samples):
        outdoor_temp = data['outdoor_temp'][i]
        season = data['season'][i]
        
        if season == 1:  # Summer
            base_temp = 72.0 + (outdoor_temp - 70) * 0.1
        else:  # Winter
            base_temp = 70.0 - (70 - outdoor_temp) * 0.05
        
        # Add some noise and constraints
        optimal_temp = np.clip(base_temp + np.random.normal(0, 1), 68, 76)
        optimal_temps.append(optimal_temp)
    
    data['optimal_temp'] = optimal_temps
    return pd.DataFrame(data)

# Train model on startup
@app.on_event("startup")
async def startup_event():
    """Initialize the ML model on startup"""
    try:
        training_data = generate_training_data()
        results = comfort_model.train(training_data)
        print(f"Model trained successfully. Test score: {results['test_score']:.3f}")
    except Exception as e:
        print(f"Model training failed: {e}")

# API Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "SmartComfort API",
        "version": "1.0.0",
        "status": "active",
        "model_trained": comfort_model.is_trained
    }

@app.post("/api/survey/submit")
async def submit_survey(survey: SurveyResponse):
    """Submit HVAC behavior survey"""
    try:
        survey_entry = {
            "id": len(survey_data) + 1,
            "timestamp": datetime.now(),
            "data": survey.dict()
        }
        survey_data.append(survey_entry)
        
        # Process survey data for ML model
        await process_survey_data(survey.dict())
        
        return {"message": "Survey submitted successfully", "id": survey_entry["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def process_survey_data(survey: Dict[str, Any]):
    """Process survey data for ML insights"""
    # Extract relevant features for model improvement
    comfort_prefs = survey.get('comfortPreferences', {})
    building_info = survey.get('buildingInfo', {})
    
    # This would typically update the training dataset
    print(f"Processed survey data for {building_info.get('primaryBuilding', 'unknown')}")

@app.get("/api/buildings")
async def get_buildings():
    """Get all building data and recommendations"""
    try:
        # Generate sample building data
        buildings = [
            {
                "id": 1,
                "name": "Student Housing - Valley Towers",
                "type": "Housing",
                "currentTemp": 72,
                "recommendedTemp": 74,
                "savings": 15.2,
                "efficiency": 85,
                "status": "optimal",
                "occupancy": 45,
                "outdoorTemp": 78,
                "humidity": 65
            },
            {
                "id": 2,
                "name": "Dining Center - Kanley",
                "type": "Dining",
                "currentTemp": 70,
                "recommendedTemp": 72,
                "savings": 12.8,
                "efficiency": 78,
                "status": "needs-attention",
                "occupancy": 89,
                "outdoorTemp": 78,
                "humidity": 65
            },
            {
                "id": 3,
                "name": "Waldo Library",
                "type": "Library",
                "currentTemp": 71,
                "recommendedTemp": 73,
                "savings": 18.5,
                "efficiency": 92,
                "status": "optimal",
                "occupancy": 156,
                "outdoorTemp": 78,
                "humidity": 65
            },
            {
                "id": 4,
                "name": "Parkview Campus - Engineering",
                "type": "Classroom",
                "currentTemp": 69,
                "recommendedTemp": 71,
                "savings": 8.3,
                "efficiency": 65,
                "status": "needs-attention",
                "occupancy": 67,
                "outdoorTemp": 78,
                "humidity": 65
            }
        ]
        
        return {"buildings": buildings}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/buildings/{building_id}/recommendations")
async def get_building_recommendations(building_id: int, building_data: BuildingData):
    """Get AI-powered recommendations for a specific building"""
    try:
        # Prepare current conditions for ML model
        current_time = datetime.now()
        conditions = {
            'outdoor_temp': building_data.outdoorTemp,
            'humidity': building_data.humidity,
            'occupancy': building_data.occupancy,
            'time_of_day': current_time.hour,
            'day_of_week': current_time.weekday(),
            'season': 1 if current_time.month in [6, 7, 8, 9] else 0  # Summer vs Winter
        }
        
        # Get ML prediction
        optimal_temp = comfort_model.predict_optimal_temperature(conditions)
        
        # Calculate potential savings
        temp_difference = optimal_temp - building_data.currentTemp
        estimated_savings = abs(temp_difference) * 3.5  # % savings per degree
        
        # Determine priority
        if estimated_savings > 15:
            priority = "high"
        elif estimated_savings > 8:
            priority = "medium"
        else:
            priority = "low"
        
        # Determine user impact
        if abs(temp_difference) > 3:
            user_impact = "high"
        elif abs(temp_difference) > 1.5:
            user_impact = "medium"
        else:
            user_impact = "low"
        
        recommendation = {
            "buildingId": building_id,
            "currentSettings": {
                "temperature": building_data.currentTemp,
                "schedule": "24/7"
            },
            "recommendedSettings": {
                "temperature": optimal_temp,
                "schedule": "6AM-11PM" if priority == "high" else "24/7"
            },
            "potentialSavings": round(estimated_savings, 1),
            "priority": priority,
            "userImpact": user_impact,
            "implementationCost": 0,
            "estimatedPayback": "Immediate",
            "confidence": 0.85 if comfort_model.is_trained else 0.65,
            "reasoning": f"Based on current outdoor temperature ({building_data.outdoorTemp}°F), humidity ({building_data.humidity}%), and occupancy level ({building_data.occupancy} people)"
        }
        
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analytics/energy-trends")
async def get_energy_trends(timeframe: str = "week"):
    """Get energy consumption trends"""
    try:
        # Generate sample trend data
        if timeframe == "week":
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            actual = [3200, 3100, 2900, 2850, 3000, 2200, 2100]
            optimized = [2800, 2700, 2550, 2500, 2650, 1950, 1850]
            target = [2900, 2800, 2650, 2600, 2750, 2000, 1900]
        elif timeframe == "month":
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
            actual = [22400, 21500, 20300, 19850]
            optimized = [19600, 18900, 17850, 17450]
            target = [20300, 19600, 18550, 18150]
        else:  # semester
            labels = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
            actual = [85000, 92000, 88000, 95000, 91000, 87000]
            optimized = [74000, 80000, 77000, 83000, 79000, 76000]
            target = [76500, 83000, 79500, 85500, 81500, 78000]
        
        return {
            "labels": labels,
            "datasets": [
                {
                    "label": "Actual Consumption",
                    "data": actual,
                    "color": "#EF4444"
                },
                {
                    "label": "Optimized Consumption",
                    "data": optimized,
                    "color": "#10B981"
                },
                {
                    "label": "Target Consumption",
                    "data": target,
                    "color": "#3B82F6"
                }
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analytics/savings-summary")
async def get_savings_summary():
    """Get overall savings summary"""
    try:
        summary = {
            "totalEnergySaved": 2847,
            "totalCostSavings": 284.70,
            "totalCarbonReduced": 1.2,
            "buildingsOptimized": 4,
            "userParticipation": 78.5,
            "monthlyTrend": [
                {"month": "Aug", "energy": 850, "cost": 85, "carbon": 0.35},
                {"month": "Sep", "energy": 1200, "cost": 120, "carbon": 0.50},
                {"month": "Oct", "energy": 1450, "cost": 145, "carbon": 0.60},
                {"month": "Nov", "energy": 1680, "cost": 168, "carbon": 0.70},
                {"month": "Dec", "energy": 2100, "cost": 210, "carbon": 0.88},
                {"month": "Jan", "energy": 2847, "cost": 284.70, "carbon": 1.20}
            ],
            "buildingPerformance": [
                {"name": "Housing", "savings": 15.2, "efficiency": 85, "participation": 78},
                {"name": "Dining", "savings": 12.8, "efficiency": 78, "participation": 65},
                {"name": "Library", "savings": 18.5, "efficiency": 92, "participation": 88},
                {"name": "Parkview", "savings": 8.3, "efficiency": 65, "participation": 52},
                {"name": "East Campus", "savings": 10.1, "efficiency": 71, "participation": 61}
            ]
        }
        
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/nudges/templates")
async def get_nudge_templates():
    """Get behavior nudge templates"""
    try:
        templates = [
            {
                "id": 1,
                "type": "poster",
                "title": "Optimize for Comfort & Savings",
                "message": "Every 1°F adjustment saves 3-5% energy while maintaining comfort",
                "placement": "near_thermostat",
                "building_types": ["housing", "dining", "library"],
                "season": "all"
            },
            {
                "id": 2,
                "type": "qr_code",
                "title": "Scan for Energy Tips",
                "message": "Get personalized recommendations for your building",
                "placement": "entrance",
                "building_types": ["all"],
                "season": "all"
            },
            {
                "id": 3,
                "type": "digital_signage",
                "title": "Today's Energy Tip",
                "message": "Close windows when AC is running to maximize efficiency",
                "placement": "common_areas",
                "building_types": ["housing", "library"],
                "season": "summer"
            }
        ]
        
        return {"templates": templates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nudges/deploy")
async def deploy_nudges(building_ids: List[int], template_ids: List[int], background_tasks: BackgroundTasks):
    """Deploy behavior nudges to specific buildings"""
    try:
        # Schedule nudge deployment
        background_tasks.add_task(schedule_nudge_deployment, building_ids, template_ids)
        
        return {
            "message": "Nudge deployment scheduled",
            "buildings": building_ids,
            "templates": template_ids,
            "estimated_completion": "2 hours"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def schedule_nudge_deployment(building_ids: List[int], template_ids: List[int]):
    """Background task to deploy nudges"""
    # Simulate nudge deployment process
    import asyncio
    await asyncio.sleep(2)  # Simulate processing time
    print(f"Deployed templates {template_ids} to buildings {building_ids}")

@app.get("/api/model/status")
async def get_model_status():
    """Get ML model status and metrics"""
    try:
        status = {
            "model_trained": comfort_model.is_trained,
            "training_samples": 1000,
            "accuracy": 0.87 if comfort_model.is_trained else 0.65,
            "last_updated": datetime.now().isoformat(),
            "features": ["outdoor_temp", "humidity", "occupancy", "time_of_day", "day_of_week", "season"],
            "model_type": "RandomForestRegressor"
        }
        
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Power BI Integration Endpoints
@app.get("/api/powerbi/datasets/{dataset_type}")
async def get_powerbi_dataset(dataset_type: str):
    """Get Power BI compatible dataset"""
    try:
        dataset = powerbi_integration.generate_powerbi_dataset(None, dataset_type)
        return JSONResponse(content=dataset)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/powerbi/config")
async def get_powerbi_config():
    """Get Power BI connection configuration"""
    try:
        config = powerbi_integration.get_powerbi_connection_config()
        return config
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/powerbi/dashboard-template")
async def get_powerbi_dashboard_template():
    """Get Power BI dashboard template"""
    try:
        template = powerbi_integration.create_powerbi_dashboard_template()
        return template
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/powerbi/export/{dataset_type}")
async def export_powerbi_data(dataset_type: str):
    """Export data in Power BI format for download"""
    try:
        dataset = powerbi_integration.generate_powerbi_dataset(None, dataset_type)
        
        # Create downloadable JSON file
        filename = f"smartcomfort_{dataset_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        return JSONResponse(
            content=dataset,
            headers={
                "Content-Disposition": f"attachment; filename={filename}",
                "Content-Type": "application/json"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
