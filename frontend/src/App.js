import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Survey from './components/Survey';
import Analytics from './components/Analytics';
import BuildingRecommendations from './components/BuildingRecommendations';
import EnergySavings from './components/EnergySavings';
import ActionableIntelligence from './components/ActionableIntelligence';
import PowerBIIntegration from './components/PowerBIIntegration';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/recommendations" element={<BuildingRecommendations />} />
            <Route path="/savings" element={<EnergySavings />} />
            <Route path="/intelligence" element={<ActionableIntelligence />} />
            <Route path="/powerbi" element={<PowerBIIntegration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
