import React, { useState } from 'react';
import { 
  DollarSign, 
  Leaf, 
  TrendingUp, 
  Calendar,
  Download,
  Award,
  Target,
  Zap,
  TreePine,
  Factory
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const EnergySavings = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'semester', label: 'This Semester' },
    { value: 'year', label: 'This Year' }
  ];

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'energy', label: 'Energy (kWh)' },
    { value: 'cost', label: 'Cost ($)' },
    { value: 'carbon', label: 'Carbon (tons)' }
  ];

  // Sample data for charts
  const savingsTrendData = [
    { month: 'Aug', energy: 850, cost: 85, carbon: 0.35 },
    { month: 'Sep', energy: 1200, cost: 120, carbon: 0.50 },
    { month: 'Oct', energy: 1450, cost: 145, carbon: 0.60 },
    { month: 'Nov', energy: 1680, cost: 168, carbon: 0.70 },
    { month: 'Dec', energy: 2100, cost: 210, carbon: 0.88 },
    { month: 'Jan', energy: 2847, cost: 284.70, carbon: 1.20 }
  ];

  const cumulativeSavingsData = [
    { month: 'Aug', cumulative: 850 },
    { month: 'Sep', cumulative: 2050 },
    { month: 'Oct', cumulative: 3500 },
    { month: 'Nov', cumulative: 5180 },
    { month: 'Dec', cumulative: 7280 },
    { month: 'Jan', cumulative: 10127 }
  ];

  const buildingComparisonData = [
    { name: 'Housing', savings: 2847, target: 2500, participants: 156 },
    { name: 'Dining', savings: 1820, target: 2000, participants: 89 },
    { name: 'Library', savings: 3210, target: 3000, participants: 234 },
    { name: 'Parkview', savings: 1456, target: 1500, participants: 67 },
    { name: 'East Campus', savings: 987, target: 1000, participants: 45 }
  ];

  const environmentalImpact = [
    {
      icon: TreePine,
      title: 'Trees Equivalent',
      value: '234',
      unit: 'trees planted',
      description: 'CO₂ absorption equivalent'
    },
    {
      icon: Factory,
      title: 'Cars Removed',
      value: '52',
      unit: 'cars off road',
      description: 'Annual emissions reduction'
    },
    {
      icon: Leaf,
      title: 'Carbon Reduced',
      value: '1.2',
      unit: 'metric tons',
      description: 'Total CO₂ reduction'
    },
    {
      icon: Zap,
      title: 'Energy Saved',
      value: '2,847',
      unit: 'kWh',
      description: 'Total electricity saved'
    }
  ];

  const achievements = [
    {
      title: 'Energy Saver',
      description: 'Reduced consumption by 10%',
      progress: 75,
      icon: Zap,
      color: 'energy-green'
    },
    {
      title: 'Carbon Neutral',
      description: 'Offset 1 ton of CO₂',
      progress: 120,
      icon: Leaf,
      color: 'energy-blue'
    },
    {
      title: 'Cost Champion',
      description: 'Saved $250 in energy costs',
      progress: 114,
      icon: DollarSign,
      color: 'energy-orange'
    },
    {
      title: 'Team Player',
      description: '80% building participation',
      progress: 88,
      icon: Target,
      color: 'wmu-green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-wmu-green mb-2">Energy Savings Impact</h1>
            <p className="text-gray-600">Track your contribution to WMU's sustainability goals</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Timeframe:</label>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              {timeframes.map(timeframe => (
                <option key={timeframe.value} value={timeframe.value}>{timeframe.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Metric:</label>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              {metrics.map(metric => (
                <option key={metric.value} value={metric.value}>{metric.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-energy-green to-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Energy Saved</p>
              <p className="text-3xl font-bold mt-1">2,847</p>
              <p className="text-sm opacity-90 mt-1">kWh</p>
            </div>
            <Zap className="h-10 w-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-energy-blue to-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Cost Savings</p>
              <p className="text-3xl font-bold mt-1">$284.70</p>
              <p className="text-sm opacity-90 mt-1">This month</p>
            </div>
            <DollarSign className="h-10 w-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-energy-orange to-orange-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Carbon Reduced</p>
              <p className="text-3xl font-bold mt-1">1.2</p>
              <p className="text-sm opacity-90 mt-1">metric tons</p>
            </div>
            <Leaf className="h-10 w-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-wmu-green to-green-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Buildings Active</p>
              <p className="text-3xl font-bold mt-1">5/5</p>
              <p className="text-sm opacity-90 mt-1">100% participation</p>
            </div>
            <Target className="h-10 w-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Savings Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'energy' ? `${value} kWh` : 
                  name === 'cost' ? `$${value}` : 
                  `${value} tons CO₂`,
                  name === 'energy' ? 'Energy' : 
                  name === 'cost' ? 'Cost' : 'Carbon'
                ]}
              />
              <Legend />
              <Line type="monotone" dataKey="energy" stroke="#10B981" name="Energy" strokeWidth={2} />
              <Line type="monotone" dataKey="cost" stroke="#3B82F6" name="Cost" strokeWidth={2} />
              <Line type="monotone" dataKey="carbon" stroke="#F97316" name="Carbon" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Savings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cumulative Energy Savings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cumulativeSavingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kWh`, 'Cumulative Savings']} />
              <Area type="monotone" dataKey="cumulative" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {environmentalImpact.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Icon className="h-12 w-12 mx-auto mb-3 text-energy-green" />
                <h3 className="font-semibold text-gray-900">{impact.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{impact.value}</p>
                <p className="text-sm text-gray-600">{impact.unit}</p>
                <p className="text-xs text-gray-500 mt-2">{impact.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Building Performance Comparison */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Building Performance Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Building
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Energy Saved (kWh)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buildingComparisonData.map((building, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {building.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="font-semibold text-green-600">{building.savings.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            building.savings >= building.target ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(100, (building.savings / building.target) * 100)}%` }}
                        ></div>
                      </div>
                      <span>{Math.round((building.savings / building.target) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {building.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      building.savings >= building.target ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {building.savings >= building.target ? 'On Target' : 'Below Target'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements & Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`h-8 w-8 text-${achievement.color}-600`} />
                    <Award className={`h-6 w-6 ${
                      achievement.progress >= 100 ? 'text-yellow-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{Math.min(100, achievement.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${achievement.color}-500`}
                        style={{ width: `${Math.min(100, achievement.progress)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {achievement.progress >= 100 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
                    <Award className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Projections */}
      <div className="bg-gradient-to-r from-energy-green to-energy-blue rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Future Projections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Next Month</h3>
            <p className="text-3xl font-bold">3,200 kWh</p>
            <p className="text-sm opacity-90">Projected energy savings</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">This Semester</h3>
            <p className="text-3xl font-bold">15,000 kWh</p>
            <p className="text-sm opacity-90">Total projected savings</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Annual Impact</h3>
            <p className="text-3xl font-bold">$3,000</p>
            <p className="text-sm opacity-90">Estimated cost savings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergySavings;
