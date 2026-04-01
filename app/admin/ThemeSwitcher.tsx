'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Palette } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
        <Palette size={18} /> Select Active Theme
      </label>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['dark', 'light', 'minimalist'].map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t as 'dark' | 'light' | 'minimalist')}
            className={theme === t ? 'btn-primary' : 'btn-secondary'}
            style={{ textTransform: 'capitalize', flex: 1, minWidth: '100px' }}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="text-muted" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
        Current Theme: <span style={{ color: 'var(--accent)', fontWeight: 600, textTransform: 'capitalize' }}>{theme}</span>
      </p>
    </div>
  );
}
