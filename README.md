# Patient Flow Command Center (لوحة عرض إدارة تدفق المرضى)

## 🩺 Problem Statement
Hospitals and large healthcare facilities often struggle with managing patient flow in real-time. Operations managers, ER supervisors, and bed management teams lack a unified, live view of patient bottlenecks, ward occupancies, and critical supply shortages, leading to increased waiting times and sub-optimal resource allocation.

## 💡 Solution
The **Patient Flow Command Center** is a smart, real-time operational dashboard that simulates patient movement and resource utilization across a hospital. It provides actionable insights and automated recommendations to decision-makers, helping to reduce ER wait times, optimize bed distribution, and prevent medicine shortages.

## ✨ Features
- **Overview Dashboard**: High-level KPIs including live ER patient count, average triage waiting time, bed occupancy percentage, and critical medicine stock alerts.
- **ER Monitoring**: Tracks incoming patients by severity (Critical, Urgent, Stable), monitors live queue using patient IDs, and displays a trend chart for waiting times.
- **Bed Occupancy Heatmap**: Visualizes real-time bed availability across different wards (ER, ICU, Surgery, Internal Medicine, Pediatrics, Maternity) using a clear color-coded system to highlight overcapacity.
- **Medicine Stock Table**: A mock pharmacy inventory tracking minimum thresholds with status indicators (Normal, Low, Critical).
- **Staff Distribution**: Displays doctor and nurse allocation per department and calculates workload status based on active patient count.
- **AI Recommendations**: A rule-based suggestion engine that actively recommends interventions (e.g., redistributing staff, preparing ICU beds, fast-tracking stable ER cases).
- **Bilingual Interface**: Full support for English (LTR) and Arabic (RTL) with dynamic language switching.
- **Dark Medical Theme**: A professional, modern UI leveraging a dark color palette, glassmorphism, and clear status indicators (Green, Yellow, Red).

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router) + React
- **Language**: JavaScript
- **Styling**: Vanilla CSS (CSS Modules & Global Variables) - *No TailwindCSS*
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [lucide-react](https://lucide.dev/)
- **Fonts**: Inter (English) & Tajawal (Arabic) via `next/font`

## 📊 Mock Data & Simulation Logic
> **⚠️ DISCLAIMER:** This project is a portfolio MVP simulation. It contains **no real patient data** and does not connect to any real hospital backend systems.

- **Mock Data**: Uses hardcoded JSON data (`src/data/mockData.js`) simulating a realistic hospital environment using anonymized Patient IDs.
- **Simulation**: A React hook (`useSimulation`) gradually and logically updates data points every 8 seconds to mimic the passage of time without unrealistic random jumps.
  - ER queue waits increase logically over time.
  - New patients arrive occasionally while some are discharged.
  - Medicine stocks gradually deplete and auto-restock when critical.
  - Bed occupancies fluctuate realistically.

## 🚀 Future Improvements
- **Real API Integration**: Connect to an actual Hospital Information System (HIS) or HL7 FHIR backend.
- **True AI Prediction**: Implement Machine Learning models to forecast ER surges based on historical trends, weather, and local events.
- **IoT Integration**: Track beds and equipment via RFID tags for exact location data.

## 🏃‍♂️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
