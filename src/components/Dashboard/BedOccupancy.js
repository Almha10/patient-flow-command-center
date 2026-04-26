import React from 'react';
import { Bed } from 'lucide-react';

export default function BedOccupancy({ t, data }) {
  const { wards } = data;

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontSize: '1.25rem' }}>
          <Bed size={24} className="text-info" />
          {t.bedOccupancy}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {wards.map((ward) => {
          const occupancyPct = Math.round((ward.occupiedBeds / ward.totalBeds) * 100);
          
          let statusColor = 'normal';
          if (occupancyPct > 85) statusColor = 'critical';
          else if (occupancyPct > 70) statusColor = 'warning';

          // Generate bed matrix array (up to 60 beds to prevent too many dom nodes)
          const displayBeds = Math.min(ward.totalBeds, 60);
          const activeRatio = displayBeds / ward.totalBeds;
          const displayOccupied = Math.round(ward.occupiedBeds * activeRatio);
          
          const beds = Array.from({ length: displayBeds }).map((_, i) => ({
            id: i,
            isOccupied: i < displayOccupied
          }));

          return (
            <div key={ward.id} style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {t[ward.nameKey]}
                  {occupancyPct > 85 && (
                    <span className="badge badge-critical" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>HIGH</span>
                  )}
                </h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span className={`text-${statusColor}`} style={{ fontSize: '1.1rem', fontWeight: 700 }}>{occupancyPct}%</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({ward.occupiedBeds}/{ward.totalBeds})</span>
                </div>
              </div>
              
              {/* Heatmap Grid matrix */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(12px, 1fr))', 
                gap: '4px' 
              }}>
                {beds.map((bed) => (
                  <div 
                    key={bed.id} 
                    className="heatmap-cell"
                    style={{ 
                      aspectRatio: '1',
                      background: bed.isOccupied ? `var(--color-${statusColor})` : 'rgba(255, 255, 255, 0.05)',
                      opacity: bed.isOccupied ? 1 : 0.6
                    }}
                    title={bed.isOccupied ? 'Occupied' : 'Available'}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
