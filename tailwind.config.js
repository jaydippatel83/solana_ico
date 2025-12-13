/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#8B5CF6',
          green: '#10B981',
          teal: '#14B8A6',
        },
        dark: {
          bg: '#0F0F23',
          card: '#1A1A3E',
        },
      },
      backgroundImage: {
        'gradient-purple-green': 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)',
        'gradient-teal-purple': 'linear-gradient(135deg, #14B8A6 0%, #8B5CF6 100%)',
      },
    },
  },
  plugins: [],
};

