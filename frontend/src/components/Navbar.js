import React from 'react';
import { 
  Home, 
  Zap, 
  ClipboardList, 
  MessageCircle,
  BarChart3,
  Leaf
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navigation = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'Action', id: 'action', icon: Zap },
    { name: 'Yearly', id: 'yearly', icon: BarChart3 },
    { name: 'Forms', id: 'survey', icon: ClipboardList },
    { name: 'ChatBot', id: 'chatbot', icon: MessageCircle },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <span className="font-bold text-xl text-green-600">SmartComfort</span>
                <span className="text-xs text-gray-500 block">WMU HVAC Optimization</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex overflow-x-auto py-2 space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 bg-gray-100'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
