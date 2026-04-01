import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Action from './components/Action';
import SurveyForm from './components/SurveyForm';
import ChatBot from './components/ChatBot';
import YearlyDashboard from './components/YearlyDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <Home />;
      case 'action':
        return <Action />;
      case 'survey':
        return <SurveyForm />;
      case 'chatbot':
        return <ChatBot />;
      case 'yearly':
        return <YearlyDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
