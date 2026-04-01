import * as XLSX from 'xlsx';

// Building name mapping from file names to display names
const buildingNameMap = {
  'Floyd_EA': 'Floyd Hall - East Academic',
  'Floyd_EB': 'Floyd Hall - East Basement', 
  'Floyd_EC': 'Floyd Hall - East Classroom',
  'Floyd_WA': 'Floyd Hall - West Academic',
  'Floyd_WB': 'Floyd Hall - West Basement',
  'Floyd_WC': 'Floyd Hall - West Classroom',
  'Sangren': 'Sangren Hall',
  'StudentCenter': 'Student Center',
  'Valley2': 'Valley II',
  'ValleyDiningCenter': 'Valley Dining Center'
};

// Building type classification
const buildingTypes = {
  'Floyd_EA': 'Academic',
  'Floyd_EB': 'Academic',
  'Floyd_EC': 'Academic',
  'Floyd_WA': 'Academic',
  'Floyd_WB': 'Academic',
  'Floyd_WC': 'Academic',
  'Sangren': 'Academic',
  'StudentCenter': 'Student Services',
  'Valley2': 'Dormitory',
  'ValleyDiningCenter': 'Food Service'
};

class DataService {
  constructor() {
    this.buildingData = new Map();
    this.loaded = false;
  }

  // Load Excel data from the backend API
  async loadBuildingData() {
    if (this.loaded) return this.buildingData;

    try {
      // Fetch real data from backend API
      const response = await fetch('http://localhost:8000/api/buildings');
      if (!response.ok) {
        throw new Error('Failed to fetch building data');
      }
      
      const responseData = await response.json();
      
      // Handle different response formats
      let buildingsData = responseData;
      if (responseData && typeof responseData === 'object' && responseData.buildings) {
        buildingsData = responseData.buildings;
      }
      
      // Ensure we have an array
      if (!Array.isArray(buildingsData)) {
        console.error('Expected array but got:', typeof buildingsData, buildingsData);
        throw new Error('Invalid data format: expected array');
      }
      
      // Store processed data
      buildingsData.forEach(building => {
        this.buildingData.set(building.id, building);
      });
      
      this.loaded = true;
      return this.buildingData;
    } catch (error) {
      console.error('Error loading building data:', error);
      // Fallback to mock data if API fails
      const mockData = this.generateMockDataFromFiles();
      mockData.forEach(building => {
        this.buildingData.set(building.id, building);
      });
      this.loaded = true;
      return this.buildingData;
    }
  }

  // Generate mock data based on the available files
  generateMockDataFromFiles() {
    const buildings = [];
    let id = 1;

    // Generate data for each building type
    Object.entries(buildingNameMap).forEach(([fileKey, displayName]) => {
      // Simulate energy consumption data
      const baseConsumption = this.getBaseConsumption(fileKey);
      const currentTemp = 68 + Math.random() * 8; // 68-76°F
      const recommendedTemp = this.getRecommendedTemp(fileKey);
      
      buildings.push({
        id: id++,
        name: displayName,
        type: buildingTypes[fileKey] || 'Mixed Use',
        fileKey: fileKey,
        currentTemp: Math.round(currentTemp * 10) / 10,
        recommendedTemp: recommendedTemp,
        energyUsage: Math.round(baseConsumption + (Math.random() - 0.5) * baseConsumption * 0.2),
        savings: Math.round((currentTemp - recommendedTemp) * baseConsumption * 0.05),
        status: this.getStatus(currentTemp, recommendedTemp),
        occupancy: Math.round(60 + Math.random() * 35),
        efficiency: Math.round(55 + Math.random() * 40),
        monthlyData: this.generateMonthlyData(baseConsumption),
        yearlyTrend: this.generateYearlyTrend(baseConsumption)
      });
    });

    return buildings;
  }

  getBaseConsumption(fileKey) {
    // Base consumption in kWh per day (estimated from file sizes and building types)
    const consumptionMap = {
      'Floyd_EA': 2400,
      'Floyd_EB': 800,
      'Floyd_EC': 600,
      'Floyd_WA': 3200,
      'Floyd_WB': 3000,
      'Floyd_WC': 2900,
      'Sangren': 6500,
      'StudentCenter': 5200,
      'Valley2': 4100,
      'ValleyDiningCenter': 5800
    };
    return consumptionMap[fileKey] || 2000;
  }

  getRecommendedTemp(fileKey) {
    // Recommended temperatures based on building type
    const tempMap = {
      'Floyd_EA': 69, 'Floyd_EB': 68, 'Floyd_EC': 70,
      'Floyd_WA': 69, 'Floyd_WB': 68, 'Floyd_WC': 70,
      'Sangren': 69,
      'StudentCenter': 71,
      'Valley2': 68,
      'ValleyDiningCenter': 70
    };
    return tempMap[fileKey] || 69;
  }

  getStatus(currentTemp, recommendedTemp) {
    const difference = Math.abs(currentTemp - recommendedTemp);
    if (difference <= 1) return 'optimal';
    if (difference <= 3) return 'warning';
    return 'critical';
  }

  generateMonthlyData(baseConsumption) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      // Simulate seasonal variation
      const seasonalFactor = 1 + 0.3 * Math.sin((index - 1) * Math.PI / 6);
      return {
        month,
        consumption: Math.round(baseConsumption * seasonalFactor * (30 + Math.random() * 10)),
        cost: Math.round(baseConsumption * seasonalFactor * 0.12 * (30 + Math.random() * 10))
      };
    });
  }

  generateYearlyTrend(baseConsumption) {
    const years = [2021, 2022, 2023, 2024, 2025];
    return years.map(year => ({
      year,
      consumption: Math.round(baseConsumption * 365 * (0.9 + Math.random() * 0.3)),
      efficiency: Math.round(60 + Math.random() * 30)
    }));
  }

  // Get all buildings
  async getAllBuildings() {
    const data = await this.loadBuildingData();
    return Array.from(data.values());
  }

  // Get building by ID
  async getBuildingById(id) {
    const data = await this.loadBuildingData();
    return data.get(id);
  }

  // Get buildings by type
  async getBuildingsByType(type) {
    const allBuildings = await this.getAllBuildings();
    return allBuildings.filter(building => building.type === type);
  }

  // Get buildings that need attention
  async getBuildingsNeedingAttention() {
    const allBuildings = await this.getAllBuildings();
    return allBuildings.filter(building => building.status !== 'optimal');
  }

  // Get summary statistics
  async getSummaryStats() {
    try {
      const response = await fetch('http://localhost:8000/api/summary');
      if (!response.ok) {
        throw new Error('Failed to fetch summary stats');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching summary stats:', error);
      // Fallback to calculated stats from mock data
      const allBuildings = await this.getAllBuildings();
      
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
  }

  // Parse Excel file (for future backend implementation)
  parseExcelFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}

// Create and export a singleton instance
const dataService = new DataService();
export default dataService;
