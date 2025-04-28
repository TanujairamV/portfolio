import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);

    const applyTheme = (theme) => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      } else {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };

    applyTheme(savedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (savedTheme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <div className="flex gap-2 p-2 bg-dark-card/80 dark:bg-light-card/80 backdrop-blur-sm rounded-full">
      <button
        onClick={() => handleThemeChange('light')}
        className={`p-2 rounded-full ${theme === 'light' ? 'bg-accent-magenta text-white' : 'text-dark-text dark:text-light-text'}`}
        aria-label="Switch to light theme"
      >
        <SunIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`p-2 rounded-full ${theme === 'dark' ? 'bg-accent-cyan text-white' : 'text-dark-text dark:text-light-text'}`}
        aria-label="Switch to dark theme"
      >
        <MoonIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('system')}
        className={`p-2 rounded-full ${theme === 'system' ? 'bg-accent-purple text-white' : 'text-dark-text dark:text-light-text'}`}
        aria-label="Switch to system theme"
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
