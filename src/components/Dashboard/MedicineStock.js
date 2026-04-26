import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export default function MedicineStock({ t, data }) {
  const { pharmacy } = data;

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontSize: '1.25rem' }}>
          <Package size={24} className="text-warning" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' }} />
          {t.medicineStock}
        </h2>
      </div>

      <div style={{ overflowX: 'auto', paddingRight: '0.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{t.medicineName}</th>
              <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{t.department}</th>
              <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600, width: '40%' }}>{t.currentStock}</th>
              <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {pharmacy.map((med) => {
              // Calculate percentage for progress bar based on max expected stock (assuming 3x min threshold as max for visual scaling)
              const maxStock = med.minThreshold * 3;
              const fillPct = Math.min(100, Math.max(0, (med.currentStock / maxStock) * 100));
              
              const isCritical = med.status === 'critical';
              const isLow = med.status === 'low';
              
              return (
                <tr key={med.id} style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.03)', 
                  transition: 'background 0.2s', 
                  ':hover': { background: 'var(--bg-tertiary)' } 
                }}>
                  <td style={{ padding: '1.25rem 0.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isCritical && <AlertTriangle size={14} className="text-critical animate-pulse-critical" />}
                    {med.name}
                  </td>
                  <td style={{ padding: '1.25rem 0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{med.department}</td>
                  <td style={{ padding: '1.25rem 0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ 
                          color: isCritical ? 'var(--color-critical)' : isLow ? 'var(--color-warning)' : 'var(--text-primary)',
                          fontWeight: isCritical ? 700 : 500,
                          fontSize: '1.1rem',
                          textShadow: isCritical ? '0 0 10px var(--color-critical-glow)' : 'none'
                        }} className="value-transition">
                          {med.currentStock}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                          MIN: {med.minThreshold}
                        </span>
                      </div>
                      <div className="progress-bg" style={{ height: '4px', background: 'rgba(255,255,255,0.05)' }}>
                        <div 
                          className={clsx("progress-fill", `bg-${isCritical ? 'critical' : isLow ? 'warning' : 'normal'}`)} 
                          style={{ width: `${fillPct}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 0.5rem', textAlign: 'right' }}>
                    <span className={clsx("badge", `badge-${isCritical ? 'critical' : isLow ? 'warning' : 'normal'}`)}>
                      {t[med.status]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
