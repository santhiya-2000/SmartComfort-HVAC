# Power BI Integration Guide

## Overview

SmartComfort provides comprehensive Power BI integration to extend analytics capabilities and enable enterprise-level reporting. The system includes multiple user types with role-based access to different Power BI features.

## User Types & Access Levels

### 1. **Admin Users** ✅
**Full Power BI Access**
- Create and manage Power BI workspaces
- Configure automated data refresh
- Access all datasets and dashboards
- Manage API connections and tokens
- Export data in multiple formats
- Schedule automated reports

**Features:**
- Complete dashboard template library
- Real-time data streaming
- Advanced analytics and ML insights
- Multi-building comparative analysis
- Cost and emissions reporting

### 2. **Facilities Management Users** ⚙️
**Operational Power BI Access**
- View building performance dashboards
- Access maintenance schedules
- Monitor energy consumption trends
- Generate operational reports
- Receive automated alerts

**Features:**
- Building-specific dashboards
- HVAC performance metrics
- Maintenance recommendations
- Occupancy analysis
- System efficiency reports

### 3. **Housing/Dining Staff** 🏢
**Departmental Power BI Access**
- Department-specific energy usage
- Student behavior insights
- Cost allocation reports
- Sustainability metrics
- Basic analytics

**Features:**
- Department-focused dashboards
- Student engagement metrics
- Budget impact analysis
- Simple trend reports

### 4. **Students/General Users** 👥
**Limited Power BI Access**
- Personal energy impact
- Building awareness dashboards
- Sustainability contributions
- Basic visualizations

**Features:**
- Personal energy footprint
- Building comparison tools
- Achievement tracking
- Educational content

## Quick Start Guide

### Step 1: Configure Power BI Connection

#### For Admin Users:
```bash
# 1. Set up Power BI Service Principal
# Go to Azure Portal > Azure Active Directory > App registrations
# Create new app registration
# Note: Application (client) ID, Directory (tenant) ID, client secret

# 2. Configure SmartComfort
cp .env.example .env
# Edit .env file:
POWERBI_WORKSPACE_ID=your-workspace-id
POWERBI_CLIENT_ID=your-client-id
POWERBI_CLIENT_SECRET=your-client-secret
POWERBI_TENANT_ID=your-tenant-id

# 3. Restart with Power BI profile
docker-compose --profile powerbi up -d
```

#### For Non-Admin Users:
```bash
# No setup required - access via shared dashboards
# Contact your admin for dashboard links
```

### Step 2: Access Power BI Features

#### Admin Dashboard Access:
1. **Web Interface**: `http://localhost:3000/intelligence`
2. **Power BI Export**: Navigate to any dashboard → "Export to Power BI"
3. **API Access**: `http://localhost:8000/api/powerbi/`

#### Automated Data Sync:
```bash
# Check data sync status
curl http://localhost:8000/api/powerbi/status

# Manual data refresh
curl -X POST http://localhost:8000/api/powerbi/refresh
```

## Available Datasets

### 1. **Energy Consumption Data**
```json
{
  "dataset_name": "SmartComfort_Energy_Consumption",
  "update_frequency": "Real-time (5 minutes)",
  "access_level": "All users",
  "includes": [
    "Timestamp", "Building_Name", "Energy_Consumption_kWh",
    "Occupancy_Count", "Outdoor_Temperature", "HVAC_Mode",
    "Cost_Dollars", "Carbon_Emission_kg"
  ]
}
```

### 2. **Savings Summary Data**
```json
{
  "dataset_name": "SmartComfort_Savings_Summary",
  "update_frequency": "Hourly",
  "access_level": "Facilities+",
  "includes": [
    "Building_Name", "Month", "Year", "Energy_Saved_kWh",
    "Cost_Saved_Dollars", "Carbon_Reduced_kg", "Efficiency_Improvement_Percent"
  ]
}
```

### 3. **Behavior Insights Data**
```json
{
  "dataset_name": "SmartComfort_Behavior_Insights",
  "update_frequency": "Hourly",
  "access_level": "Admin+Facilities",
  "includes": [
    "Insight_Type", "Building_Name", "Detection_Date",
    "Waste_Percent", "Potential_Savings_Dollars", "Root_Cause",
    "Priority_Level", "Status", "Confidence_Score"
  ]
}
```

### 4. **Comfort-Efficiency Data**
```json
{
  "dataset_name": "SmartComfort_Comfort_Efficiency",
  "update_frequency": "Daily",
  "access_level": "All users",
  "includes": [
    "Comfort_Score_Percent", "Energy_Change_Percent",
    "Balance_Score_Percent", "Recommendation", "User_Satisfaction_Impact"
  ]
}
```

## Power BI Dashboard Templates

### Template 1: Executive Overview (Admin Only)
**Access Level**: Admin
**Purpose**: Strategic decision-making
**Features**:
- Campus-wide energy trends
- Cost savings projections
- Carbon footprint tracking
- ROI analysis
- Multi-building comparison

**API Endpoint**: `GET /api/powerbi/dashboard-template`

