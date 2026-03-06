import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Leaf, 
  Building,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import EnergyChart from './EnergyChart';
import BuildingCard from './BuildingCard';
import QuickActions from './QuickActions';

const Dashboard = () => {
  const [energyData, setEnergyData] = useState({
    totalSavings: 0,
    carbonReduction: 0,
    buildingsOptimized: 0,
    userParticipation: 0
  });

  const [buildings] = useState([
    {
      id: 1,
      name: 'Student Housing - Valley Towers',
      type: 'Housing',
      currentTemp: 72,
      recommendedTemp: 74,
      savings: 15.2,
      efficiency: 85,
      status: 'optimal'
    },
    {
      id: 2,
      name: 'Dining Center - Kanley',
      type: 'Dining',
      currentTemp: 70,
      recommendedTemp: 72,
      savings: 12.8,
      efficiency: 78,
      status: 'needs-attention'
    },
    {
      id: 3,
      name: 'Waldo Library',
      type: 'Library',
      currentTemp: 71,
      recommendedTemp: 73,
      savings: 18.5,
      efficiency: 92,
      status: 'optimal'
    },
    {
      id: 4,
      name: 'Parkview Campus - Engineering',
      type: 'Classroom',
      currentTemp: 69,
      recommendedTemp: 71,
      savings: 8.3,
      efficiency: 65,
      status: 'needs-attention'
    }
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setEnergyData(prev => ({
        totalSavings: prev.totalSavings + Math.random() * 0.5,
        carbonReduction: prev.carbonReduction + Math.random() * 0.3,
        buildingsOptimized: buildings.filter(b => b.status === 'optimal').length,
        userParticipation: Math.min(95, prev.userParticipation + Math.random() * 0.2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [buildings]);

  const statCards = [
    {
      title: 'Total Energy Savings',
      value: `${energyData.totalSavings.toFixed(1)} MWh`,
      change: '+5.2%',
      icon: DollarSign,
      color: 'energy-green'
    },
    {
      title: 'Carbon Footprint Reduced',
      value: `${energyData.carbonReduction.toFixed(1)} tons CO₂`,
      change: '+3.8%',
      icon: Leaf,
      color: 'energy-blue'
    },
    {
      title: 'Buildings Optimized',
      value: `${energyData.buildingsOptimized}/${buildings.length}`,
      change: '+2 this week',
      icon: Building,
      color: 'energy-orange'
    },
    {
      title: 'User Participation',
      value: `${energyData.userParticipation.toFixed(1)}%`,
      change: '+1.2%',
      icon: Users,
      color: 'wmu-green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-wmu-green mb-2">SmartComfort Dashboard</h1>
        <p className="text-gray-600">Real-time HVAC energy optimization insights for WMU campus</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Energy Consumption Trends</h2>
          <EnergyChart />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>

      {/* Buildings Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Building Status Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Optimal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Needs Attention</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buildings.map(building => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Parkview Campus - High Energy Usage</p>
                <p className="text-xs text-gray-600">Temperature 2° below recommended</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Kanley Dining - HVAC Schedule Issue</p>
                <p className="text-xs text-gray-600">System running during off-hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Waldo Library - Optimization Complete</p>
                <p className="text-xs text-gray-600">18.5% energy reduction achieved</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Student Housing - Target Reached</p>
                <p className="text-xs text-gray-600">85% participation rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
