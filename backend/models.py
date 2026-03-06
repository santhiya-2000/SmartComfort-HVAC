from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class SurveyResponse(Base):
    __tablename__ = "survey_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Personal Information
    role = Column(String(50))  # student, faculty, staff, administration
    department = Column(String(100))
    years_at_wmu = Column(String(20))
    
    # Building Information
    primary_building = Column(String(50))
    weekly_hours = Column(String(20))
    room_type = Column(String(50))
    
    # Comfort Preferences
    summer_temp = Column(Float)
    winter_temp = Column(Float)
    temperature_tolerance = Column(String(50))
    
    # Behavior Patterns
    adjustment_frequency = Column(String(50))
    window_behavior = Column(String(50))
    influences = Column(Text)  # JSON array
    
    # Energy Awareness
    energy_awareness = Column(String(50))
    willingness_to_adjust = Column(String(50))
    comments = Column(Text)
    
    # Relationships
    building = relationship("Building", back_populates="surveys")

class Building(Base):
    __tablename__ = "buildings"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
    type = Column(String(50))  # housing, dining, library, classroom, office
    location = Column(String(100))
    total_square_footage = Column(Float)
    occupancy_capacity = Column(Integer)
    
    # Current Settings
    current_cooling_setpoint = Column(Float)
    current_heating_setpoint = Column(Float)
    current_schedule = Column(String(50))
    
    # Recommended Settings
    recommended_cooling_setpoint = Column(Float)
    recommended_heating_setpoint = Column(Float)
    recommended_schedule = Column(String(50))
    
    # Performance Metrics
    efficiency_score = Column(Float, default=0.0)
    potential_savings = Column(Float, default=0.0)
    user_participation_rate = Column(Float, default=0.0)
    
    # Status
    status = Column(String(20), default="needs_attention")  # optimal, needs_attention, critical
    last_updated = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    surveys = relationship("SurveyResponse", back_populates="building")
    energy_readings = relationship("EnergyReading", back_populates="building")
    recommendations = relationship("Recommendation", back_populates="building")

class EnergyReading(Base):
    __tablename__ = "energy_readings"
    
    id = Column(Integer, primary_key=True, index=True)
    building_id = Column(Integer, ForeignKey("buildings.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Environmental Conditions
    outdoor_temperature = Column(Float)
    humidity = Column(Float)
    occupancy_count = Column(Integer)
    
    # HVAC Settings
    thermostat_setting = Column(Float)
    system_mode = Column(String(20))  # heating, cooling, auto, off
    
    # Energy Consumption
    energy_consumption_kwh = Column(Float)
    estimated_cost = Column(Float)
    
    # Relationships
    building = relationship("Building", back_populates="energy_readings")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    building_id = Column(Integer, ForeignKey("buildings.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Recommendation Details
    recommendation_type = Column(String(50))  # temperature, schedule, behavior
    current_value = Column(Float)
    recommended_value = Column(Float)
    potential_savings = Column(Float)
    priority = Column(String(20))  # high, medium, low
    user_impact = Column(String(20))  # low, medium, high
    
    # Implementation
    implementation_cost = Column(Float, default=0.0)
    estimated_payback_period = Column(String(50))
    confidence_score = Column(Float)
    
    # Status
    status = Column(String(20), default="pending")  # pending, approved, implemented, rejected
    implemented_date = Column(DateTime, nullable=True)
    
    # ML Model Data
    model_version = Column(String(20))
    feature_importance = Column(Text)  # JSON object
    reasoning = Column(Text)
    
    # Relationships
    building = relationship("Building", back_populates="recommendations")

class NudgeTemplate(Base):
    __tablename__ = "nudge_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    type = Column(String(50))  # poster, qr_code, digital_signage, email, app_notification
    title = Column(String(200))
    message = Column(Text)
    
    # Targeting
    building_types = Column(Text)  # JSON array
    seasons = Column(Text)  # JSON array
    user_roles = Column(Text)  # JSON array
    
    # Placement
    placement_locations = Column(Text)  # JSON array
    
    # Content
    visual_design = Column(Text)  # JSON object with design specs
    qr_code_url = Column(String(500), nullable=True)
    
    # Effectiveness
    deployment_count = Column(Integer, default=0)
    success_rate = Column(Float, default=0.0)
    
    # Status
    is_active = Column(Boolean, default=True)
    created_date = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow)

class NudgeDeployment(Base):
    __tablename__ = "nudge_deployments"
    
    id = Column(Integer, primary_key=True, index=True)
    template_id = Column(Integer, ForeignKey("nudge_templates.id"))
    building_id = Column(Integer, ForeignKey("buildings.id"))
    
    # Deployment Details
    deployment_date = Column(DateTime, default=datetime.utcnow)
    scheduled_end_date = Column(DateTime, nullable=True)
    status = Column(String(20), default="active")  # active, completed, cancelled
    
    # Metrics
    impressions = Column(Integer, default=0)
    interactions = Column(Integer, default=0)
    behavior_changes = Column(Integer, default=0)
    
    # Relationships
    template = relationship("NudgeTemplate")
    building = relationship("Building")

class UserModel(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True)
    name = Column(String(100))
    role = Column(String(50))  # student, faculty, staff, admin
    department = Column(String(100))
    
    # Preferences
    preferred_building = Column(String(100), nullable=True)
    temperature_preference = Column(String(20), nullable=True)
    notification_preferences = Column(Text)  # JSON object
    
    # Authentication
    is_active = Column(Boolean, default=True)
    last_login = Column(DateTime, nullable=True)
    
    # Relationships
    survey_responses = relationship("SurveyResponse")
    user_actions = relationship("UserAction")

class UserAction(Base):
    __tablename__ = "user_actions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Action Details
    action_type = Column(String(50))  # survey_completed, recommendation_viewed, nudge_interacted
    action_details = Column(Text)  # JSON object with additional data
    
    # Context
    building_id = Column(Integer, ForeignKey("buildings.id"), nullable=True)
    session_id = Column(String(100))
    
    # Relationships
    user = relationship("UserModel")
    building = relationship("Building")

class ModelMetrics(Base):
    __tablename__ = "model_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Model Information
    model_version = Column(String(20))
    model_type = Column(String(50))
    
    # Performance Metrics
    training_samples = Column(Integer)
    accuracy_score = Column(Float)
    mean_absolute_error = Column(Float)
    r_squared = Column(Float)
    
    # Feature Importance
    feature_importance = Column(Text)  # JSON object
    
    # Training Details
    training_duration = Column(Float)  # seconds
    training_date = Column(DateTime)
    
    # Validation
    validation_score = Column(Float)
    cross_validation_scores = Column(Text)  # JSON array
