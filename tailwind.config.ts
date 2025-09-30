import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#333333',
        light: '#FFFFFF',
        kakao: '#FEE500',
      },
    },
  },
  plugins: [],
}

export default config