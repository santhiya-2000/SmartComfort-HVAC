import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Zap, DollarSign, Leaf, TrendingUp, Building } from 'lucide-react';
import staticDataService from '../services/staticDataService';

const YearlyDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [availableYears, setAvailableYears] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Cache for loaded data
  const [yearlyCache, setYearlyCache] = useState({});

  const loadData = async () => {
    if (dataLoaded) return; // Skip if already loaded
    
    try {
      const [years, yearly] = await Promise.all([
        staticDataService.getAvailableYears(),
        staticDataService.getYearlyConsumption()
      ]);

      setAvailableYears(years);
      setYearlyCache(yearly);
      
      if (years.length > 0) {
        setSelectedYear(Math.max(...years));
      }
      
      setDataLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
      setDataLoaded(true); // Set loaded to prevent infinite loading
    } finally {
      setLoading(false);
    }
  };

  const loadYearData = useCallback(async () => {
    // Check cache first
    if (yearlyCache[selectedYear]) {
      const buildingsData = await staticDataService.getBuildingsByYear(selectedYear);
      setBuildingData(buildingsData);
      return;
    }

    try {
      const buildingsData = await staticDataService.getBuildingsByYear(selectedYear);
      
      setBuildingData(buildingsData);
    } catch (error) {
      console.error('Error loading year data:', error);
      setBuildingData([]);
    }
  }, [selectedYear, yearlyCache]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedYear && dataLoaded) {
      loadYearData();
    }
  }, [selectedYear, dataLoaded, loadYearData]);

  // Process data for charts like your image
  const getBuildingConsumptionData = () => {
    if (!Array.isArray(buildingData) || buildingData.length === 0) {
      return [];
    }
    
    return buildingData.map(building => ({
      name: building.name ? building.name.replace(' Hall', '').replace(' Center', '').replace(' Dining', '') : 'Unknown',
      consumption: Math.round((building.totalConsumption || 0) / 1000), // Convert to thousands
      kWh: building.totalConsumption || 0
    })).sort((a, b) => b.consumption - a.consumption);
  };

  const getEnergyBreakdownData = () => {
    // Similar to your donut chart
    return [
      { name: 'HVAC', value: 50, color: '#10b981' },
      { name: 'Lighting', value: 20, color: '#3b82f6' },
      { name: 'Plug Load', value: 15, color: '#f59e0b' },
      { name: 'Other', value: 15, color: '#8b5cf6' }
    ];
  };

  const getCostComparisonData = () => {
    if (!Array.isArray(buildingData) || buildingData.length === 0) {
      return [
        { name: 'Current Spend', value: 50 },
        { name: 'AI Optimized', value: 35 },
        { name: 'Annual Savings', value: 15 }
      ];
    }
    
    const totalConsumption = buildingData.reduce((sum, b) => sum + (b.totalConsumption || 0), 0);
    const currentCost = totalConsumption * 0.12; // $0.12 per kWh
    const optimizedCost = currentCost * 0.7; // 30% savings
    
    return [
      { name: 'Current Spend', value: Math.round(currentCost / 1000) }, // Convert to thousands
      { name: 'AI Optimized', value: Math.round(optimizedCost / 1000) },
      { name: 'Annual Savings', value: Math.round((currentCost - optimizedCost) / 1000) }
    ];
  };

  const getTotalStats = () => {
    if (!Array.isArray(buildingData) || buildingData.length === 0) {
      return {
        totalConsumption: 0,
        totalCost: 0,
        co2Emissions: 0
      };
    }
    
    const totalConsumption = buildingData.reduce((sum, b) => sum + (b.totalConsumption || 0), 0);
    const totalCost = totalConsumption * 0.12;
    const co2Emissions = totalConsumption * 0.0007; // tons of CO2 per kWh
    
    return {
      totalConsumption: Math.round(totalConsumption / 1000000), // In millions
      totalCost: Math.round(totalCost / 1000), // In thousands
      co2Emissions: Math.round(co2Emissions)
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = getTotalStats();
  const consumptionData = getBuildingConsumptionData();
  const breakdownData = getEnergyBreakdownData();
  const costData = getCostComparisonData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Annual Energy Dashboard</h1>
            <p className="text-blue-100">Real energy data from WMU's own submeters - {selectedYear}</p>
          </div>
          
          {/* Year Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              {availableYears.map(year => (
                <option key={year} value={year} className="text-gray-900">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8 text-yellow-600" />
            <span className="text-sm text-gray-500">TOTAL ENERGY</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalConsumption}M</h3>
          <p className="text-gray-600">kWh consumed annually across {buildingData.length} WMU buildings</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span className="text-sm text-gray-500">ANNUAL COST</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">${stats.totalCost}K</h3>
          <p className="text-gray-600">Estimated annual energy cost to WMU</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-gray-500">CO2 EMISSIONS</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.co2Emissions} t</h3>
          <p className="text-gray-600">CO2 emitted per year from these buildings</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Energy Breakdown</h2>
          <div className="flex flex-col items-center">
            <PieChart width={300} height={300}>
              <Pie
                data={breakdownData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Annual HVAC Cost WMU</h2>
          <BarChart width={400} height={300} data={costData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}K`} />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">Annual Savings: $15-25K</p>
          </div>
        </div>
      </div>

      {/* Building Consumption */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">kWh Consumption by Building ({selectedYear})</h2>
        <BarChart width={800} height={400} data={consumptionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name) => [
            name === 'consumption' ? `${value}K kWh` : `${value} kWh`,
            name === 'consumption' ? 'Consumption' : 'Total'
          ]} />
          <Legend />
          <Bar dataKey="consumption" fill="#10b981" name="Consumption (K kWh)" />
        </BarChart>
      </div>

      {/* Problem Areas */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">THE PROBLEM</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Overcooling in spring</h3>
              <p className="text-gray-600 text-sm">AC runs full-blast on 65°F days</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Empty rooms, full power</h3>
              <p className="text-gray-600 text-sm">HVAC runs at full load 24/7 regardless of occupancy</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Zero predictive control</h3>
              <p className="text-gray-600 text-sm">WMU's BAS reacts. SmartComfort AI predicts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyDashboard;
