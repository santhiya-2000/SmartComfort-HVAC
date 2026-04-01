import pandas as pd
import numpy as np
import os
from datetime import datetime, timedelta
from typing import Dict, List, Any
import glob

class BuildingDataProcessor:
    def __init__(self, data_folder: str = "../data/Bronco Challenge Data"):
        self.data_folder = data_folder
        self.building_name_map = {
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
        }
        
        self.building_types = {
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
        }
        
        self.recommended_temps = {
            'Floyd_EA': 69, 'Floyd_EB': 68, 'Floyd_EC': 70,
            'Floyd_WA': 69, 'Floyd_WB': 68, 'Floyd_WC': 70,
            'Sangren': 69,
            'StudentCenter': 71,
            'Valley2': 68,
            'ValleyDiningCenter': 70
        }

    def load_all_building_data(self, year: int = None) -> List[Dict[str, Any]]:
        """Load and process data for all buildings, optionally for a specific year"""
        buildings = []
        
        # Get all Excel files
        excel_files = glob.glob(os.path.join(self.data_folder, "*.xlsx"))
        
        # Group files by building
        building_files = {}
        for file_path in excel_files:
            filename = os.path.basename(file_path)
            building_key = self.extract_building_key(filename)
            file_year = self.extract_year_from_filename(filename)
            
            if building_key and building_key in self.building_name_map:
                if year and file_year != year:
                    continue  # Skip files not matching the requested year
                    
                if building_key not in building_files:
                    building_files[building_key] = []
                building_files[building_key].append(file_path)
        
        # Process each building
        for building_key, files in building_files.items():
            try:
                building_data = self.process_building_data(building_key, files)
                if building_data:
                    buildings.append(building_data)
            except Exception as e:
                print(f"Error processing {building_key}: {e}")
                continue
        
        return buildings

    def get_available_years(self) -> List[int]:
        """Get list of years for which data is available"""
        excel_files = glob.glob(os.path.join(self.data_folder, "*.xlsx"))
        years = set()
        
        for file_path in excel_files:
            filename = os.path.basename(file_path)
            year = self.extract_year_from_filename(filename)
            if year:
                years.add(year)
        
        return sorted(list(years))

    def get_yearly_consumption_by_building(self) -> Dict[str, Dict[int, float]]:
        """Get yearly consumption data for all buildings"""
        yearly_data = {}
        
        for building_key in self.building_name_map.keys():
            yearly_data[building_key] = {}
            
            # Get all files for this building
            building_files = glob.glob(os.path.join(self.data_folder, f"{building_key}_*.xlsx"))
            
            for file_path in building_files:
                year = self.extract_year_from_filename(os.path.basename(file_path))
                if year:
                    try:
                        df = pd.read_excel(file_path)
                        consumption = self.calculate_total_consumption(df)
                        yearly_data[building_key][year] = consumption
                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")
        
        return yearly_data

    def extract_year_from_filename(self, filename: str) -> int:
        """Extract year from filename"""
        for part in filename.split('_'):
            if part.endswith('.xlsx') and part[:-5].isdigit():
                return int(part[:-5])
        return 0

    def extract_building_key(self, filename: str) -> str:
        """Extract building key from filename"""
        for key in self.building_name_map.keys():
            if filename.startswith(key):
                return key
        return None

    def process_building_data(self, building_key: str, files: List[str]) -> Dict[str, Any]:
        """Process data for a specific building"""
        # Get the most recent file for current data
        most_recent_file = self.get_most_recent_file(files)
        
        if not most_recent_file:
            return None
        
        try:
            # Load the Excel file
            df = pd.read_excel(most_recent_file)
            
            # Calculate energy metrics
            total_consumption = self.calculate_total_consumption(df)
            daily_average = self.calculate_daily_average(df)
            
            # Generate current status (simulated)
            current_temp = 68 + np.random.normal(0, 2)
            recommended_temp = self.recommended_temps.get(building_key, 69)
            
            building_data = {
                'id': hash(building_key) % 10000,  # Simple ID generation
                'name': self.building_name_map[building_key],
                'type': self.building_types[building_key],
                'fileKey': building_key,
                'currentTemp': round(current_temp, 1),
                'recommendedTemp': recommended_temp,
                'energyUsage': round(daily_average),
                'savings': round(abs(current_temp - recommended_temp) * daily_average * 0.05),
                'status': self.get_status(current_temp, recommended_temp),
                'occupancy': round(60 + np.random.uniform(0, 35)),
                'efficiency': round(55 + np.random.uniform(0, 40)),
                'monthlyData': self.generate_monthly_data(daily_average),
                'yearlyTrend': self.generate_yearly_trend(daily_average, files),
                'totalConsumption': total_consumption,
                'dataPoints': len(df)
            }
            
            return building_data
            
        except Exception as e:
            print(f"Error processing file {most_recent_file}: {e}")
            return None

    def get_most_recent_file(self, files: List[str]) -> str:
        """Get the most recent file from a list of files"""
        if not files:
            return None
        
        # Sort by year in filename (assuming format includes year)
        def extract_year(filename):
            for part in filename.split('_'):
                if part.endswith('.xlsx') and part[:-5].isdigit():
                    return int(part[:-5])
            return 0
        
        return max(files, key=extract_year)

    def calculate_total_consumption(self, df: pd.DataFrame) -> float:
        """Calculate total consumption from DataFrame"""
        try:
            # Look for common energy/consumption column names
            possible_columns = [
                'kW', 'KW', 'Power', 'Energy', 'Consumption', 'Usage', 
                'Demand', 'Load', 'kWh', 'KWH', 'Total', 'Value'
            ]
            
            # Find the first matching column
            energy_column = None
            for col in df.columns:
                if any(keyword.lower() in str(col).lower() for keyword in possible_columns):
                    energy_column = col
                    break
            
            # If no specific column found, use the first numeric column with significant variance
            if energy_column is None:
                numeric_columns = df.select_dtypes(include=[np.number]).columns
                for col in numeric_columns:
                    # Skip columns that are likely timestamps or IDs
                    if df[col].std() > 100:  # Look for column with significant variation
                        energy_column = col
                        break
                
                # Last resort: use first numeric column
                if energy_column is None and len(numeric_columns) > 0:
                    energy_column = numeric_columns[0]
            
            if energy_column is not None:
                # Convert to numeric if needed and sum
                series = pd.to_numeric(df[energy_column], errors='coerce')
                return series.sum()
            
            return 0
        except Exception as e:
            print(f"Error calculating consumption: {e}")
            return 0

    def calculate_daily_average(self, df: pd.DataFrame) -> float:
        """Calculate daily average consumption"""
        total = self.calculate_total_consumption(df)
        
        # Estimate days from data length (assuming hourly readings)
        estimated_days = max(1, len(df) / 24)
        return total / estimated_days

    def get_status(self, current_temp: float, recommended_temp: float) -> str:
        """Determine building status based on temperature difference"""
        difference = abs(current_temp - recommended_temp)
        if difference <= 1:
            return 'optimal'
        elif difference <= 3:
            return 'warning'
        else:
            return 'critical'

    def generate_monthly_data(self, daily_average: float) -> List[Dict[str, Any]]:
        """Generate monthly consumption data"""
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        monthly_data = []
        for i, month in enumerate(months):
            # Simulate seasonal variation
            seasonal_factor = 1 + 0.3 * np.sin((i - 1) * np.pi / 6)
            days_in_month = 30  # Simplified
            
            consumption = round(daily_average * seasonal_factor * days_in_month)
            cost = round(consumption * 0.12)  # $0.12 per kWh
            
            monthly_data.append({
                'month': month,
                'consumption': consumption,
                'cost': cost
            })
        
        return monthly_data

    def generate_yearly_trend(self, daily_average: float, files: List[str]) -> List[Dict[str, Any]]:
        """Generate yearly trend data"""
        years = [2021, 2022, 2023, 2024, 2025]
        yearly_data = []
        
        for year in years:
            # Simulate efficiency improvement over years
            efficiency_factor = 0.9 + (year - 2021) * 0.05 + np.random.uniform(-0.1, 0.1)
            consumption = round(daily_average * 365 * efficiency_factor)
            efficiency = round(60 + (year - 2021) * 5 + np.random.uniform(-5, 10))
            
            yearly_data.append({
                'year': year,
                'consumption': consumption,
                'efficiency': min(100, max(0, efficiency))
            })
        
        return yearly_data

    def get_summary_stats(self, buildings: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate summary statistics for all buildings"""
        if not buildings:
            return {}
        
        total_usage = sum(b['energyUsage'] for b in buildings)
        total_savings = sum(b['savings'] for b in buildings)
        optimal_buildings = sum(1 for b in buildings if b['status'] == 'optimal')
        avg_efficiency = round(sum(b['efficiency'] for b in buildings) / len(buildings))
        
        return {
            'totalBuildings': len(buildings),
            'totalUsage': total_usage,
            'totalSavings': total_savings,
            'optimalBuildings': optimal_buildings,
            'buildingsNeedingAttention': len(buildings) - optimal_buildings,
            'avgEfficiency': avg_efficiency
        }

# Global instance
data_processor = BuildingDataProcessor()
