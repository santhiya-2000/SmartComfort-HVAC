import React from 'react';
import { 
  Plus, 
  Download, 
  Settings, 
  Bell,
  FileText,
  Users,
  Thermometer,
  Zap
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'New Survey',
      description: 'Collect HVAC behavior data',
      icon: Plus,
      color: 'energy-green',
      path: '/survey'
    },
    {
      title: 'Generate Report',
      description: 'Download weekly analytics',
      icon: Download,
      color: 'energy-blue',
      action: 'generate-report'
    },
    {
      title: 'Building Settings',
      description: 'Configure HVAC parameters',
      icon: Settings,
      color: 'energy-orange',
      path: '/recommendations'
    },
    {
      title: 'Send Nudges',
      description: 'Deploy behavior reminders',
      icon: Bell,
      color: 'wmu-green',
      action: 'send-nudges'
    }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'generate-report':
        console.log('Generating report...');
        // Implement report generation logic
        break;
      case 'send-nudges':
        console.log('Sending nudges...');
        // Implement nudge sending logic
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={() => action.path ? (window.location.href = action.path) : handleAction(action.action)}
            className={`w-full p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 text-left group ${
              action.color === 'energy-green' ? 'hover:border-energy-green' :
              action.color === 'energy-blue' ? 'hover:border-energy-blue' :
              action.color === 'energy-orange' ? 'hover:border-energy-orange' :
              'hover:border-wmu-green'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${action.color}-100 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 text-${action.color}-600`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm">{action.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{action.description}</p>
              </div>
            </div>
          </button>
        );
      })}

      <div className="mt-6 p-4 bg-gradient-to-r from-energy-green to-energy-blue rounded-lg text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-5 w-5" />
          <h3 className="font-semibold text-sm">Quick Tip</h3>
        </div>
        <p className="text-xs opacity-90">
          Raising temperature by 1°F can reduce HVAC energy consumption by up to 3-5% while maintaining comfort.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-600">Avg. Campus Temp</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">72°F</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-600">Active Users</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">247</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-600">Surveys Today</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">18</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
