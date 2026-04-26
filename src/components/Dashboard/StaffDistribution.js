import React from 'react';
import { Users, User, UserPlus } from 'lucide-react';
import clsx from 'clsx';

export default function StaffDistribution({ t, data }) {
  const { staff } = data;

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontSize: '1.25rem' }}>
          <Users size={24} className="text-normal" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }} />
          {t.staffDistribution}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {staff.map((dept) => {
          let statusColor = 'normal';
          if (dept.status === 'overloaded') statusColor = 'critical';
          else if (dept.status === 'busy') statusColor = 'warning';

          const totalStaff = dept.doctors + dept.nurses;
          const ratio = dept.activePatients / totalStaff;
          // Normalize ratio to percentage for progress bar (assuming 3.0 ratio is 100% full capacity)
          const loadPct = Math.min(100, (ratio / 3.0) * 100);

          return (
            <div key={dept.id} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              borderLeft: `4px solid var(--color-${statusColor})`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'default'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>{t[dept.departmentKey]}</h4>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14}/> {dept.doctors} {t.doctors}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><UserPlus size={14}/> {dept.nurses} {t.nurses}</span>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span className={clsx("badge", `badge-${statusColor}`)}>
                    {t[dept.status]}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Workload Intensity</span>
                  <span className={`text-${statusColor}`} style={{ fontWeight: 600 }}>{ratio.toFixed(1)} pts/staff</span>
                </div>
                <div className="progress-bg" style={{ height: '6px' }}>
                  <div 
                    className={clsx("progress-fill", `bg-${statusColor}`)} 
                    style={{ width: `${loadPct}%`, boxShadow: `0 0 10px var(--color-${statusColor}-glow)` }} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
