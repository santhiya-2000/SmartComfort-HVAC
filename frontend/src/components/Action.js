import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, TrendingDown, CheckCircle, Building } from 'lucide-react';
import staticDataService from '../services/staticDataService';

const Action = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadData = async () => {
    if (dataLoaded) return; // Skip if already loaded
    
    try {
      const [buildingsData, summaryData] = await Promise.all([
        staticDataService.getAllBuildings(),
        staticDataService.getSummaryStats()
      ]);

      setBuildings(buildingsData);
      setSummaryStats(summaryData);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setDataLoaded(true); // Set loaded to prevent infinite loading
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'optimal': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  const BuildingCard = ({ building }) => (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm border-2 cursor-pointer transition-all ${
        selectedBuilding?.id === building.id 
          ? 'border-blue-500 shadow-md' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => setSelectedBuilding(building)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{building.name}</h3>
          <p className="text-sm text-gray-500">{building.type}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(building.status)}`}>
          {getStatusIcon(building.status)}
          {building.status.charAt(0).toUpperCase() + building.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Current Temperature</p>
          <p className="text-xl font-bold text-gray-900">{building.currentTemp}°F</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Recommended</p>
          <p className="text-xl font-bold text-blue-600">{building.recommendedTemp}°F</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Energy Usage</span>
          <span className="text-sm font-semibold">{building.energyUsage.toLocaleString()} kWh</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Potential Savings</span>
          <span className="text-sm font-semibold text-green-600">{building.savings.toLocaleString()} kWh</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Occupancy</span>
          <span className="text-sm font-semibold">{building.occupancy}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Efficiency</span>
          <span className="text-sm font-semibold">{building.efficiency}%</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Building Energy Usage</h1>
          <p className="text-blue-100">Loading real energy data...</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Building Energy Usage</h1>
        <p className="text-blue-100">Real-time monitoring of {buildings.length} WMU buildings</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Building className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-500">Total Buildings</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{summaryStats?.totalBuildings || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-500">Total Usage</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(summaryStats?.totalUsage || 0).toLocaleString()} kWh
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-500">Potential Savings</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {(summaryStats?.totalSavings || 0).toLocaleString()} kWh
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-sm text-gray-500">Need Attention</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {summaryStats?.buildingsNeedingAttention || 0}
          </p>
        </div>
      </div>

      {/* Building Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildings.map(building => (
          <BuildingCard key={building.id} building={building} />
        ))}
      </div>

      {/* Selected Building Details */}
      {selectedBuilding && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {selectedBuilding.name} - Detailed Actions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Immediate Action Required</h3>
              <p className="text-yellow-700">
                Reduce temperature from {selectedBuilding.currentTemp}°F to {selectedBuilding.recommendedTemp}°F 
                to save {selectedBuilding.savings.toLocaleString()} kWh daily.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Recommendations</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Adjust HVAC settings during low occupancy hours</li>
                <li>• Implement smart thermostat scheduling</li>
                <li>• Consider occupancy sensor installation</li>
                <li>• Regular maintenance of HVAC equipment</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Expected Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-green-700">
                <div>
                  <p className="font-semibold">Energy Savings</p>
                  <p>{selectedBuilding.savings.toLocaleString()} kWh/day</p>
                </div>
                <div>
                  <p className="font-semibold">Cost Reduction</p>
                  <p>${(selectedBuilding.savings * 0.12).toFixed(2)}/day</p>
                </div>
                <div>
                  <p className="font-semibold">CO₂ Reduction</p>
                  <p>{(selectedBuilding.savings * 0.0007).toFixed(2)} tons/day</p>
                </div>
                <div>
                  <p className="font-semibold">Efficiency Improvement</p>
                  <p>+{100 - selectedBuilding.efficiency}% potential</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Action;
