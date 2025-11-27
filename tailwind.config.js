/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Executive Palette
        primary: {
          DEFAULT: '#0f172a', // Slate 900 - Deep, authoritative blue-black
          light: '#334155',   // Slate 700
          dark: '#020617',    // Slate 950
        },
        secondary: {
          DEFAULT: '#3b82f6', // Blue 500 - Trustworthy blue, used sparingly
          light: '#60a5fa',
          dark: '#2563eb',
        },
        accent: {
          DEFAULT: '#0ea5e9', // Sky 500 - Modern, tech-forward accent
          hover: '#0284c7',
        },
        // Neutral scale for minimalism
        dark: '#020617',      // Almost black
        light: '#f8fafc',     // Slate 50
        white: '#ffffff',
        gray: {
          dark: '#1e293b',    // Slate 800
          medium: '#64748b',  // Slate 500 - Perfect for secondary text
          light: '#cbd5e1',   // Slate 300 - Borders
          lighter: '#f1f5f9', // Slate 100 - Backgrounds
          lightest: '#f8fafc', // Slate 50
        },
        // Semantic colors
        success: '#10b981',   // Emerald 500
        warning: '#f59e0b',   // Amber 500
        error: '#ef4444',     // Red 500
        info: '#3b82f6',      // Blue 500
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Lexend', 'Inter', 'system-ui', 'sans-serif'], // For headings
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', // Deep executive gradient
        'gradient-secondary': 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)', // Tech blue gradient
        'gradient-dark': 'linear-gradient(to bottom, #0f172a, #020617)',
        'gradient-light': 'linear-gradient(to bottom, #f8fafc, #ffffff)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
        '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.3)',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
