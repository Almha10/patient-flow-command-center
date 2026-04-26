import React, { useState, useEffect } from 'react';
import Header from './Header';
import { translations } from '../../utils/translations';
import { Clock } from 'lucide-react';

export default function DashboardLayout({ children, lastUpdated }) {
  const [lang, setLang] = useState('en');
  
  useEffect(() => {
    // Update direction and font based on language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.style.fontFamily = lang === 'ar' ? 'var(--font-tajawal)' : 'var(--font-inter)';
  }, [lang]);

  const t = translations[lang];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-container">
        <Header lang={lang} setLang={setLang} />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-2)', color: 'var(--text-muted)', fontSize: '0.875rem', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Clock size={14} />
          {t.lastUpdated}: {lastUpdated ? lastUpdated.toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US') : ''}
        </div>
        
        {/* Pass down translation and lang via children cloning or context. Since it's a simple app, we can just pass props. Let's use React.cloneElement to inject 't' and 'lang' */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { t, lang });
          }
          return child;
        })}
      </div>
    </div>
  );
}
