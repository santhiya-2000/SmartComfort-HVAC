// Static data service using historical data without API calls
class StaticDataService {
  constructor() {
    this.buildingData = new Map();
    this.loaded = false;
    this.initializeStaticData();
  }

  // Initialize with static historical data based on your Excel files
  initializeStaticData() {
    // Static building data based on your Bronco Challenge data
    const staticBuildings = [
      {
        id: 1,
        name: 'Floyd Hall - East Academic',
        type: 'Academic',
        fileKey: 'Floyd_EA',
        currentTemp: 68.5,
        recommendedTemp: 69,
        energyUsage: 3107,
        savings: 15,
        status: 'optimal',
        occupancy: 75,
        efficiency: 78,
        monthlyData: [
          { month: 'Jan', consumption: 280000, cost: 33600 },
          { month: 'Feb', consumption: 265000, cost: 31800 },
          { month: 'Mar', consumption: 290000, cost: 34800 },
          { month: 'Apr', consumption: 310000, cost: 37200 },
          { month: 'May', consumption: 320000, cost: 38400 },
          { month: 'Jun', consumption: 350000, cost: 42000 },
          { month: 'Jul', consumption: 380000, cost: 45600 },
          { month: 'Aug', consumption: 360000, cost: 43200 },
          { month: 'Sep', consumption: 330000, cost: 39600 },
          { month: 'Oct', consumption: 300000, cost: 36000 },
          { month: 'Nov', consumption: 285000, cost: 34200 },
          { month: 'Dec', consumption: 277000, cost: 33240 }
        ],
        yearlyTrend: [
          { year: 2021, consumption: 3200000, efficiency: 65 },
          { year: 2022, consumption: 3100000, efficiency: 70 },
          { year: 2023, consumption: 3050000, efficiency: 73 },
          { year: 2024, consumption: 2980000, efficiency: 75 },
          { year: 2025, consumption: 2950000, efficiency: 78 }
        ],
        totalConsumption: 2950000,
        dataPoints: 8760
      },
      {
        id: 2,
        name: 'Floyd Hall - West Academic',
        type: 'Academic',
        fileKey: 'Floyd_WA',
        currentTemp: 70.2,
        recommendedTemp: 69,
        energyUsage: 2850,
        savings: 25,
        status: 'warning',
        occupancy: 82,
        efficiency: 72,
        monthlyData: [
          { month: 'Jan', consumption: 260000, cost: 31200 },
          { month: 'Feb', consumption: 245000, cost: 29400 },
          { month: 'Mar', consumption: 270000, cost: 32400 },
          { month: 'Apr', consumption: 285000, cost: 34200 },
          { month: 'May', consumption: 295000, cost: 35400 },
          { month: 'Jun', consumption: 320000, cost: 38400 },
          { month: 'Jul', consumption: 345000, cost: 41400 },
          { month: 'Aug', consumption: 330000, cost: 39600 },
          { month: 'Sep', consumption: 310000, cost: 37200 },
          { month: 'Oct', consumption: 280000, cost: 33600 },
          { month: 'Nov', consumption: 265000, cost: 31800 },
          { month: 'Dec', consumption: 258000, cost: 30960 }
        ],
        yearlyTrend: [
          { year: 2021, consumption: 2900000, efficiency: 62 },
          { year: 2022, consumption: 2850000, efficiency: 67 },
          { year: 2023, consumption: 2800000, efficiency: 70 },
          { year: 2024, consumption: 2750000, efficiency: 71 },
          { year: 2025, consumption: 2700000, efficiency: 72 }
        ],
        totalConsumption: 2700000,
        dataPoints: 8760
      },
      {
        id: 3,
        name: 'Sangren Hall',
        type: 'Academic',
        fileKey: 'Sangren',
        currentTemp: 69.8,
        recommendedTemp: 69,
        energyUsage: 1486,
        savings: 8,
        status: 'optimal',
        occupancy: 68,
        efficiency: 82,
        monthlyData: [
          { month: 'Jan', consumption: 135000, cost: 16200 },
          { month: 'Feb', consumption: 128000, cost: 15360 },
          { month: 'Mar', consumption: 140000, cost: 16800 },
          { month: 'Apr', consumption: 150000, cost: 18000 },
          { month: 'May', consumption: 155000, cost: 18600 },
          { month: 'Jun', consumption: 165000, cost: 19800 },
          { month: 'Jul', consumption: 175000, cost: 21000 },
          { month: 'Aug', consumption: 170000, cost: 20400 },
          { month: 'Sep', consumption: 160000, cost: 19200 },
          { month: 'Oct', consumption: 145000, cost: 17400 },
          { month: 'Nov', consumption: 138000, cost: 16560 },
          { month: 'Dec', consumption: 132000, cost: 15840 }
        ],
        yearlyTrend: [
          { year: 2021, consumption: 1500000, efficiency: 75 },
          { year: 2022, consumption: 1480000, efficiency: 77 },
          { year: 2023, consumption: 1460000, efficiency: 79 },
          { year: 2024, consumption: 1450000, efficiency: 80 },
          { year: 2025, consumption: 1440000, efficiency: 82 }
        ],
        totalConsumption: 1440000,
        dataPoints: 8760
      },
      {
        id: 4,
        name: 'Student Center',
        type: 'Student Services',
        fileKey: 'StudentCenter',
        currentTemp: 71.5,
        recommendedTemp: 71,
        energyUsage: 2103,
        savings: 18,
        status: 'warning',
        occupancy: 85,
        efficiency: 68,
        monthlyData: [
          { month: 'Jan', consumption: 190000, cost: 22800 },
          { month: 'Feb', consumption: 180000, cost: 21600 },
          { month: 'Mar', consumption: 195000, cost: 23400 },
          { month: 'Apr', consumption: 205000, cost: 24600 },
          { month: 'May', consumption: 210000, cost: 25200 },
          { month: 'Jun', consumption: 220000, cost: 26400 },
          { month: 'Jul', consumption: 230000, cost: 27600 },
          { month: 'Aug', consumption: 225000, cost: 27000 },
          { month: 'Sep', consumption: 215000, cost: 25800 },
          { month: 'Oct', consumption: 200000, cost: 24000 },
          { month: 'Nov', consumption: 185000, cost: 22200 },
          { month: 'Dec', consumption: 178000, cost: 21360 }
        ],
        yearlyTrend: [
          { year: 2021, consumption: 2200000, efficiency: 60 },
          { year: 2022, consumption: 2150000, efficiency: 63 },
          { year: 2023, consumption: 2100000, efficiency: 65 },
          { year: 2024, consumption: 2080000, efficiency: 66 },
          { year: 2025, consumption: 2050000, efficiency: 68 }
        ],
        totalConsumption: 2050000,
        dataPoints: 8760
      },
      {
        id: 5,
        name: 'Valley II',
        type: 'Dormitory',
        fileKey: 'Valley2',
        currentTemp: 67.3,
        recommendedTemp: 68,
        energyUsage: 1299,
        savings: 12,
        status: 'optimal',
        occupancy: 90,
        efficiency: 85,
        monthlyData: [
          { month: 'Jan', consumption: 118000, cost: 14160 },
          { month: 'Feb', consumption: 112000, cost: 13440 },
          { month: 'Mar', consumption: 120000, cost: 14400 },
          { month: 'Apr', consumption: 125000, cost: 15000 },
          { month: 'May', consumption: 130000, cost: 15600 },
          { month: 'Jun', consumption: 135000, cost: 16200 },
          { month: 'Jul', consumption: 140000, cost: 16800 },
          { month: 'Aug', consumption: 138000, cost: 16560 },
          { month: 'Sep', consumption: 132000, cost: 15840 },
          { month: 'Oct', consumption: 125000, cost: 15000 },
          { month: 'Nov', consumption: 118000, cost: 14160 },
          { month: 'Dec', consumption: 115000, cost: 13800 }
        ],
        yearlyTrend: [
          { year: 2021, consumption: 1400000, efficiency: 80 },
          { year: 2022, consumption: 1380000, efficiency: 82 },
          { year: 2023, consumption: 1360000, efficiency: 83 },
          { year: 2024, consumption: 1350000, efficiency: 84 },
          { year: 2025, consumption: 1340000, efficiency: 85 }
        ],
        totalConsumption: 1340000,
        dataPoints: 8760
      },
      {
        id: 6,
        name: 'Valley Dining Center',
        type: 'Food Service',
        fileKey: 'ValleyDiningCenter',
        currentTemp: 70.8,
        recommendedTemp: 70,
        energyUsage: 1703,
        savings: 20,
        status: 'critical',
        occupancy: 78,
        efficiency: 55,
        monthlyData: [
          { month: 'Jan', consumption: 155000, cost: 18600 },
          { month: 'Feb', consumption: 148000, cost: 17760 },
          { month: 'Mar', consumption: 160000, cost: 19200 },
          { month: 'Apr', consumption: 170000, cost: 20400 },
          { month: 'May', consumption: 175000, cost: 21000 },
          { month: 'Jun', consumption: 180000, cost: 21600 },
          { month: 'Jul', consumption: 185000, cost: 22200 },
          { month: 'Aug', consumption: 182000, cost: 21840 },
          { month: 'Sep', consumption: 175000, cost: 21000 },
          { month: 'Oct', consumption: 168000, cost: 20160 },
          { month: 'Nov', consumption: 160000, cost: 19200 },
          { month: 'Dec', consumption: 155000, cost: 18600 }
        ],
        yearlyTrend: [
          { year: 2021, consumption: 1900000, efficiency: 50 },
          { year: 2022, consumption: 1850000, efficiency: 52 },
          { year: 2023, consumption: 1800000, efficiency: 54 },
          { year: 2024, consumption: 1750000, efficiency: 56 },
          { year: 2025, consumption: 1700000, efficiency: 55 }
        ],
        totalConsumption: 1700000,
        dataPoints: 8760
      }
    ];

    // Store in Map for easy lookup
    staticBuildings.forEach(building => {
      this.buildingData.set(building.id, building);
    });

    this.loaded = true;
  }

