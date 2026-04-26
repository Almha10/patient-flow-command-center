import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KpiCard({ title, value, icon: Icon, colorClass, subtitle, trend, type = 'number' }) {
  const [prevValue, setPrevValue] = useState(value);
  const [animate, setAnimate] = useState(false);

  if (value !== prevValue) {
    setPrevValue(value);
    setAnimate(true);
  }

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  // Determine trend icon if passed
  let TrendIcon = Minus;
  let trendColor = 'text-muted';
  if (trend > 0) {
    TrendIcon = colorClass === 'critical' ? TrendingUp : TrendingDown; // If critical, going up is bad (red) or good (green). Depends on context, but let's just make up = up arrow.
    TrendIcon = TrendingUp;
    trendColor = colorClass === 'critical' ? 'text-critical' : 'text-warning'; 
  } else if (trend < 0) {
    TrendIcon = TrendingDown;
    trendColor = colorClass === 'normal' ? 'text-normal' : 'text-normal';
  }

  const isCritical = colorClass === 'critical';

  return (
    <div className={clsx("glass-panel", isCritical && "glow-border-critical")} style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>{title}</h3>
        {Icon && (
          <div className={clsx("badge", `badge-${colorClass}`, isCritical && "animate-pulse-critical")} style={{ padding: '0.6rem', borderRadius: '12px' }}>
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
          <div 
            className={clsx(`text-${colorClass}`, "value-transition")} 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700, 
              lineHeight: 1,
              transform: animate ? 'scale(1.05)' : 'scale(1)',
              textShadow: 'none'
            }}
          >
            {value}
          </div>
          
          {trend !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 600 }} className={trendColor}>
              <TrendIcon size={16} style={{ marginRight: '0.25rem' }} />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        
        {subtitle && (
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            {subtitle}
          </div>
        )}

        {/* Optional Progress bar for percentages */}
        {type === 'percentage' && typeof value === 'string' && value.includes('%') && (
          <div className="progress-bg" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)' }}>
            <div 
              className={clsx("progress-fill", `bg-${colorClass}`)} 
              style={{ width: value }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
