import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  ClipboardList, 
  Lightbulb, 
  DollarSign, 
  Menu,
  X,
  Leaf,
  Settings,
  Database
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Survey', href: '/survey', icon: ClipboardList },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Intelligence', href: '/intelligence', icon: Lightbulb },
    { name: 'Recommendations', href: '/recommendations', icon: Settings },
    { name: 'Power BI', href: '/powerbi', icon: Database },
    { name: 'Energy Savings', href: '/savings', icon: DollarSign },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-energy-green" />
              <div>
                <span className="font-bold text-xl text-wmu-green">SmartComfort</span>
                <span className="text-xs text-gray-500 block">WMU HVAC Optimization</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'bg-energy-green text-white'
                      : 'text-gray-700 hover:bg-energy-green hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-energy-green hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-energy-green"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-energy-green text-white'
                        : 'text-gray-700 hover:bg-energy-green hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