### Template 2: Facilities Operations
**Access Level**: Facilities+
**Purpose**: Daily operations management
**Features**:
- Real-time building performance
- Maintenance alerts
- Occupancy optimization
- HVAC efficiency metrics
- Staff recommendations

**API Endpoint**: `GET /api/powerbi/datasets/energy_consumption`

### Template 3: Department Analytics
**Access Level**: All Users
**Purpose**: Department-specific insights
**Features**:
- Department energy usage
- Student engagement metrics
- Budget impact analysis
- Sustainability contributions

**API Endpoint**: `GET /api/powerbi/datasets/savings_summary`

## API Usage Examples

### Get Dataset for Power BI
```bash
# Energy consumption data (all users)
curl "http://localhost:8000/api/powerbi/datasets/energy_consumption" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Behavior insights (facilities+)
curl "http://localhost:8000/api/powerbi/datasets/behavior_insights" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Export for Power BI Desktop
curl "http://localhost:8000/api/powerbi/export/energy_consumption" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o smartcomfort_data.json
```

### Power BI Desktop Setup
1. **Get Data**: "Get Data" → "Web" → "From Web"
2. **API URL**: Enter `http://localhost:8000/api/powerbi/datasets/energy_consumption`
3. **Authentication**: Use your API token
4. **Transform**: Power Query will auto-detect schema
5. **Load**: Create visualizations

### Power BI Service Setup
1. **Workspace**: Create workspace in Power BI Service
2. **Dataset**: Connect via API or upload JSON
3. **Gateway**: Configure on-premises data gateway
4. **Schedule**: Set refresh interval (recommended: hourly)
5. **Dashboard**: Build using templates or custom

## User Role Configuration

### Admin Setup
```python
# In backend/models.py - UserModel
class UserModel(Base):
    role = Column(String(50))  # admin, facilities, housing, student
    powerbi_access = Column(String(20))  # full, operational, departmental, limited
    
    # Role-based access control
    def can_access_dataset(self, dataset_name):
        access_matrix = {
            'admin': ['all'],
            'facilities': ['energy_consumption', 'savings_summary'],
            'housing': ['savings_summary', 'comfort_efficiency'],
            'student': ['comfort_efficiency']
        }
        return dataset_name in access_matrix.get(self.role, [])
```

### Authentication
```bash
# Get user token with role
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@wmu.edu", "password": "password"}'

# Response includes role and Power BI access level
{
  "token": "jwt_token_here",
  "user": {
    "role": "admin",
    "powerbi_access": "full",
    "permissions": ["read", "write", "export", "manage"]
  }
}
```

## Advanced Features

### Real-Time Streaming
```bash
# Enable real-time data streaming
curl -X POST "http://localhost:8000/api/powerbi/streaming/enable" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"interval": 300, "dataset": "energy_consumption"}'
```

### Automated Reporting
```bash
# Schedule automated Power BI reports
curl -X POST "http://localhost:8000/api/powerbi/reports/schedule" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "report_type": "weekly_summary",
    "recipients": ["admin@wmu.edu", "facilities@wmu.edu"],
    "schedule": "friday_5pm",
    "format": "pdf"
  }'
```

### Custom Dashboard Creation
```bash
# Create custom dashboard template
curl -X POST "http://localhost:8000/api/powerbi/dashboards/create" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Custom Department Dashboard",
    "user_role": "housing",
    "layout": {...},
    "datasets": ["savings_summary", "comfort_efficiency"]
  }'
```

## Troubleshooting

### Common Issues

#### Access Denied
```bash
# Check user role
curl "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Verify Power BI permissions
{
  "role": "student",
  "powerbi_access": "limited",
  "available_datasets": ["comfort_efficiency"]
}
```

#### Data Not Refreshing
```bash
# Check refresh status
curl "http://localhost:8000/api/powerbi/status"

# Manual refresh
curl -X POST "http://localhost:8000/api/powerbi/refresh" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Connection Issues
```bash
# Test Power BI API connectivity
curl "http://localhost:8000/api/powerbi/config"

# Expected response:
{
  "api_endpoint": "https://api.powerbi.com/beta/...",
  "status": "connected",
  "last_sync": "2024-02-12T18:30:00Z"
}
```

## Best Practices

### For Admin Users:
1. **Security**: Rotate API keys monthly
2. **Monitoring**: Set up alerts for data failures
3. **Backup**: Export dashboard configurations weekly
4. **Performance**: Monitor API usage and optimize queries

### For All Users:
1. **Training**: Provide role-specific Power BI training
2. **Documentation**: Maintain dashboard user guides
3. **Feedback**: Collect user experience feedback
4. **Updates**: Regularly refresh data sources

## Support

For Power BI integration issues:
- **Admin Support**: smartcomfort-admin@wmich.edu
- **User Training**: smartcomfort-training@wmich.edu
- **Technical Issues**: smartcomfort-support@wmich.edu

## Next Steps

1. **Configure**: Set up Power BI workspace and API credentials
2. **Test**: Verify data connectivity with sample dashboards
3. **Deploy**: Roll out to user groups based on roles
4. **Train**: Conduct role-specific Power BI training sessions
5. **Monitor**: Track usage and optimize performance
