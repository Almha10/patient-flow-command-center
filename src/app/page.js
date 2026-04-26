'use client';

import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import KpiCard from '../components/KPI/KpiCard';
import ErMonitoring from '../components/Dashboard/ErMonitoring';
import BedOccupancy from '../components/Dashboard/BedOccupancy';
import MedicineStock from '../components/Dashboard/MedicineStock';
import StaffDistribution from '../components/Dashboard/StaffDistribution';
import AiRecommendations from '../components/Dashboard/AiRecommendations';
import PredictiveInsights from '../components/Dashboard/PredictiveInsights';
import { useSimulation } from '../hooks/useSimulation';
import { Users, Activity, Bed, Package } from 'lucide-react';

export default function Home() {
  const { data, lastUpdated } = useSimulation();

  return (
    <DashboardLayout lastUpdated={lastUpdated}>
      <DashboardContent data={data} />
    </DashboardLayout>
  );
}

// Separate component so DashboardLayout can inject 't' and 'lang' props
function DashboardContent({ data, t, lang }) {
  if (!t) return null; // Wait for context injection
  
  const { kpis } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      
      {/* Top KPI row */}
      <div className="grid-kpi">
        <KpiCard 
          title={t.liveERCount} 
          value={kpis.liveERCount} 
          icon={Users} 
          colorClass={kpis.liveERCount > 80 ? 'critical' : kpis.liveERCount > 50 ? 'warning' : 'normal'}
          trend={+8}
        />
        <KpiCard 
          title={t.avgTriageTime} 
          value={kpis.avgTriageTime} 
          icon={Activity} 
          colorClass={kpis.avgTriageTime > 20 ? 'critical' : kpis.avgTriageTime > 15 ? 'warning' : 'normal'}
          trend={-2}
        />
        <KpiCard 
          title={t.bedOccupancyPct} 
          value={`${kpis.bedOccupancyPct}%`} 
          icon={Bed} 
          colorClass={kpis.bedOccupancyPct > 90 ? 'critical' : kpis.bedOccupancyPct > 80 ? 'warning' : 'normal'}
          trend={+4}
          type="percentage"
        />
        <KpiCard 
          title={t.criticalMedicines} 
          value={kpis.criticalMedicinesCount} 
          icon={Package} 
          colorClass={kpis.criticalMedicinesCount > 0 ? 'critical' : 'normal'}
          trend={kpis.criticalMedicinesCount > 2 ? +1 : -1}
        />
      </div>

      {/* Predictive Insights */}
      <PredictiveInsights t={t} data={data} />

      {/* Main Dashboard Area */}
      <div className="grid-main">
        {/* Top Row (ER & Beds) */}
        <div className="col-span-12 grid-main">
          <div className="col-span-6">
            <ErMonitoring t={t} data={data} lang={lang} />
          </div>
          <div className="col-span-6">
            <BedOccupancy t={t} data={data} />
          </div>
        </div>

        {/* Bottom Area */}
        <div className="col-span-12 grid-main">
          <div className="col-span-4">
            <MedicineStock t={t} data={data} />
          </div>
          <div className="col-span-4">
            <StaffDistribution t={t} data={data} />
          </div>
          <div className="col-span-4">
            <AiRecommendations t={t} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
