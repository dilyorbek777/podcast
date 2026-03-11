const config = {
  theme: {
    extend: {
      colors: {
        // This creates text-primary, bg-primary, etc.
        primary: '#3b82f6',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      borderRadius: {
        '4xl': '2rem', 
        'sd': '21px', 
      }
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
