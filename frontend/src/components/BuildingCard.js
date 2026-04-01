import React from 'react';
import { 
  Thermometer, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowUp
} from 'lucide-react';

const BuildingCard = ({ building }) => {
  // Add safety checks for building data
  if (!building) {
    return <div className="border border-gray-200 rounded-lg p-4">Loading building data...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal':
        return 'text-green-600 bg-green-100';
      case 'needs-attention':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs-attention':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 80) return 'text-green-600';
    if (efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Safe calculations with fallbacks
  const currentTemp = building.currentTemp || 0;
  const recommendedTemp = building.recommendedTemp || 0;
  const efficiency = building.efficiency || 0;
  const savings = building.savings || 0;
  const tempDifference = recommendedTemp - currentTemp;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{building.name || 'Unknown Building'}</h3>
          <p className="text-xs text-gray-500 mt-1">{building.type || 'Unknown Type'}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(building.status)}`}>
          {getStatusIcon(building.status)}
          <span className="capitalize">{(building.status || 'unknown').replace('-', ' ')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Current</p>
            <p className="text-sm font-semibold">{currentTemp}°F</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4 text-energy-green" />
          <div>
            <p className="text-xs text-gray-500">Recommended</p>
            <p className="text-sm font-semibold text-energy-green">{recommendedTemp}°F</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Energy Efficiency</span>
          <span className={`text-sm font-semibold ${getEfficiencyColor(efficiency)}`}>
            {efficiency}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              efficiency >= 80 ? 'bg-green-500' : 
              efficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, efficiency))}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-energy-green" />
            <span className="text-xs text-gray-500">Potential Savings</span>
          </div>
          <span className="text-sm font-semibold text-energy-green">
            {savings.toLocaleString()}% 
            {tempDifference > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                (+{tempDifference}°F)
              </span>
            )}
          </span>
        </div>
      </div>

      {building.status === 'needs-attention' && (
        <div className="mt-3 p-2 bg-yellow-50 rounded-md">
          <p className="text-xs text-yellow-800">
            <ArrowUp className="h-3 w-3 inline mr-1" />
            Adjust temperature by {tempDifference}°F for optimal efficiency
          </p>
        </div>
      )}
    </div>
  );
};

export default BuildingCard;