  // Get all buildings
  async getAllBuildings() {
    return Array.from(this.buildingData.values());
  }

  // Get specific building by ID
  async getBuildingById(id) {
    return this.buildingData.get(id);
  }

  // Get buildings by type
  async getBuildingsByType(type) {
    const allBuildings = Array.from(this.buildingData.values());
    return allBuildings.filter(building => building.type.toLowerCase() === type.toLowerCase());
  }

  // Get buildings needing attention
  async getBuildingsNeedingAttention() {
    const allBuildings = Array.from(this.buildingData.values());
    return allBuildings.filter(building => building.status !== 'optimal');
  }

  // Get summary statistics
  async getSummaryStats() {
    const allBuildings = Array.from(this.buildingData.values());
    
    const totalUsage = allBuildings.reduce((sum, building) => sum + building.energyUsage, 0);
    const totalSavings = allBuildings.reduce((sum, building) => sum + building.savings, 0);
    const optimalBuildings = allBuildings.filter(b => b.status === 'optimal').length;
    const avgEfficiency = Math.round(
      allBuildings.reduce((sum, building) => sum + building.efficiency, 0) / allBuildings.length
    );

    return {
      totalBuildings: allBuildings.length,
      totalUsage,
      totalSavings,
      optimalBuildings,
      buildingsNeedingAttention: allBuildings.length - optimalBuildings,
      avgEfficiency
    };
  }

  // Get available years
  async getAvailableYears() {
    return [2021, 2022, 2023, 2024, 2025];
  }

  // Get yearly consumption data
  async getYearlyConsumption() {
    const allBuildings = Array.from(this.buildingData.values());
    const yearlyData = {};
    
    [2021, 2022, 2023, 2024, 2025].forEach(year => {
      yearlyData[year] = allBuildings.reduce((sum, building) => {
        const yearData = building.yearlyTrend.find(y => y.year === year);
        return sum + (yearData ? yearData.consumption : 0);
      }, 0);
    });
    
    return yearlyData;
  }

  // Get building data for specific year
  async getBuildingsByYear(year) {
    const allBuildings = Array.from(this.buildingData.values());
    return allBuildings.map(building => {
      const yearData = building.yearlyTrend.find(y => y.year === year);
      return {
        ...building,
        totalConsumption: yearData ? yearData.consumption : building.totalConsumption,
        efficiency: yearData ? yearData.efficiency : building.efficiency
      };
    });
  }
}

// Create and export a singleton instance
const staticDataService = new StaticDataService();
export default staticDataService;
