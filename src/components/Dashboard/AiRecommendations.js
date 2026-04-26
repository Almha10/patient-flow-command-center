import React from 'react';
import { Lightbulb, Zap, AlertCircle, ArrowRight } from 'lucide-react';

export default function AiRecommendations({ t, data }) {
  const { pharmacy, staff, erPatients } = data;

  const recommendations = [];

  // Rule 1: ER overloaded
  const erStaff = staff.find(s => s.id === 'er');
  if (erStaff && erStaff.status === 'overloaded') {
    recommendations.push({
      id: 1,
      type: 'warning',
      priority: 'High Priority',
      text: t.suggestionNurseToEr,
      icon: Zap,
      action: 'Deploy Staff'
    });
  }

  // Rule 2: ICU high occupancy
  const icuWard = data.wards.find(w => w.id === 'icu');
  if (icuWard && (icuWard.occupiedBeds / icuWard.totalBeds) > 0.85) {
    recommendations.push({
      id: 2,
      type: 'critical',
      priority: 'Urgent',
      text: t.suggestionPrepareIcu,
      icon: AlertCircle,
      action: 'Allocate Beds'
    });
  }

  // Rule 3: Medicine critical
  const criticalMeds = pharmacy.filter(m => m.status === 'critical');
  if (criticalMeds.length > 0) {
    recommendations.push({
      id: 3,
      type: 'critical',
      priority: 'Urgent',
      text: t.suggestionRestockMeds,
      icon: AlertCircle,
      action: 'Order Stock'
    });
  }

  // Rule 4: High stable cases in ER
  const stableEr = erPatients.filter(p => p.severity === 'stable').length;
  if (stableEr > 3) {
    recommendations.push({
      id: 4,
      type: 'info',
      priority: 'Optimization',
      text: t.suggestionFastTrack,
      icon: Lightbulb,
      action: 'Open Lane'
    });
  }

  if (recommendations.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        <Lightbulb size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
        <p>No new recommendations at this time.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Lightbulb size={24} className="text-warning" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' }} />
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{t.aiRecommendations}</h2>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, marginTop: '-0.5rem' }}>
        {t.smartSuggestions}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div key={rec.id} className="animate-fade-in" style={{
              animationDelay: `${index * 150}ms`,
              padding: '1.25rem',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              borderLeft: `4px solid var(--color-${rec.type})`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease',
              cursor: 'default'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge badge-${rec.type}`} style={{ fontSize: '0.65rem' }}>
                  <Icon size={12} style={{ marginRight: '0.25rem' }} /> {rec.priority}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                {rec.text}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button className={`btn-action ${rec.type === 'critical' ? 'btn-primary' : ''}`}>
                  {rec.action} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
