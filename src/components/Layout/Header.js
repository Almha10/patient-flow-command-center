import React from 'react';
import { Globe, ShieldAlert } from 'lucide-react';
import { translations } from '../../utils/translations';
import Image from 'next/image';

export default function Header({ lang, setLang }) {
  const t = translations[lang];

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="glass-panel" style={{ 
      padding: '1rem 1.5rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '1.5rem',
      background: 'linear-gradient(90deg, rgba(16, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.4) 100%)',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ 
          background: 'radial-gradient(circle, #ffffff 0%, #e2e8f0 100%)', 
          borderRadius: '12px', 
          padding: '0.4rem', 
          display: 'flex',
          boxShadow: '0 0 15px rgba(255,255,255,0.1)'
        }}>
          <Image 
            src="https://upload.wikimedia.org/wikipedia/ar/thumb/f/fe/Saudi_Ministry_of_Health_Logo.svg/1280px-Saudi_Ministry_of_Health_Logo.svg.png" 
            alt="Saudi Ministry of Health Logo" 
            width={65} 
            height={45}
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t.title}
          </h1>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ShieldAlert size={12} className="text-info" /> Operations Command Level 1
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="badge badge-critical animate-pulse-critical" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor', boxShadow: '0 0 8px currentColor' }}></div>
          {t.live} SYSTEM ACTIVE
        </div>
        
        <button 
          onClick={toggleLang}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-primary)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <Globe size={16} className="text-info" />
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
    </header>
  );
}
