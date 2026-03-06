import React, { useState } from 'react';
import { 
  Building, 
  Thermometer, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
  Bell,
  DollarSign
} from 'lucide-react';

const BuildingRecommendations = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('summer');

  const buildings = [
    { value: 'all', label: 'All Buildings' },
    { value: 'housing', label: 'Student Housing' },
    { value: 'dining', label: 'Dining Centers' },
    { value: 'library', label: 'Library' },
    { value: 'parkview', label: 'Parkview Campus' },
    { value: 'east', label: 'East Campus' }
  ];

  const seasons = [
    { value: 'summer', label: 'Summer' },
    { value: 'winter', label: 'Winter' },
    { value: 'transition', label: 'Spring/Fall' }
  ];

  const buildingRecommendations = [
    {
      id: 1,
      name: 'Student Housing - Valley Towers',
      type: 'Housing',
      currentSettings: {
        cooling: 72,
        heating: 70,
        schedule: '24/7'
      },
      recommendedSettings: {
        cooling: 74,
        heating: 68,
        schedule: '6AM-11PM'
      },
      potentialSavings: 15.2,
      implementationCost: 0,
      priority: 'high',
      userImpact: 'low',
      estimatedPayback: 'Immediate'
    },
    {
      id: 2,
      name: 'Dining Center - Kanley',
      type: 'Dining',
      currentSettings: {
        cooling: 70,
        heating: 68,
        schedule: '7AM-8PM'
      },
      recommendedSettings: {
        cooling: 72,
        heating: 69,
        schedule: '6:30AM-7:30PM'
      },
      potentialSavings: 12.8,
      implementationCost: 0,
      priority: 'medium',
      userImpact: 'low',
      estimatedPayback: 'Immediate'
    },
    {
      id: 3,
      name: 'Waldo Library',
      type: 'Library',
      currentSettings: {
        cooling: 71,
        heating: 69,
        schedule: '24/7'
      },
      recommendedSettings: {
        cooling: 73,
        heating: 68,
        schedule: '7AM-12AM'
      },
      potentialSavings: 18.5,
      implementationCost: 0,
      priority: 'high',
      userImpact: 'medium',
      estimatedPayback: 'Immediate'
    },
    {
      id: 4,
      name: 'Parkview Campus - Engineering',
      type: 'Classroom',
      currentSettings: {
        cooling: 69,
        heating: 67,
        schedule: '8AM-6PM'
      },
      recommendedSettings: {
        cooling: 71,
        heating: 68,
        schedule: '8AM-6PM'
      },
      potentialSavings: 8.3,
      implementationCost: 0,
      priority: 'low',
      userImpact: 'low',
      estimatedPayback: 'Immediate'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRecommendations = selectedBuilding === 'all' 
    ? buildingRecommendations 
    : buildingRecommendations.filter(b => b.type.toLowerCase() === selectedBuilding);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-wmu-green mb-2">Building Recommendations</h1>
            <p className="text-gray-600">AI-powered HVAC optimization recommendations for WMU facilities</p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors">
              <Bell className="h-4 w-4" />
              <span>Send Nudges</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Building Type:</label>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
            >
              {buildings.map(building => (
                <option key={building.value} value={building.value}>{building.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Season:</label>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              {seasons.map(season => (
                <option key={season.value} value={season.value}>{season.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Potential Savings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">54.8%</p>
              <p className="text-sm text-green-600 mt-1">Across all buildings</p>
            </div>
            <TrendingUp className="h-8 w-8 text-energy-green" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority Actions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
              <p className="text-sm text-red-600 mt-1">Require immediate attention</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Implementation Cost</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$0</p>
              <p className="text-sm text-green-600 mt-1">Behavior changes only</p>
            </div>
            <DollarSign className="h-8 w-8 text-energy-blue" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">User Impact</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Low</p>
              <p className="text-sm text-green-600 mt-1">Minimal disruption</p>
            </div>
            <Users className="h-8 w-8 text-wmu-green" />
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((building) => (
          <div key={building.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{building.name}</h3>
                <p className="text-sm text-gray-500">{building.type}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(building.priority)}`}>
                  {building.priority} priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(building.userImpact)}`}>
                  {building.userImpact} impact
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-gray-500" />
                  Current Settings
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Cooling Setpoint</span>
                    <span className="font-semibold">{building.currentSettings.cooling}°F</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Heating Setpoint</span>
                    <span className="font-semibold">{building.currentSettings.heating}°F</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Operating Schedule</span>
                    <span className="font-semibold">{building.currentSettings.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-energy-green" />
                  Recommended Settings
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">Cooling Setpoint</span>
                    <span className="font-semibold text-green-700">{building.recommendedSettings.cooling}°F</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">Heating Setpoint</span>
                    <span className="font-semibold text-green-700">{building.recommendedSettings.heating}°F</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">Operating Schedule</span>
                    <span className="font-semibold text-green-700">{building.recommendedSettings.schedule}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits and Implementation */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-energy-green rounded-lg text-white">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{building.potentialSavings}%</p>
                  <p className="text-sm">Energy Savings</p>
                </div>
                <div className="text-center p-4 bg-energy-blue rounded-lg text-white">
                  <DollarSign className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">${building.implementationCost}</p>
                  <p className="text-sm">Implementation Cost</p>
                </div>
                <div className="text-center p-4 bg-wmu-green rounded-lg text-white">
                  <Clock className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-lg font-bold">{building.estimatedPayback}</p>
                  <p className="text-sm">Payback Period</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors">
                Implement Recommendation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Guide */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Implementation Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Immediate Actions (This Week)</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-sm">Update thermostat settings in Valley Towers</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-sm">Adjust library operating schedule</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-sm">Install behavior nudges near thermostats</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Short-term Actions (This Month)</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-sm">Train housing staff on new settings</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-sm">Monitor and adjust based on feedback</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-sm">Expand to additional buildings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingRecommendations;
