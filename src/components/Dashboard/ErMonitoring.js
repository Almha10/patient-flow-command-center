import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AlertTriangle, Activity, Clock } from 'lucide-react';
import clsx from 'clsx';

export default function ErMonitoring({ t, data, lang }) {
  const { erPatients, erArrivalTrends, kpis } = data;
  
  const isAvgWaitHigh = kpis.avgTriageTime > 15;

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontSize: '1.25rem' }}>
          <Activity size={24} className="text-normal" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }} />
          {t.erMonitoring}
        </h2>
        {isAvgWaitHigh && (
          <div className="badge badge-critical animate-pulse-critical" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={14} /> High Wait Times
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>{t.patientQueue}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{erPatients.length} Active</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {erPatients.sort((a,b) => b.waitTime - a.waitTime).map((pt, idx) => {
              const isCritical = pt.severity === 'critical';
              const isUrgent = pt.severity === 'urgent';
              const statusColor = isCritical ? 'critical' : isUrgent ? 'warning' : 'normal';
              
              return (
                <div key={idx} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '0.85rem 1rem', 
                  background: 'var(--bg-tertiary)', 
                  borderRadius: '10px', 
                  borderLeft: `4px solid var(--color-${statusColor})`,
                  boxShadow: isCritical ? 'inset 0 0 10px rgba(239, 68, 68, 0.1)' : 'none',
                  transition: 'background 0.2s',
                  ':hover': { background: 'rgba(255,255,255,0.05)' }
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontWeight: 600, fontFamily: 'monospace', letterSpacing: '0.05em' }}>{pt.id}</span>
                    <span className={clsx(`text-${statusColor}`)} style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                      {t[pt.severity]}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.75rem', borderRadius: '8px' }}>
                    <Clock size={14} className={pt.waitTime > 30 ? 'text-critical' : 'text-muted'} />
                    <span style={{ color: pt.waitTime > 30 ? 'var(--color-critical)' : 'var(--text-primary)', fontWeight: pt.waitTime > 30 ? 700 : 500, fontSize: '0.875rem' }}>
                      {pt.waitTime}m
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>{t.waitingTimeTrend}</h3>
          <div style={{ height: '250px', width: '100%', background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={erArrivalTrends} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-normal)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-normal)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="var(--color-normal)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  activeDot={{ r: 6, fill: 'var(--color-normal)', stroke: 'var(--bg-primary)', strokeWidth: 2 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
