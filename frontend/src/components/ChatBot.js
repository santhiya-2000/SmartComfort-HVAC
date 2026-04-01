import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Zap, Leaf, TrendingDown, Lightbulb, Thermometer } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your SmartComfort assistant. I can help you with energy-saving tips, HVAC recommendations, and campus building information. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    greetings: [
      "Hello! I'm here to help you save energy and improve comfort. What would you like to know?",
      "Hi! I can provide personalized energy-saving tips and HVAC recommendations. How can I help?",
      "Welcome! I'm your SmartComfort assistant. Ask me anything about energy efficiency!"
    ],
    'energy saving': [
      "Here are some quick energy-saving tips:\n• Set your thermostat to 68°F in winter and 78°F in summer\n• Use natural light when possible\n• Report HVAC issues promptly\n• Close doors and windows to maintain temperature",
      "Great question! Small changes can make a big difference:\n• Dress appropriately for the season\n• Use fans to improve air circulation\n• Take stairs instead of elevators when possible\n• Unplug devices when not in use"
    ],
    'temperature': [
      "The optimal temperature range for energy efficiency is 68-70°F in winter and 76-78°F in summer. Each degree can save 3-5% on energy costs!",
      "For maximum comfort and efficiency, I recommend:\n• Winter: 68°F when occupied, 62°F when empty\n• Summer: 78°F when occupied, 82°F when empty\n• Use ceiling fans to feel cooler"
    ],
    'building': [
      "I can help you with information about campus buildings. Which building are you interested in? I have data on Western Hall, Dining Hall, Library, Parkview Campus, and East Campus.",
      "Each building has different energy needs. For specific building recommendations, check the Action tab for real-time data and personalized suggestions."
    ],
    'comfort': [
      "Comfort is personal! Here's how to optimize it:\n• Layer clothing for easy temperature adjustment\n• Use humidifiers/dehumidifiers as needed\n• Report discomfort to facilities\n• Personal fans can help without changing building temperature"
    ],
    'cost': [
      "Energy costs add up quickly! On average:\n• HVAC accounts for 40-60% of building energy use\n• Each degree adjustment saves 3-5% on costs\n• Smart scheduling can reduce costs by 10-20%\nWould you like specific cost calculations for your building?"
    ],
    'default': [
      "That's interesting! While I don't have specific information on that, I can help with energy-saving tips, temperature recommendations, and building efficiency. What specific aspect would you like to explore?",
      "I'm still learning! Try asking me about energy saving, temperature settings, building efficiency, or comfort tips. I'm here to help you make smarter energy choices."
    ]
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } else if (input.includes('energy') || input.includes('save') || input.includes('efficiency')) {
      return botResponses['energy saving'][Math.floor(Math.random() * botResponses['energy saving'].length)];
    } else if (input.includes('temperature') || input.includes('temp') || input.includes('thermostat')) {
      return botResponses.temperature[Math.floor(Math.random() * botResponses.temperature.length)];
    } else if (input.includes('building')) {
      return botResponses.building[Math.floor(Math.random() * botResponses.building.length)];
    } else if (input.includes('comfort') || input.includes('comfortable')) {
      return botResponses.comfort[Math.floor(Math.random() * botResponses.comfort.length)];
    } else if (input.includes('cost') || input.includes('money') || input.includes('price')) {
      return botResponses.cost[Math.floor(Math.random() * botResponses.cost.length)];
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Zap, text: 'Energy Saving Tips', query: 'energy saving tips' },
    { icon: Thermometer, text: 'Temperature Advice', query: 'optimal temperature' },
    { icon: Leaf, text: 'Eco-Friendly', query: 'environmental impact' },
    { icon: TrendingDown, text: 'Cost Reduction', query: 'reduce energy costs' },
    { icon: Lightbulb, text: 'Smart Tips', query: 'smart energy habits' }
  ];

  const QuickAction = ({ icon: Icon, text, query }) => (
    <button
      onClick={() => {
        setInputText(query);
        handleSendMessage();
      }}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
    >
      <Icon className="h-4 w-4 text-gray-600" />
      <span className="text-gray-700">{text}</span>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-t-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">SmartComfort Assistant</h1>
            <p className="text-green-100">Your personal energy efficiency guide</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white border-x border-gray-200 h-[calc(100%-8rem)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-green-600" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-line text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-green-600" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about energy saving, temperature settings, or building efficiency..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || inputText.trim() === ''}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
