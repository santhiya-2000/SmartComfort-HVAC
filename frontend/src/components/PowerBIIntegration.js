import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  Settings, 
  BarChart3, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Key,
  RefreshCw,
  FileText
} from 'lucide-react';

const PowerBIIntegration = () => {
  const [datasets, setDatasets] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('energy_consumption');

  const datasetOptions = [
    { value: 'energy_consumption', label: 'Energy Consumption Data', access: 'all' },
    { value: 'savings_summary', label: 'Savings Summary', access: 'facilities+' },
    { value: 'behavior_insights', label: 'Behavior Insights', access: 'admin+' },
    { value: 'comfort_efficiency', label: 'Comfort-Efficiency Data', access: 'all' }
  ];

  useEffect(() => {
    fetchPowerBIConfig();
    fetchDatasets();
  }, []);

  const fetchPowerBIConfig = async () => {
    try {
      const response = await fetch('/api/powerbi/config');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error fetching Power BI config:', error);
    }
  };

  const fetchDatasets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/powerbi/datasets/${selectedDataset}`);
      const data = await response.json();
      setDatasets(data.data || []);
    } catch (error) {
      console.error('Error fetching dataset:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportDataset = async (datasetType) => {
    try {
      const response = await fetch(`/api/powerbi/export/${datasetType}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `smartcomfort_${datasetType}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting dataset:', error);
    }
  };

  const getDashboardTemplate = async () => {
    try {
      const response = await fetch('/api/powerbi/dashboard-template');
      const data = await response.json();
      
      // Download template
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smartcomfort_powerbi_template.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const refreshData = async () => {
    try {
      const response = await fetch('/api/powerbi/refresh', { method: 'POST' });
      const result = await response.json();
      alert('Data refresh initiated: ' + result.message);
      fetchDatasets(); // Refresh the displayed data
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert('Failed to refresh data');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="h-8 w-8 text-energy-blue" />
          <div>
            <h1 className="text-3xl font-bold text-wmu-green">Power BI Integration</h1>
            <p className="text-gray-600">Connect SmartComfort data to Power BI for enterprise analytics</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => exportDataset(selectedDataset)}
            className="flex items-center space-x-2 px-4 py-2 bg-energy-green text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export Dataset</span>
          </button>
          
          <button
            onClick={getDashboardTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-energy-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Dashboard Template</span>
          </button>
          
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Configuration Status */}
      {config && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            Connection Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">API Endpoint</span>
              </div>
              <p className="text-sm text-green-700">{config.api_endpoint}</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Key className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Authentication</span>
              </div>
              <p className="text-sm text-blue-700">{config.authentication}</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-900">Refresh Frequency</span>
              </div>
              <p className="text-sm text-orange-700">{config.refresh_frequency}</p>
            </div>
          </div>
        </div>
      )}

      {/* Dataset Selection and Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2 text-gray-600" />
          Available Datasets
        </h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Dataset:</label>
          <select 
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
          >
            {datasetOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.access} access)
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-energy-green"></div>
            <p className="mt-2 text-gray-600">Loading dataset...</p>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">
                {datasetOptions.find(o => o.value === selectedDataset)?.label}
              </h3>
              <span className="text-sm text-gray-500">
                {datasets.length} records
              </span>
            </div>
            
            {datasets.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(datasets[0] || {}).map(key => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {datasets.slice(0, 10).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <ExternalLink className="h-5 w-5 mr-2 text-gray-600" />
          How to Use with Power BI
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center font-semibold">1</div>
            <div>
              <h3 className="font-medium text-gray-900">Export Dataset</h3>
              <p className="text-sm text-gray-600">Click "Export Dataset" to download the JSON file for your selected dataset.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center font-semibold">2</div>
            <div>
              <h3 className="font-medium text-gray-900">Open Power BI Desktop</h3>
              <p className="text-sm text-gray-600">Go to "Get Data" → "Web" → "From Web" in Power BI Desktop.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center font-semibold">3</div>
            <div>
              <h3 className="font-medium text-gray-900">Connect to API</h3>
              <p className="text-sm text-gray-600">Use the API endpoint: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000/api/powerbi/datasets/{selectedDataset}</code></p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center font-semibold">4</div>
            <div>
              <h3 className="font-medium text-gray-900">Create Visualizations</h3>
              <p className="text-sm text-gray-600">Power BI will auto-detect the schema. Create your dashboards and reports.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center font-semibold">5</div>
            <div>
              <h3 className="font-medium text-gray-900">Publish to Service</h3>
              <p className="text-sm text-gray-600">Publish your reports to Power BI Service for sharing and automated refresh.</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints Reference */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
          API Endpoints
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Get Dataset</h4>
              <code className="text-xs text-gray-600 block">GET /api/powerbi/datasets/{'{{type}}'}</code>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Export Dataset</h4>
              <code className="text-xs text-gray-600 block">GET /api/powerbi/export/{'{{type}}'}</code>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Get Configuration</h4>
              <code className="text-xs text-gray-600 block">GET /api/powerbi/config</code>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Dashboard Template</h4>
              <code className="text-xs text-gray-600 block">GET /api/powerbi/dashboard-template</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIIntegration;
