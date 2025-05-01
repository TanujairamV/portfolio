import { useEffect } from 'react';
import particlesJS from 'particles.js';

export default function ThemeToggle({ isDarkMode, setIsDarkMode, particleConfigs }) {
  const toggleDarkMode = () => {
    console.log('Toggling dark mode, current state:', isDarkMode);
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.style.setProperty('--frosted-bg', newMode ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.92)');
    document.documentElement.style.setProperty('--text-primary', newMode ? '#FFFFFF' : '#000000');
    document.body.style.color = newMode ? '#FFFFFF' : '#000000';
    try {
      const particlesDiv = document.getElementById('particles-js');
      particlesDiv.innerHTML = '';
      particlesJS('particles-js', particleConfigs[newMode ? 'dark' : 'light']);
      particlesDiv.style.backgroundColor = newMode ? '#100b16' : '#F5F3FF';
      console.log('Particles.js reinitialized for theme:', newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Particles.js toggle failed:', error);
    }
    console.log('New dark mode state:', newMode, 'Class list:', document.documentElement.classList.toString());
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (!localStorage.getItem('darkMode')) {
        const newMode = e.matches;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        try {
          document.getElementById('particles-js').innerHTML = '';
          particlesJS('particles-js', particleConfigs[newMode ? 'dark' : 'light']);
          document.getElementById('particles-js').style.backgroundColor = newMode ? '#100b16' : '#F5F3FF';
          console.log('System theme changed to:', newMode ? 'dark' : 'light');
        } catch (error) {
          console.error('Particles.js reinitialization failed:', error);
        }
      }
    };
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [setIsDarkMode, particleConfigs]);

  return (
    <button
      onClick={toggleDarkMode}
      className="text-text-primary hover:text-accent-purple transition-colors duration-300"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {window.matchMedia('(prefers-color-scheme: dark)').matches && !isDarkMode ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
