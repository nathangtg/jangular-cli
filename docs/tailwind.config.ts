import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-muted': 'var(--background-muted)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        'foreground-subtle': 'var(--foreground-subtle)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        'card-foreground': 'var(--card-foreground)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        'radius': 'var(--radius)',
      },
    },
  },
  plugins: [],
};

export default config;