import React, { useState } from 'react';
import { ClipboardList, User, Building, Thermometer, Brain, Send, Lightbulb, AlertTriangle } from 'lucide-react';

const SurveyForm = () => {
  const [activeForm, setActiveForm] = useState('survey'); // 'survey' or 'temperature'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Survey form data
  const [surveyData, setSurveyData] = useState({
    personalInfo: {
      name: '',
      email: '',
      role: 'student',
      department: ''
    },
    buildingInfo: {
      primaryBuilding: '',
      frequency: 'daily',
      timeSpent: ''
    },
    comfortPreferences: {
      preferredTemp: '',
      temperatureSensitivity: 'medium',
      humidityPreference: 'medium'
    },
    behaviorPatterns: {
      adjustsThermostat: false,
      reportsIssues: false,
      energyConscious: false
    },
    energyAwareness: {
      awarenessLevel: 'medium',
      willingToAdjust: false,
      suggestions: ''
    }
  });

  // Temperature change form data
  const [tempChangeData, setTempChangeData] = useState({
    building: '',
    currentTemp: '',
    proposedTemp: '',
    reason: '',
    timeFrame: 'immediate',
    affectedAreas: '',
    energyConsiderations: false,
    alternativeSolutions: '',
    supportingInfo: '',
    contactInfo: {
      name: '',
      email: '',
      department: ''
    }
  });

  const handleSurveyInputChange = (section, field, value) => {
    setSurveyData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleTempInputChange = (field, value) => {
    setTempChangeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (formType) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700 mb-6">
            Your {activeForm === 'survey' ? 'survey responses' : 'temperature change request'} has been submitted successfully. We'll review it and take appropriate action.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              if (activeForm === 'survey') {
                setSurveyData({
                  personalInfo: { name: '', email: '', role: 'student', department: '' },
                  buildingInfo: { primaryBuilding: '', frequency: 'daily', timeSpent: '' },
                  comfortPreferences: { preferredTemp: '', temperatureSensitivity: 'medium', humidityPreference: 'medium' },
                  behaviorPatterns: { adjustsThermostat: false, reportsIssues: false, energyConscious: false },
                  energyAwareness: { awarenessLevel: 'medium', willingToAdjust: false, suggestions: '' }
                });
              } else {
                setTempChangeData({
                  building: '', currentTemp: '', proposedTemp: '', reason: '', timeFrame: 'immediate',
                  affectedAreas: '', energyConsiderations: false, alternativeSolutions: '', supportingInfo: '',
                  contactInfo: { name: '', email: '', department: '' }
                });
              }
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Forms & Feedback</h1>
        <p className="text-purple-100">Help us optimize campus energy efficiency through your feedback and suggestions</p>
      </div>

      {/* Form Selector */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveForm('survey')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              activeForm === 'survey'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ClipboardList className="h-5 w-5 inline mr-2" />
            Comfort Survey
          </button>
          <button
            onClick={() => setActiveForm('temperature')}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
              activeForm === 'temperature'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Thermometer className="h-5 w-5 inline mr-2" />
            Temperature Change Request
          </button>
        </div>
      </div>

      {activeForm === 'survey' ? (
        // Comfort Survey Form
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('survey'); }} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={surveyData.personalInfo.name}
                  onChange={(e) => handleSurveyInputChange('personalInfo', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={surveyData.personalInfo.email}
                  onChange={(e) => handleSurveyInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your.email@wmich.edu"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={surveyData.personalInfo.role}
                  onChange={(e) => handleSurveyInputChange('personalInfo', 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="visitor">Visitor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={surveyData.personalInfo.department}
                  onChange={(e) => handleSurveyInputChange('personalInfo', 'department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>
          </div>

          {/* Building Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Building Usage</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Building</label>
                <select
                  value={surveyData.buildingInfo.primaryBuilding}
                  onChange={(e) => handleSurveyInputChange('buildingInfo', 'primaryBuilding', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a building</option>
                  <option value="western-hall">Western Hall</option>
                  <option value="dining-hall">Dining Hall</option>
                  <option value="library">Library</option>
                  <option value="parkview">Parkview Campus</option>
                  <option value="east-campus">East Campus</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Frequency</label>
                <select
                  value={surveyData.buildingInfo.frequency}
                  onChange={(e) => handleSurveyInputChange('buildingInfo', 'frequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Hours Per Day</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={surveyData.buildingInfo.timeSpent}
                  onChange={(e) => handleSurveyInputChange('buildingInfo', 'timeSpent', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Hours per day"
                />
              </div>
            </div>
          </div>

          {/* Comfort Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Comfort Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Temperature (°F)</label>
                <input
                  type="range"
                  min="65"
                  max="80"
                  value={surveyData.comfortPreferences.preferredTemp || 70}
                  onChange={(e) => handleSurveyInputChange('comfortPreferences', 'preferredTemp', e.target.value)}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">
                  {surveyData.comfortPreferences.preferredTemp || 70}°F
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature Sensitivity</label>
                <select
                  value={surveyData.comfortPreferences.temperatureSensitivity}
                  onChange={(e) => handleSurveyInputChange('comfortPreferences', 'temperatureSensitivity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low - Hardly notice changes</option>
                  <option value="medium">Medium - Notice significant changes</option>
                  <option value="high">High - Very sensitive to changes</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Humidity Preference</label>
                <select
                  value={surveyData.comfortPreferences.humidityPreference}
                  onChange={(e) => handleSurveyInputChange('comfortPreferences', 'humidityPreference', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low - Prefer dry air</option>
                  <option value="medium">Medium - Balanced humidity</option>
                  <option value="high">High - Prefer humid air</option>
                </select>
              </div>
            </div>
          </div>

          {/* Behavior Patterns */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Behavior Patterns</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={surveyData.behaviorPatterns.adjustsThermostat}
                  onChange={(e) => handleSurveyInputChange('behaviorPatterns', 'adjustsThermostat', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">I adjust thermostat settings when uncomfortable</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={surveyData.behaviorPatterns.reportsIssues}
                  onChange={(e) => handleSurveyInputChange('behaviorPatterns', 'reportsIssues', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">I report HVAC issues to facilities</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={surveyData.behaviorPatterns.energyConscious}
                  onChange={(e) => handleSurveyInputChange('behaviorPatterns', 'energyConscious', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">I actively try to conserve energy</span>
              </label>
            </div>
          </div>

          {/* Energy Awareness */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Energy Awareness</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Energy Awareness Level</label>
                <select
                  value={surveyData.energyAwareness.awarenessLevel}
                  onChange={(e) => handleSurveyInputChange('energyAwareness', 'awarenessLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low - Not very aware of energy usage</option>
                  <option value="medium">Medium - Somewhat aware</option>
                  <option value="high">High - Very conscious of energy usage</option>
                </select>
              </div>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={surveyData.energyAwareness.willingToAdjust}
                  onChange={(e) => handleSurveyInputChange('energyAwareness', 'willingToAdjust', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">I'm willing to adjust comfort for energy savings</span>
              </label>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggestions for Improvement</label>
                <textarea
                  value={surveyData.energyAwareness.suggestions}
                  onChange={(e) => handleSurveyInputChange('energyAwareness', 'suggestions', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any suggestions for improving HVAC comfort and efficiency..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Survey
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        // Temperature Change Request Form
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('temperature'); }} className="space-y-6">
          {/* Request Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Temperature Change Request</h2>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-1">Request Guidelines</h3>
                  <p className="text-orange-700 text-sm">
                    Temperature change requests are reviewed based on energy efficiency impact, 
                    occupant comfort, and building operational requirements. Please provide 
                    detailed justification for your request.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Building *</label>
                <select
                  value={tempChangeData.building}
                  onChange={(e) => handleTempInputChange('building', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a building</option>
                  <option value="floyd-hall">Floyd Hall</option>
                  <option value="sangren-hall">Sangren Hall</option>
                  <option value="student-center">Student Center</option>
                  <option value="valley-2">Valley II</option>
                  <option value="valley-dining">Valley Dining Center</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Temperature (°F) *</label>
                <input
                  type="number"
                  min="60"
                  max="85"
                  value={tempChangeData.currentTemp}
                  onChange={(e) => handleTempInputChange('currentTemp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 72"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Temperature (°F) *</label>
                <input
                  type="number"
                  min="60"
                  max="85"
                  value={tempChangeData.proposedTemp}
                  onChange={(e) => handleTempInputChange('proposedTemp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 68"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Frame</label>
                <select
                  value={tempChangeData.timeFrame}
                  onChange={(e) => handleTempInputChange('timeFrame', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="immediate">Immediate</option>
                  <option value="week">Within 1 week</option>
                  <option value="month">Within 1 month</option>
                  <option value="semester">Next semester</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Justification */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Request Justification</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Change *</label>
                <textarea
                  value={tempChangeData.reason}
                  onChange={(e) => handleTempInputChange('reason', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Please explain why this temperature change is needed..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affected Areas</label>
                <input
                  type="text"
                  value={tempChangeData.affectedAreas}
                  onChange={(e) => handleTempInputChange('affectedAreas', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 2nd floor classrooms, computer lab, study areas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Solutions Considered</label>
                <textarea
                  value={tempChangeData.alternativeSolutions}
                  onChange={(e) => handleTempInputChange('alternativeSolutions', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe any other solutions you've considered..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Supporting Information</label>
                <textarea
                  value={tempChangeData.supportingInfo}
                  onChange={(e) => handleTempInputChange('supportingInfo', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Any additional information that supports your request..."
                />
              </div>
            </div>
          </div>

          {/* Energy Considerations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Energy & Environmental Impact</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={tempChangeData.energyConsiderations}
                  onChange={(e) => handleTempInputChange('energyConsiderations', e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-gray-700">I have considered the energy impact of this temperature change</span>
              </label>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Energy Impact Information</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Each degree change can affect energy consumption by 3-5%</li>
                  <li>• Cooler temperatures in summer increase AC energy usage</li>
                  <li>• Warmer temperatures in winter increase heating energy usage</li>
                  <li>• We prioritize energy-efficient solutions that maintain comfort</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={tempChangeData.contactInfo.name}
                  onChange={(e) => handleTempInputChange('contactInfo', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={tempChangeData.contactInfo.email}
                  onChange={(e) => handleTempInputChange('contactInfo', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your.email@wmich.edu"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={tempChangeData.contactInfo.department}
                  onChange={(e) => handleTempInputChange('contactInfo', 'department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Temperature Request
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SurveyForm;
