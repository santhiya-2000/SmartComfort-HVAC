import React, { useState } from 'react';
import { 
  ClipboardList, 
  User, 
  Building, 
  Thermometer,
  Clock,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    buildingInfo: {},
    comfortPreferences: {},
    behaviorPatterns: {},
    energyAwareness: {}
  });
  const [consent, setConsent] = useState({
    dataProcessing: false,
    researchParticipation: false,
    privacyPolicy: false,
    consentType: 'full' // 'full', 'partial', 'minimal'
  });

  const totalSteps = 5;

  const surveySteps = [
    {
      id: 1,
      title: 'Personal Information',
      icon: User,
      description: 'Tell us about yourself'
    },
    {
      id: 2,
      title: 'Building Information',
      icon: Building,
      description: 'Which WMU facility do you use most?'
    },
    {
      id: 3,
      title: 'Comfort Preferences',
      icon: Thermometer,
      description: 'Your ideal temperature settings'
    },
    {
      id: 4,
      title: 'Behavior Patterns',
      icon: Clock,
      description: 'How do you interact with HVAC controls?'
    },
    {
      id: 5,
      title: 'Energy Awareness',
      icon: CheckCircle,
      description: 'Your thoughts on energy conservation'
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData.personalInfo} onChange={(data) => setFormData(prev => ({...prev, personalInfo: data}))} />;
      case 2:
        return <BuildingInfoStep data={formData.buildingInfo} onChange={(data) => setFormData(prev => ({...prev, buildingInfo: data}))} />;
      case 3:
        return <ComfortPreferencesStep data={formData.comfortPreferences} onChange={(data) => setFormData(prev => ({...prev, comfortPreferences: data}))} />;
      case 4:
        return <BehaviorPatternsStep data={formData.behaviorPatterns} onChange={(data) => setFormData(prev => ({...prev, behaviorPatterns: data}))} />;
      case 5:
        return <EnergyAwarenessStep data={formData.energyAwareness} onChange={(data) => setFormData(prev => ({...prev, energyAwareness: data}))} />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log('Survey submitted:', formData);
    // Only submit if consent is given
    if (consent.dataProcessing && consent.researchParticipation && consent.privacyPolicy) {
      alert('Thank you for completing the SmartComfort survey! Your responses will help optimize HVAC efficiency at WMU.');
    } else {
      alert('Please provide consent for data processing and research participation to submit the survey.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ClipboardList className="h-8 w-8 text-energy-green" />
          <div>
            <h1 className="text-3xl font-bold text-wmu-green">HVAC Behavior Survey</h1>
            <p className="text-gray-600">Help us optimize WMU's energy efficiency through your feedback</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-energy-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-5 gap-2">
          {surveySteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`text-center p-3 rounded-lg cursor-pointer transition-colors ${
                  step.id === currentStep
                    ? 'bg-energy-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <Icon className="h-6 w-6 mx-auto mb-1" />
                <p className="text-xs font-medium">{step.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consent Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Consent</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your participation in this survey helps WMU optimize HVAC systems and reduce energy consumption. 
          Please select your consent preferences:
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="consentType"
              value="full"
              checked={consent.consentType === 'full'}
              onChange={(e) => setConsent(prev => ({...prev, consentType: e.target.value}))}
              className="mt-1 h-4 w-4 text-energy-green border-gray-300 focus:ring-energy-green"
            />
            <div>
              <div className="font-medium text-gray-900">Full Consent</div>
              <p className="text-sm text-gray-600">I consent to all data processing, research participation, and follow-up studies</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="consentType"
              value="partial"
              checked={consent.consentType === 'partial'}
              onChange={(e) => setConsent(prev => ({...prev, consentType: e.target.value}))}
              className="mt-1 h-4 w-4 text-energy-green border-gray-300 focus:ring-energy-green"
            />
            <div>
              <div className="font-medium text-gray-900">Partial Consent</div>
              <p className="text-sm text-gray-600">I consent to data processing only, limited research participation</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="consentType"
              value="minimal"
              checked={consent.consentType === 'minimal'}
              onChange={(e) => setConsent(prev => ({...prev, consentType: e.target.value}))}
              className="mt-1 h-4 w-4 text-energy-green border-gray-300 focus:ring-energy-green"
            />
            <div>
              <div className="font-medium text-gray-900">Minimal Consent</div>
              <p className="text-sm text-gray-600">I consent to basic survey completion only</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {surveySteps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">
            {surveySteps[currentStep - 1].description}
          </p>
        </div>

        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            currentStep === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>

        {currentStep === totalSteps ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-energy-green text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <span>Submit Survey</span>
            <CheckCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-energy-green text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <span>Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Step Components
const PersonalInfoStep = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        value={data.role || ''}
        onChange={(e) => onChange({...data, role: e.target.value})}
      >
        <option value="">Select your role</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="staff">Staff</option>
        <option value="administration">Administration</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">College/Department</label>
      <input 
        type="text" 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        placeholder="e.g., College of Engineering, Housing Services"
        value={data.department || ''}
        onChange={(e) => onChange({...data, department: e.target.value})}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Years at WMU</label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        value={data.yearsAtWMU || ''}
        onChange={(e) => onChange({...data, yearsAtWMU: e.target.value})}
      >
        <option value="">Select years</option>
        <option value="0-1">Less than 1 year</option>
        <option value="1-2">1-2 years</option>
        <option value="2-4">2-4 years</option>
        <option value="4+">More than 4 years</option>
      </select>
    </div>
  </div>
);

const BuildingInfoStep = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Building</label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        value={data.primaryBuilding || ''}
        onChange={(e) => onChange({...data, primaryBuilding: e.target.value})}
      >
        <option value="">Select your primary building</option>
        <option value="housing">Student Housing (Valley Towers, Western Heights, etc.)</option>
        <option value="dining">Dining Centers (Kanley, Bernhard, etc.)</option>
        <option value="library">Waldo Library</option>
        <option value="parkview">Parkview Campus (Engineering, Business)</option>
        <option value="east">East Campus (Art, Music)</option>
        <option value="main">Main Campus Academic Buildings</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Hours Spent Weekly</label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        value={data.weeklyHours || ''}
        onChange={(e) => onChange({...data, weeklyHours: e.target.value})}
      >
        <option value="">Select hours</option>
        <option value="0-10">0-10 hours</option>
        <option value="10-20">10-20 hours</option>
        <option value="20-30">20-30 hours</option>
        <option value="30-40">30-40 hours</option>
        <option value="40+">40+ hours</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Typical Room Type</label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        value={data.roomType || ''}
        onChange={(e) => onChange({...data, roomType: e.target.value})}
      >
        <option value="">Select room type</option>
        <option value="dorm">Dormitory Room</option>
        <option value="classroom">Classroom</option>
        <option value="office">Office</option>
        <option value="lounge">Common Area/Lounge</option>
        <option value="cafeteria">Dining Area</option>
        <option value="library">Library Study Area</option>
        <option value="lab">Laboratory</option>
      </select>
    </div>
  </div>
);

const ComfortPreferencesStep = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Summer Temperature (°F)</label>
      <input 
        type="range" 
        min="68" 
        max="78" 
        className="w-full"
        value={data.summerTemp || 72}
        onChange={(e) => onChange({...data, summerTemp: e.target.value})}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>68°F (Cool)</span>
        <span className="font-semibold text-energy-green">{data.summerTemp || 72}°F</span>
        <span>78°F (Warm)</span>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Winter Temperature (°F)</label>
      <input 
        type="range" 
        min="66" 
        max="76" 
        className="w-full"
        value={data.winterTemp || 70}
        onChange={(e) => onChange({...data, winterTemp: e.target.value})}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>66°F (Cool)</span>
        <span className="font-semibold text-energy-orange">{data.winterTemp || 70}°F</span>
        <span>76°F (Warm)</span>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Tolerance</label>
      <div className="space-y-2">
        {['Very Sensitive', 'Sensitive', 'Moderate', 'Flexible', 'Very Flexible'].map((level) => (
          <label key={level} className="flex items-center space-x-3">
            <input 
              type="radio" 
              name="tolerance"
              value={level.toLowerCase()}
              className="text-energy-green focus:ring-energy-green"
              checked={data.tolerance === level.toLowerCase()}
              onChange={(e) => onChange({...data, tolerance: e.target.value})}
            />
            <span className="text-sm">{level}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

const BehaviorPatternsStep = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">How often do you adjust thermostat?</label>
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        value={data.adjustmentFrequency || ''}
        onChange={(e) => onChange({...data, adjustmentFrequency: e.target.value})}
      >
        <option value="">Select frequency</option>
        <option value="never">Never</option>
        <option value="rarely">Rarely (monthly)</option>
        <option value="sometimes">Sometimes (weekly)</option>
        <option value="often">Often (daily)</option>
        <option value="very-often">Very often (multiple times daily)</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Do you open windows when HVAC is running?</label>
      <div className="space-y-2">
        {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].map((frequency) => (
          <label key={frequency} className="flex items-center space-x-3">
            <input 
              type="radio" 
              name="windows"
              value={frequency.toLowerCase()}
              className="text-energy-green focus:ring-energy-green"
              checked={data.windowBehavior === frequency.toLowerCase()}
              onChange={(e) => onChange({...data, windowBehavior: e.target.value})}
            />
            <span className="text-sm">{frequency}</span>
          </label>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">What influences your temperature adjustments?</label>
      <div className="space-y-2">
        {['Personal comfort', 'Energy cost concerns', 'Environmental concerns', 'Others\' preferences', 'Weather changes'].map((factor) => (
          <label key={factor} className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              value={factor.toLowerCase()}
              className="text-energy-green focus:ring-energy-green rounded"
              checked={data.influences?.includes(factor.toLowerCase()) || false}
              onChange={(e) => {
                const influences = data.influences || [];
                if (e.target.checked) {
                  onChange({...data, influences: [...influences, factor.toLowerCase()]});
                } else {
                  onChange({...data, influences: influences.filter(f => f !== factor.toLowerCase())});
                }
              }}
            />
            <span className="text-sm">{factor}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

const EnergyAwarenessStep = ({ data, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">How aware are you of HVAC energy costs?</label>
      <div className="space-y-2">
        {['Not aware at all', 'Slightly aware', 'Moderately aware', 'Very aware', 'Extremely aware'].map((level) => (
          <label key={level} className="flex items-center space-x-3">
            <input 
              type="radio" 
              name="awareness"
              value={level.toLowerCase()}
              className="text-energy-green focus:ring-energy-green"
              checked={data.energyAwareness === level.toLowerCase()}
              onChange={(e) => onChange({...data, energyAwareness: e.target.value})}
            />
            <span className="text-sm">{level}</span>
          </label>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Would you adjust temperature for energy savings?</label>
      <div className="space-y-2">
        {['Definitely not', 'Probably not', 'Maybe', 'Probably yes', 'Definitely yes'].map((response) => (
          <label key={response} className="flex items-center space-x-3">
            <input 
              type="radio" 
              name="willingness"
              value={response.toLowerCase()}
              className="text-energy-green focus:ring-energy-green"
              checked={data.willingness === response.toLowerCase()}
              onChange={(e) => onChange({...data, willingness: e.target.value})}
            />
            <span className="text-sm">{response}</span>
          </label>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Additional comments or suggestions</label>
      <textarea 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-energy-green focus:border-transparent"
        rows="4"
        placeholder="Share your thoughts on HVAC comfort and energy conservation at WMU..."
        value={data.comments || ''}
        onChange={(e) => onChange({...data, comments: e.target.value})}
      ></textarea>
    </div>
  </div>
);

export default Survey;
