# SmartComfort - HVAC Energy Optimization Dashboard

SmartComfort is a behavior-centered, AI-driven initiative designed to optimize HVAC energy efficiency across Western Michigan University's campus through educational intervention rather than costly hardware modification.

## Project Overview

HVAC systems represent the largest energy consumer across WMU's campus infrastructure, accounting for 40-60% of building electricity use. SmartComfort employs behavior science, machine learning analytics, and user-centered design to identify waste patterns, quantify savings, and deliver actionable guidance.

## Key Features

1. **HVAC Behavior Survey** - Scientifically designed questionnaire capturing temperature preferences and energy awareness
2. **AI-Powered Comfort-Efficiency Model** - Machine learning algorithm generating evidence-based temperature recommendations
3. **Interactive Dashboard** - Real-time energy savings visualization and carbon footprint metrics
4. **Behavior Nudges** - Context-specific interventions including posters, QR codes, and digital reminders

## Technology Stack

- **Frontend**: React.js with TailwindCSS for modern, responsive UI
- **Backend**: Python with FastAPI for scalable API development
- **Machine Learning**: scikit-learn, pandas, numpy for data analysis and modeling
- **Data Visualization**: Chart.js, D3.js for interactive charts
- **Database**: SQLite for development, PostgreSQL for production

## Project Structure

```
Bronco_Challenge/
├── frontend/          # React dashboard application
├── backend/           # Python API and ML models
├── data/             # Survey data and analysis
├── docs/             # Documentation and reports
└── deployment/       # Docker and deployment configs
```

## Team Members

- **Lingamuthu K** - Project Lead & AI/ML Specialist
- **Santhiya V** - Technical Implementation & UX Lead
- **Krithuniya SR** - Financial Strategy & Business Lead
- **Mihika Pandit** - Data Analytics & Policy Lead

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && pip install -r requirements.txt`
4. Start development servers:
   - Frontend: `npm start`
   - Backend: `uvicorn main:app --reload`

## Project Goals

- Achieve 5-10% HVAC energy reduction in targeted facilities
- Collect behavior data from housing, dining, libraries, Parkview, and East Campus
- Develop AI-powered Comfort-Efficiency Model balancing comfort with sustainability
- Create real-time savings visualization dashboard
- Design building-specific behavior nudges

## UN SDG Alignment

- SDG 7 (Affordable and Clean Energy)
- SDG 11 (Sustainable Cities)
- SDG 12 (Responsible Consumption)
- SDG 13 (Climate Action)
