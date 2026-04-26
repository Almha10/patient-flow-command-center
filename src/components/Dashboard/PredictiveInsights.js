import React from 'react';
import { BrainCircuit, TrendingUp, AlertTriangle, Clock, Zap } from 'lucide-react';

export default function PredictiveInsights({ t, data }) {
  if (!data) return null;

  // Rule-based predictions based on current mock data
  const { kpis, wards, pharmacy } = data;

  // 1. ER Volume Prediction
  const erTrend = kpis.liveERCount > 60 ? 15 : kpis.liveERCount > 40 ? 8 : 3;
  const predictedEr = kpis.liveERCount + erTrend;
  const erRisk = predictedEr > 80 ? 'critical' : predictedEr > 50 ? 'warning' : 'normal';

  // 2. ICU Occupancy Prediction
  const icuWard = wards.find(w => w.id === 'icu') || { totalBeds: 20, occupiedBeds: 18 };
  const currentIcuPct = Math.round((icuWard.occupiedBeds / icuWard.totalBeds) * 100);
  const predictedIcuPct = Math.min(100, Math.round(((icuWard.occupiedBeds + 2) / icuWard.totalBeds) * 100));
  const icuRisk = predictedIcuPct > 90 ? 'critical' : predictedIcuPct > 80 ? 'warning' : 'normal';

  // 3. Medicine Depletion
  const lowestMed = pharmacy.reduce((prev, curr) => (prev.currentStock / prev.minThreshold < curr.currentStock / curr.minThreshold ? prev : curr), pharmacy[0]);
  const estimatedDepletionHours = Math.max(1, Math.round(lowestMed.currentStock / 4)); // Assume usage rate
  const medRisk = estimatedDepletionHours < 4 ? 'critical' : estimatedDepletionHours < 12 ? 'warning' : 'normal';

  // 4. Staff Overload
  const erWard = wards.find(w => w.id === 'er') || { occupiedBeds: 45 };
  const predictedRatio = (erWard.occupiedBeds + erTrend) / 23; // Assuming 8 docs + 15 nurses
  const staffRisk = predictedRatio > 2.5 ? 'critical' : predictedRatio > 1.5 ? 'warning' : 'normal';
  const staffTime = predictedRatio > 2.5 ? '1 hr' : '3 hrs';

  const predictions = [
    {
      id: 'er-vol',
      title: t.predictiveErVolume || 'ER Volume (60m)',
      current: kpis.liveERCount,
      predicted: predictedEr,
      trend: 'up',
      risk: erRisk,
      icon: TrendingUp,
      unit: t.predictivePatients || 'patients'
    },
    {
      id: 'icu-occ',
      title: t.predictiveIcuOccupancy || 'ICU Occupancy',
      current: `${currentIcuPct}%`,
      predicted: `${predictedIcuPct}%`,
      trend: 'up',
      risk: icuRisk,
      icon: AlertTriangle,
      unit: t.predictiveCapacity || 'capacity'
    },
    {
      id: 'med-dep',
      title: t.predictiveMedDepletion || 'Medicine Depletion',
      current: lowestMed.name,
      predicted: `${estimatedDepletionHours} hrs`,
      trend: 'down',
      risk: medRisk,
      icon: Clock,
      unit: t.predictiveRemaining || 'remaining'
    },
    {
      id: 'staff-risk',
      title: t.predictiveStaffOverload || 'Staff Overload Risk',
      current: 'ER Dept',
      predicted: staffTime,
      trend: 'up',
      risk: staffRisk,
      icon: Zap,
      unit: t.predictiveTimeToOverload || 'to overload'
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-6)', position: 'relative', overflow: 'hidden' }}>
      {/* Futuristic Background Accent */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', position: 'relative', zIndex: 1 }}>
        <BrainCircuit className="text-info" size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' }} />
        <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#e2e8f0', textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>
          {t.predictiveInsightsTitle || 'Predictive Insights (AI Simulated)'}
        </h2>
        <span className="badge badge-info" style={{ marginLeft: 'auto', animation: 'pulse-critical 2s infinite' }}>
          {t.predictiveLiveAi || 'LIVE AI'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', position: 'relative', zIndex: 1 }}>
        {predictions.map(pred => {
          const Icon = pred.icon;
          const isCritical = pred.risk === 'critical';
          const isWarning = pred.risk === 'warning';

          let riskColor = 'var(--color-normal)';
          let riskBg = 'rgba(16, 185, 129, 0.1)';
          let riskBorder = 'rgba(16, 185, 129, 0.2)';

          if (isCritical) {
            riskColor = 'var(--color-critical)';
            riskBg = 'rgba(239, 68, 68, 0.1)';
            riskBorder = 'rgba(239, 68, 68, 0.3)';
          } else if (isWarning) {
            riskColor = 'var(--color-warning)';
            riskBg = 'rgba(245, 158, 11, 0.1)';
            riskBorder = 'rgba(245, 158, 11, 0.3)';
          }

          return (
            <div key={pred.id} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${riskBorder}`,
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isCritical ? '0 0 15px rgba(239, 68, 68, 0.1)' : 'none',
              cursor: 'default'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = isCritical ? '0 0 20px rgba(239, 68, 68, 0.2)' : '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = isCritical ? '0 0 15px rgba(239, 68, 68, 0.1)' : 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{pred.title}</span>
                <Icon size={18} color={riskColor} style={{ filter: `drop-shadow(0 0 5px ${riskColor})` }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pred.predicted}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pred.unit}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--space-2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Current: {pred.current}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: riskColor,
                  background: riskBg,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  {pred.trend === 'up' ? '↑' : '↓'} {t[pred.risk] || pred.risk.charAt(0).toUpperCase() + pred.risk.slice(1)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
