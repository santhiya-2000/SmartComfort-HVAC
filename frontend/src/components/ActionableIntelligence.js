import React, { useState } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  Activity,
  Clock,
  Users,
  Building,
  Lightbulb,
  Target,
  BarChart3,
  Settings,
  ChevronRight,
  Info,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';

const ActionableIntelligence = () => {
  const [selectedView, setSelectedView] = useState('overview');

  const views = [
    { id: 'overview', label: 'AI Insights', icon: Brain },
    { id: 'comfort-efficiency', label: 'Comfort-Efficiency Tradeoff', icon: Target },
    { id: 'behavior', label: 'Behavior Analysis', icon: Users },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'policy', label: 'Policy View', icon: Settings }
  ];

  // AI-Generated Insights
  const aiInsights = [
    {
      id: 1,
      type: 'critical',
      title: 'After-Hours Energy Waste Detected',
      explanation: 'Building X is cooling empty rooms after 7 PM, wasting 15% of daily energy',
      rootCause: 'HVAC schedule not aligned with actual occupancy patterns',
      impact: '$45/day potential savings',
      action: 'Adjust HVAC schedule to 6 AM - 7 PM',
      confidence: 92
    },
    {
      id: 2,
      type: 'warning',
      title: 'Occupancy-HVAC Mismatch',
      explanation: 'Library occupancy is 30% but HVAC running at 80% capacity',
      rootCause: 'Manual thermostat overrides during low occupancy',
      impact: '12% energy reduction opportunity',
      action: 'Implement automated occupancy-based controls',
      confidence: 87
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Weekend Optimization Potential',
      explanation: 'Dining Hall A uses 40% of weekday energy on weekends with 10% occupancy',
      rootCause: 'Fixed schedule ignoring weekend patterns',
      impact: '$180/weekend savings',
      action: 'Reduce weekend HVAC runtime by 60%',
      confidence: 78
    }
  ];

  // Comfort-Efficiency Tradeoff Data
  const comfortEfficiencyData = [
    { comfort: 95, energy: 12, balance: 85 },
    { comfort: 92, energy: 8, balance: 92 },
    { comfort: 88, energy: -6, balance: 95 },
    { comfort: 85, energy: -12, balance: 88 },
    { comfort: 80, energy: -18, balance: 78 }
  ];

  const radarData = [
    { subject: 'Comfort', A: 88, B: 92, fullMark: 100 },
    { subject: 'Energy Efficiency', A: 95, B: 78, fullMark: 100 },
    { subject: 'Cost Savings', A: 85, B: 70, fullMark: 100 },
    { subject: 'User Satisfaction', A: 90, B: 95, fullMark: 100 },
    { subject: 'Environmental Impact', A: 92, B: 82, fullMark: 100 }
  ];

  // Behavior Analysis Data
  const behaviorPatterns = [
    { time: '6AM', occupancy: 15, hvacUsage: 45, mismatch: 30 },
    { time: '9AM', occupancy: 85, hvacUsage: 80, mismatch: -5 },
    { time: '12PM', occupancy: 95, hvacUsage: 90, mismatch: -5 },
    { time: '3PM', occupancy: 75, hvacUsage: 85, mismatch: 10 },
    { time: '6PM', occupancy: 40, hvacUsage: 75, mismatch: 35 },
    { time: '9PM', occupancy: 10, hvacUsage: 60, mismatch: 50 },
    { time: '12AM', occupancy: 5, hvacUsage: 40, mismatch: 35 }
  ];

  const overrideFrequency = [
    { building: 'Housing', overrides: 45, efficiency: 78 },
    { building: 'Dining', overrides: 23, efficiency: 85 },
    { building: 'Library', overrides: 67, efficiency: 65 },
    { building: 'Parkview', overrides: 34, efficiency: 82 },
    { building: 'East Campus', overrides: 28, efficiency: 88 }
  ];

  // Policy View Data
  const policyMetrics = {
    facilities: {
      systemEfficiency: 82,
      recommendations: 15,
      implemented: 8,
      costSavings: 2847
    },
    admin: {
      totalSavings: 2847,
      carbonReduction: 1.2,
      roi: 142,
      budgetImpact: 45000
    },
    housing: {
      behaviorImpact: 78,
      studentSatisfaction: 85,
      energyReduction: 15.2,
      participation: 82
    },
    students: {
      awareness: 75,
      nudgeResponse: 68,
      personalSavings: 45,
      engagement: 82
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'opportunity': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'opportunity': return Lightbulb;
      default: return Info;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="bg-gradient-to-r from-energy-blue to-energy-green rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Brain className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Actionable Intelligence</h2>
        </div>
        <p className="text-lg opacity-90">Our dashboard explains energy waste, not just visualizes it</p>
      </div>

      {/* AI-Generated Insights */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-energy-blue" />
          AI-Generated Explanations
        </h3>
        
        {aiInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <div key={insight.id} className={`border-l-4 ${getInsightColor(insight.type)} p-6 rounded-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <span className="text-sm text-gray-500">Confidence: {insight.confidence}%</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">What's happening:</p>
                        <p className="text-sm text-gray-600">{insight.explanation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Root cause:</p>
                        <p className="text-sm text-gray-600">{insight.rootCause}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Impact:</p>
                        <p className="text-sm text-gray-600">{insight.impact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Recommended action:</p>
                        <p className="text-sm text-gray-600">{insight.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="ml-4 px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                  <span>Implement</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderComfortEfficiency = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Comfort-Efficiency Tradeoff Modeling</h3>
        <p className="text-gray-600 mb-6">Find the optimal balance between occupant comfort and energy efficiency</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tradeoff Chart */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Comfort vs Energy Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={comfortEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="comfort" label={{ value: 'Comfort Score (%)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Energy Change (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="energy" stroke="#EF4444" name="Energy Change" strokeWidth={2} />
                <Line type="monotone" dataKey="balance" stroke="#10B981" name="Optimal Balance" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Multi-Criteria Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current Settings" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="Recommended" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendation Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-red-200 bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-red-900">High Comfort</span>
              <span className="text-2xl font-bold text-red-600">92%</span>
            </div>
            <p className="text-sm text-red-700">+8% energy consumption</p>
            <p className="text-xs text-red-600 mt-2">Not recommended - excessive energy use</p>
          </div>
          
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-900">Optimal Balance</span>
              <span className="text-2xl font-bold text-green-600">88%</span>
            </div>
            <p className="text-sm text-green-700">-6% energy consumption</p>
            <p className="text-xs text-green-600 mt-2">Recommended - best comfort-efficiency balance</p>
          </div>
          
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-yellow-900">Energy Focus</span>
              <span className="text-2xl font-bold text-yellow-600">85%</span>
            </div>
            <p className="text-sm text-yellow-700">-12% energy consumption</p>
            <p className="text-xs text-yellow-600 mt-2">Consider if comfort can be adjusted</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBehavior = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Behavior Layer Analysis</h3>
        <p className="text-gray-600 mb-6">Understanding real human patterns, not just assuming perfect users</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Occupancy-HVAC Mismatch */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Occupancy vs HVAC Mismatch</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={behaviorPatterns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="occupancy" stroke="#3B82F6" name="Occupancy %" strokeWidth={2} />
                <Line type="monotone" dataKey="hvacUsage" stroke="#EF4444" name="HVAC Usage %" strokeWidth={2} />
                <Line type="monotone" dataKey="mismatch" stroke="#F97316" name="Mismatch" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Override Frequency */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Thermostat Override Frequency</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overrideFrequency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="building" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="overrides" fill="#F97316" name="Monthly Overrides" />
                <Bar dataKey="efficiency" fill="#10B981" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Behavior Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">After-Hours Usage</h4>
            </div>
            <p className="text-sm text-blue-700">35% of energy consumed after 7 PM with {'<10%'} occupancy</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <h4 className="font-semibold text-yellow-900">Override Patterns</h4>
            </div>
            <p className="text-sm text-yellow-700">Library has highest override rate at 67/month</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Peak Mismatch</h4>
            </div>
            <p className="text-sm text-green-700">3-6 PM shows highest occupancy-HVAC gap</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendation Engine</h3>
        <p className="text-gray-600 mb-6">Turning insights into actionable recommendations</p>
        
        <div className="space-y-4">
          <div className="border-l-4 border-energy-green bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">HVAC Schedule Optimization</h4>
                <p className="text-sm text-gray-600 mt-1">Reduce airflow by 15% after 6 PM in Building X</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-green-700">Savings: $45/day</span>
                  <span className="text-sm text-green-700">Impact: Low</span>
                  <span className="text-sm text-green-700">Effort: 1 hour</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors">
                Implement
              </button>
            </div>
          </div>

          <div className="border-l-4 border-energy-blue bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Weekend Schedule Adjustment</h4>
                <p className="text-sm text-gray-600 mt-1">Adjust weekend schedule for Dining Hall A</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-blue-700">Savings: $180/weekend</span>
                  <span className="text-sm text-blue-700">Impact: Medium</span>
                  <span className="text-sm text-blue-700">Effort: 2 hours</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-energy-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
                Implement
              </button>
            </div>
          </div>

          <div className="border-l-4 border-energy-orange bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Behavior Nudge Deployment</h4>
                <p className="text-sm text-gray-600 mt-1">High waste detected → trigger behavior nudge campaign</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-orange-700">Savings: $120/month</span>
                  <span className="text-sm text-orange-700">Impact: High</span>
                  <span className="text-sm text-orange-700">Effort: 4 hours</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-energy-orange text-white rounded-lg hover:bg-orange-600 transition-colors">
                Deploy Nudges
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicy = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy & Administrative View</h3>
        <p className="text-gray-600 mb-6">Multi-stakeholder perspectives for organizational decision-making</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Facilities View */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Facilities</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">System Efficiency</span>
                <span className="font-semibold">{policyMetrics.facilities.systemEfficiency}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Recommendations</span>
                <span className="font-semibold">{policyMetrics.facilities.recommendations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Implemented</span>
                <span className="font-semibold">{policyMetrics.facilities.implemented}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost Savings</span>
                <span className="font-semibold">${policyMetrics.facilities.costSavings}</span>
              </div>
            </div>
          </div>

          {/* Admin View */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Administration</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Savings</span>
                <span className="font-semibold">{policyMetrics.admin.totalSavings} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Carbon Reduction</span>
                <span className="font-semibold">{policyMetrics.admin.carbonReduction} tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI</span>
                <span className="font-semibold">{policyMetrics.admin.roi}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budget Impact</span>
                <span className="font-semibold">${policyMetrics.admin.budgetImpact.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Housing View */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Housing/Dining</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Behavior Impact</span>
                <span className="font-semibold">{policyMetrics.housing.behaviorImpact}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Satisfaction</span>
                <span className="font-semibold">{policyMetrics.housing.studentSatisfaction}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Energy Reduction</span>
                <span className="font-semibold">{policyMetrics.housing.energyReduction}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Participation</span>
                <span className="font-semibold">{policyMetrics.housing.participation}%</span>
              </div>
            </div>
          </div>

          {/* Students View */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Students</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Awareness</span>
                <span className="font-semibold">{policyMetrics.students.awareness}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Nudge Response</span>
                <span className="font-semibold">{policyMetrics.students.nudgeResponse}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Personal Savings</span>
                <span className="font-semibold">${policyMetrics.students.personalSavings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement</span>
                <span className="font-semibold">{policyMetrics.students.engagement}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedView) {
      case 'overview': return renderOverview();
      case 'comfort-efficiency': return renderComfortEfficiency();
      case 'behavior': return renderBehavior();
      case 'recommendations': return renderRecommendations();
      case 'policy': return renderPolicy();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-wmu-green mb-2">Actionable Intelligence</h1>
        <p className="text-gray-600">AI-powered insights that explain energy waste and drive action</p>
      </div>

      {/* View Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedView === view.id
                    ? 'bg-energy-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-1" />
                <p className="text-xs font-medium">{view.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default ActionableIntelligence;
