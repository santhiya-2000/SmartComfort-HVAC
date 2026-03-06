"""
Power BI Integration Module for SmartComfort Dashboard
Provides data export and API endpoints for Power BI connectivity
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any
import json
from fastapi import HTTPException
from sqlalchemy.orm import Session

class PowerBIIntegration:
    """Handles data preparation and export for Power BI integration"""
    
    def __init__(self):
        self.data_cache = {}
        self.last_update = None
    
    def prepare_energy_consumption_data(self, db: Session, time_range: str = "month") -> pd.DataFrame:
        """Prepare energy consumption data for Power BI"""
        # Sample data structure - in production, query from database
        dates = pd.date_range(
            start=datetime.now() - timedelta(days=30),
            end=datetime.now(),
            freq='H'
        )
        
        data = []
        for date in dates:
            # Simulate different patterns for different building types
            hour = date.hour
            day_of_week = date.weekday()
            is_weekend = day_of_week >= 5
            
            # Base consumption with time-based patterns
            if 6 <= hour <= 22 and not is_weekend:
                base_consumption = np.random.normal(100, 15)
            elif 6 <= hour <= 22 and is_weekend:
                base_consumption = np.random.normal(60, 10)
            else:
                base_consumption = np.random.normal(40, 8)
            
            # Add building-specific variations
            buildings = [
                {
                    'Timestamp': date,
                    'Building_Name': 'Student Housing',
                    'Building_Type': 'Housing',
                    'Energy_Consumption_kWh': base_consumption * np.random.uniform(0.8, 1.2),
                    'Occupancy_Count': np.random.randint(20, 100) if not is_weekend else np.random.randint(5, 30),
                    'Outdoor_Temperature': np.random.uniform(60, 85),
                    'HVAC_Mode': 'cooling' if hour > 10 else 'auto',
                    'Cost_Dollars': base_consumption * 0.10,
                    'Carbon_Emission_kg': base_consumption * 0.0004
                },
                {
                    'Timestamp': date,
                    'Building_Name': 'Dining Center',
                    'Building_Type': 'Dining',
                    'Energy_Consumption_kWh': base_consumption * np.random.uniform(0.6, 0.9),
                    'Occupancy_Count': np.random.randint(10, 50) if 7 <= hour <= 19 and not is_weekend else np.random.randint(2, 15),
                    'Outdoor_Temperature': np.random.uniform(60, 85),
                    'HVAC_Mode': 'cooling' if hour > 10 else 'auto',
                    'Cost_Dollars': base_consumption * 0.10,
                    'Carbon_Emission_kg': base_consumption * 0.0004
                },
                {
                    'Timestamp': date,
                    'Building_Name': 'Library',
                    'Building_Type': 'Library',
                    'Energy_Consumption_kWh': base_consumption * np.random.uniform(0.9, 1.3),
                    'Occupancy_Count': np.random.randint(30, 150) if not is_weekend else np.random.randint(10, 50),
                    'Outdoor_Temperature': np.random.uniform(60, 85),
                    'HVAC_Mode': 'cooling' if hour > 10 else 'auto',
                    'Cost_Dollars': base_consumption * 0.10,
                    'Carbon_Emission_kg': base_consumption * 0.0004
                },
                {
                    'Timestamp': date,
                    'Building_Name': 'Parkview Campus',
                    'Building_Type': 'Classroom',
                    'Energy_Consumption_kWh': base_consumption * np.random.uniform(0.7, 1.0),
                    'Occupancy_Count': np.random.randint(15, 80) if 8 <= hour <= 18 and not is_weekend else np.random.randint(2, 20),
                    'Outdoor_Temperature': np.random.uniform(60, 85),
                    'HVAC_Mode': 'cooling' if hour > 10 else 'auto',
                    'Cost_Dollars': base_consumption * 0.10,
                    'Carbon_Emission_kg': base_consumption * 0.0004
                }
            ]
            data.extend(buildings)
        
        return pd.DataFrame(data)
    
    def prepare_savings_summary_data(self, db: Session) -> pd.DataFrame:
        """Prepare savings summary data for Power BI"""
        # Sample savings data
        buildings = ['Student Housing', 'Dining Center', 'Library', 'Parkview Campus', 'East Campus']
        
        data = []
        for building in buildings:
            # Generate monthly savings data
            for month in range(1, 7):  # Last 6 months
                base_savings = np.random.uniform(500, 2000)
                efficiency_improvement = np.random.uniform(5, 20)
                
                data.append({
                    'Building_Name': building,
                    'Month': month,
                    'Year': 2024,
                    'Energy_Saved_kWh': base_savings * (1 + month * 0.1),
                    'Cost_Saved_Dollars': base_savings * 0.10 * (1 + month * 0.1),
                    'Carbon_Reduced_kg': base_savings * 0.0004 * (1 + month * 0.1),
                    'Efficiency_Improvement_Percent': efficiency_improvement,
                    'User_Participation_Percent': np.random.uniform(60, 90),
                    'Recommendation_Count': np.random.randint(5, 15),
                    'Implemented_Count': np.random.randint(2, 8)
                })
        
        return pd.DataFrame(data)
    
    def prepare_behavior_insights_data(self, db: Session) -> pd.DataFrame:
        """Prepare behavior insights data for Power BI"""
        # Sample behavior data
        insights = [
            {
                'Insight_Type': 'After_Hours_Waste',
                'Building_Name': 'Student Housing',
                'Detection_Date': datetime.now() - timedelta(days=2),
                'Waste_Percent': 15.2,
                'Potential_Savings_Dollars': 45.50,
                'Root_Cause': 'HVAC running after 7 PM with low occupancy',
                'Priority_Level': 'High',
                'Status': 'Pending',
                'Confidence_Score': 92
            },
            {
                'Insight_Type': 'Occupancy_Mismatch',
                'Building_Name': 'Library',
                'Detection_Date': datetime.now() - timedelta(days=1),
                'Waste_Percent': 12.8,
                'Potential_Savings_Dollars': 32.20,
                'Root_Cause': 'Manual thermostat overrides during low occupancy',
                'Priority_Level': 'Medium',
                'Status': 'In_Progress',
                'Confidence_Score': 87
            },
            {
                'Insight_Type': 'Schedule_Optimization',
                'Building_Name': 'Dining Center',
                'Detection_Date': datetime.now() - timedelta(days=3),
                'Waste_Percent': 8.3,
                'Potential_Savings_Dollars': 28.90,
                'Root_Cause': 'Fixed schedule ignoring weekend patterns',
                'Priority_Level': 'Low',
                'Status': 'Completed',
                'Confidence_Score': 78
            }
        ]
        
        return pd.DataFrame(insights)
    
    def prepare_comfort_efficiency_data(self, db: Session) -> pd.DataFrame:
        """Prepare comfort-efficiency tradeoff data for Power BI"""
        comfort_levels = [95, 92, 88, 85, 80]
        
        data = []
        for comfort in comfort_levels:
            # Calculate corresponding energy impact
            energy_change = (comfort - 88) * 1.5  # Simplified model
            balance_score = 100 - abs(comfort - 88) - abs(energy_change) * 0.5
            
            data.append({
                'Comfort_Score_Percent': comfort,
                'Energy_Change_Percent': energy_change,
                'Balance_Score_Percent': balance_score,
                'Recommendation': 'Optimal' if comfort == 88 else ('Too High' if comfort > 88 else 'Too Low'),
                'User_Satisfaction_Impact': (comfort - 88) * 2,
                'Cost_Impact_Dollars_Per_Day': energy_change * 10,
                'Implementation_Difficulty': 'Low' if 85 <= comfort <= 92 else 'Medium'
            })
        
        return pd.DataFrame(data)
    
    def export_to_powerbi_format(self, data: pd.DataFrame, dataset_name: str) -> Dict[str, Any]:
        """Export data in Power BI compatible format"""
        return {
            'dataset_name': dataset_name,
            'data': data.to_dict('records'),
            'schema': [
                {
                    'name': col,
                    'type': 'string' if data[col].dtype == 'object' else 'number'
                }
                for col in data.columns
            ],
            'last_updated': datetime.now().isoformat(),
            'row_count': len(data)
        }
    
    def generate_powerbi_dataset(self, db: Session, dataset_type: str) -> Dict[str, Any]:
        """Generate complete Power BI dataset based on type"""
        try:
            if dataset_type == 'energy_consumption':
                data = self.prepare_energy_consumption_data(db)
                return self.export_to_powerbi_format(data, 'SmartComfort_Energy_Consumption')
            
            elif dataset_type == 'savings_summary':
                data = self.prepare_savings_summary_data(db)
                return self.export_to_powerbi_format(data, 'SmartComfort_Savings_Summary')
            
            elif dataset_type == 'behavior_insights':
                data = self.prepare_behavior_insights_data(db)
                return self.export_to_powerbi_format(data, 'SmartComfort_Behavior_Insights')
            
            elif dataset_type == 'comfort_efficiency':
                data = self.prepare_comfort_efficiency_data(db)
                return self.export_to_powerbi_format(data, 'SmartComfort_Comfort_Efficiency')
            
            else:
                raise HTTPException(status_code=400, detail=f"Unknown dataset type: {dataset_type}")
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error generating Power BI dataset: {str(e)}")
    
    def get_powerbi_connection_config(self) -> Dict[str, Any]:
        """Get Power BI connection configuration"""
        return {
            'api_endpoint': 'https://api.powerbi.com/beta/your-workspace-id/datasets',
            'authentication': 'OAuth 2.0',
            'refresh_frequency': 'Hourly',
            'data_format': 'JSON',
            'compression': 'gzip',
            'retry_policy': {
                'max_retries': 3,
                'backoff_factor': 2
            }
        }
    
    def create_powerbi_dashboard_template(self) -> Dict[str, Any]:
        """Create Power BI dashboard template configuration"""
        return {
            'dashboard_name': 'SmartComfort HVAC Optimization',
            'tiles': [
                {
                    'title': 'Real-time Energy Consumption',
                    'type': 'line_chart',
                    'dataset': 'SmartComfort_Energy_Consumption',
                    'x_axis': 'Timestamp',
                    'y_axis': 'Energy_Consumption_kWh',
                    'group_by': 'Building_Name',
                    'refresh_interval': '5_minutes'
                },
                {
                    'title': 'Cost Savings Trend',
                    'type': 'area_chart',
                    'dataset': 'SmartComfort_Savings_Summary',
                    'x_axis': 'Month',
                    'y_axis': 'Cost_Saved_Dollars',
                    'group_by': 'Building_Name',
                    'refresh_interval': 'hourly'
                },
                {
                    'title': 'AI Insights',
                    'type': 'table',
                    'dataset': 'SmartComfort_Behavior_Insights',
                    'columns': ['Building_Name', 'Insight_Type', 'Waste_Percent', 'Potential_Savings_Dollars', 'Priority_Level'],
                    'refresh_interval': 'hourly'
                },
                {
                    'title': 'Comfort-Efficiency Balance',
                    'type': 'scatter_plot',
                    'dataset': 'SmartComfort_Comfort_Efficiency',
                    'x_axis': 'Comfort_Score_Percent',
                    'y_axis': 'Energy_Change_Percent',
                    'size': 'Balance_Score_Percent',
                    'refresh_interval': 'daily'
                }
            ],
            'layout': {
                'grid_size': '12x8',
                'tile_positions': {
                    'energy_consumption': {'x': 0, 'y': 0, 'width': 8, 'height': 4},
                    'cost_savings': {'x': 8, 'y': 0, 'width': 4, 'height': 4},
                    'ai_insights': {'x': 0, 'y': 4, 'width': 6, 'height': 4},
                    'comfort_efficiency': {'x': 6, 'y': 4, 'width': 6, 'height': 4}
                }
            }
        }

# Initialize Power BI integration
powerbi_integration = PowerBIIntegration()
