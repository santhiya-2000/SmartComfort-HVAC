import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Filter,
  Download,
  Building,
  Users,
  Thermometer,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const timeRanges = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'semester', label: 'This Semester' }
  ];

  const buildings = [
    { value: 'all', label: 'All Buildings' },
    { value: 'housing', label: 'Student Housing' },
    { value: 'dining', label: 'Dining Centers' },
    { value: 'library', label: 'Library' },
    { value: 'parkview', label: 'Parkview Campus' },
    { value: 'east', label: 'East Campus' }
  ];

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'energy', label: 'Energy (kWh)' },
    { value: 'cost', label: 'Cost ($)' },
    { value: 'carbon', label: 'Carbon (tons)' }
  ];

  // Sample data for charts
  const energyConsumptionData = [
    { name: 'Mon', actual: 3200, optimized: 2800, target: 2900 },
    { name: 'Tue', actual: 3100, optimized: 2700, target: 2800 },
    { name: 'Wed', actual: 2900, optimized: 2550, target: 2650 },
    { name: 'Thu', actual: 2850, optimized: 2500, target: 2600 },
    { name: 'Fri', actual: 3000, optimized: 2650, target: 2750 },
    { name: 'Sat', actual: 2200, optimized: 1950, target: 2000 },
    { name: 'Sun', actual: 2100, optimized: 1850, target: 1900 }
  ];

  const buildingPerformanceData = [
    { name: 'Housing', savings: 15.2, efficiency: 85, participation: 78 },
    { name: 'Dining', savings: 12.8, efficiency: 78, participation: 65 },
    { name: 'Library', savings: 18.5, efficiency: 92, participation: 88 },
    { name: 'Parkview', savings: 8.3, efficiency: 65, participation: 52 },
    { name: 'East Campus', savings: 10.1, efficiency: 71, participation: 61 }
  ];

  const userBehaviorData = [
    { name: 'Optimal', value: 45, color: '#10B981' },
    { name: 'Good', value: 30, color: '#3B82F6' },
    { name: 'Needs Improvement', value: 20, color: '#F97316' },
    { name: 'Critical', value: 5, color: '#EF4444' }
  ];

  const keyMetrics = [
    {
      title: 'Total Energy Saved',
      value: '2,847 kWh',
      change: '+12.5%',
      icon: DollarSign,
      color: 'energy-green'
    },
    {
      title: 'Cost Savings',
      value: '$284.70',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'energy-blue'
    },
    {
      title: 'Carbon Reduced',
      value: '1.2 tons',
      change: '+8.3%',
      icon: BarChart3,
      color: 'energy-orange'
    },
    {
      title: 'Active Users',
      value: '247',
      change: '+5.2%',
      icon: Users,
      color: 'wmu-green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-wmu-green mb-2">Energy Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into HVAC performance and user behavior</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Building:</label>
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
            <BarChart3 className="h-4 w-4 text-gray-500" />
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
        <button className="flex items-center space-x-2 px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                </div>
                <div className={`p-3 bg-${metric.color}-100 rounded-full`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Energy Consumption Trends</h2>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={energyConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} kWh`, name]} />
                <Legend />
                <Bar dataKey="actual" fill="#EF4444" name="Actual" />
                <Bar dataKey="optimized" fill="#10B981" name="Optimized" />
                <Bar dataKey="target" fill="#3B82F6" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Behavior Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Behavior Distribution</h2>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={userBehaviorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userBehaviorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Building Performance Table */}
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
                  Energy Savings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Participation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buildingPerformanceData.map((building, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {building.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="text-green-600 font-semibold">{building.savings}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            building.efficiency >= 80 ? 'bg-green-500' : 
                            building.efficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${building.efficiency}%` }}
                        ></div>
                      </div>
                      <span>{building.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      {building.participation}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      building.efficiency >= 80 ? 'bg-green-100 text-green-800' :
                      building.efficiency >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {building.efficiency >= 80 ? 'Optimal' : 
                       building.efficiency >= 60 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-1">Peak Usage Identified</h3>
              <p className="text-sm text-blue-700">Highest energy consumption occurs Tuesday-Thursday, 2-6 PM</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-1">Best Performer</h3>
              <p className="text-sm text-green-700">Waldo Library leads with 18.5% energy reduction</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-900 mb-1">Improvement Opportunity</h3>
              <p className="text-sm text-yellow-700">Parkview Campus shows potential for 8% additional savings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Thermometer className="h-5 w-5 text-energy-green mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Temperature Optimization</h3>
                <p className="text-sm text-gray-600">Adjust Parkview Campus settings by +2°F for optimal efficiency</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-energy-blue mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">User Engagement</h3>
                <p className="text-sm text-gray-600">Target dining centers with awareness campaigns to boost participation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-energy-orange mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Schedule Optimization</h3>
                <p className="text-sm text-gray-600">Implement weekend setback schedules across all facilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
