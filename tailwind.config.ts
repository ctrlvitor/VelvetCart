import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        playwrite: ['Playwrite', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        specialGothic: ['Special Gothic', 'sans-serif'],
      },
      backgroundImage: {
        glass: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
