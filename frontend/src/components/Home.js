import React, { useState, useEffect } from 'react';
import { Leaf, Zap, TrendingDown, Users } from 'lucide-react';
import staticDataService from '../services/staticDataService';

const Home = () => {
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadSummaryStats = async () => {
    if (dataLoaded) return; // Skip if already loaded
    
    try {
      const data = await staticDataService.getSummaryStats();
      setSummaryStats(data);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error loading summary stats:', error);
      setDataLoaded(true); // Set loaded to prevent infinite loading
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummaryStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">SmartComfort HVAC Optimization</h1>
          <p className="text-xl">Loading real campus data...</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">SmartComfort HVAC Optimization</h1>
          <p className="text-xl mb-6">
            AI-powered energy efficiency solution for Western Michigan University campus
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">{summaryStats?.totalBuildings || 0}</span>
              </div>
              <div className="text-sm">Buildings Monitored</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5" />
                <span className="font-semibold">{summaryStats?.avgEfficiency || 0}%</span>
              </div>
              <div className="text-sm">Avg Efficiency</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">Campus Wide</span>
              </div>
              <div className="text-sm">Building Coverage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-sm text-gray-500">Live</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{summaryStats?.totalBuildings || 0}</h3>
          <p className="text-gray-600">Buildings monitored</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-500">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {(summaryStats?.totalUsage || 0).toLocaleString()} kWh
          </h3>
          <p className="text-gray-600">Energy usage today</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-gray-500">Potential</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {(summaryStats?.totalSavings || 0).toLocaleString()} kWh
          </h3>
          <p className="text-gray-600">Daily savings potential</p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Behavior-Based Optimization</h3>
              <p className="text-gray-600">Uses behavioral science to encourage energy-saving habits</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Machine learning algorithms for optimal temperature settings</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Analytics</h3>
              <p className="text-gray-600">Live monitoring and visualization of energy consumption</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">User Engagement</h3>
              <p className="text-gray-600">Interactive surveys and personalized feedback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <p className="text-gray-700">Navigate to <strong>Action</strong> to view building energy usage</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            <p className="text-gray-700">Fill out the <strong>Survey Form</strong> to help us improve recommendations</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            <p className="text-gray-700">Chat with our <strong>ChatBot</strong> for personalized energy-saving tips</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
