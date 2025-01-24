import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'var(--font-inter)'
    			]
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			white: 'var(--color-white)',
    			black: 'var(--color-black)',
    			blue: 'var(--color-blue)',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			important: {
    				DEFAULT: 'var(--important)',
    				light: 'var(--important-light)'
    			},
    			info: {
    				DEFAULT: 'var(--info)',
    				hover: 'var(--info-hover)',
    				surface: 'var(--info-surface)'
    			},
    			text: {
    				DEFAULT: 'var(--text-default)',
    				light: 'var(--text-light)',
    				bold: 'var(--text-bold)',
    				disabled: 'var(--text-disabled)',
    				'ultra-light': 'var(--text-ultra-light)'
    			},
    			button: {
    				DEFAULT: 'var(--button-default)',
    				hover: 'var(--button-hover)',
    				devider: 'var(--button-divider)',
    				disabled: 'var(--button-disabled)'
    			},
    			divider: {
    				DEFAULT: 'var(--divider)',
    				light: 'var(--divider-light)'
    			},
    			icon: {
    				DEFAULT: 'var(--icon-default)',
    				inactive: 'var(--icon-inactive)',
    				hover: 'var(--icon-hover)',
    				surface: 'var(--icon-surface)'
    			},
    			border: 'hsl(var(--border))',
    			surface: {
    				hover: 'var(--surface-hover)',
    				'over-hover': 'var(--surface-over-hover)',
    				disabled: 'var(--surface-disabled)',
    				dashboard: 'var(--surface-dashboard)',
    				inactive: 'var(--surface-inactive)'
    			},
    			'mail-selected': 'var(--mail-selected)',
    			'counter-zero-new': 'var(--counter-zero-new)',
    			'message-outgoing': 'var(--message-outgoing)',
    			tooltip: 'var(--tooltip)',
    			star: 'var(--star)',
    			scroll: 'var(--scroll-down-counter)',
    			error: {
    				DEFAULT: 'var(--error)',
    				light: 'var(--error-light)',
    				surface: 'var(--error-surface)'
    			},
    			indigo: {
    				'100': 'var(--indigo-100)',
    				'200': 'var(--indigo-200)',
    				'300': 'var(--indigo-300)',
    				'400': 'var(--indigo-300)',
    				DEFAULT: 'var(--indigo-400)'
    			},
    			green: {
    				'100': 'var(--green-100)',
    				'200': 'var(--green-200)',
    				'300': 'var(--green-300)',
    				'400': 'var(--green-300)',
    				DEFAULT: 'var(--green-400)'
    			},
    			orange: {
    				'100': 'var(--orange-100)',
    				'200': 'var(--orange-200)',
    				'300': 'var(--orange-300)',
    				'400': 'var(--orange-300)',
    				DEFAULT: 'var(--orange-400)'
    			},
    			sky: {
    				'50': 'var(--sky-50)',
    				'100': 'var(--sky-100)',
    				'200': 'var(--sky-200)',
    				'300': 'var(--sky-300)',
    				'400': 'var(--sky-500)',
    				'500': 'var(--sky-500)',
    				'600': 'var(--sky-600)',
    				'700': 'var(--sky-700)',
    				'800': 'var(--sky-800)',
    				'900': 'var(--sky-900)',
    				DEFAULT: 'var(--sky-700)'
    			},
    			red: {
    				'100': 'var(--red-100)',
    				'200': 'var(--red-200)',
    				'300': 'var(--red-300)',
    				'400': 'var(--red-400)',
    				'500': 'var(--red-500)',
    				'800': 'var(--red-800)',
    				'900': 'var(--red-900)',
    				DEFAULT: 'var(--red-500)'
    			},
    			gray: {
    				'50': 'var(--gray-50)',
    				'100': 'var(--gray-100)',
    				'200': 'var(--gray-200)',
    				'300': 'var(--gray-300)',
    				'400': 'var(--gray-400)',
    				'500': 'var(--gray-500)',
    				'600': 'var(--gray-600)',
    				'700': 'var(--gray-700)',
    				'800': 'var(--gray-800)',
    				'900': 'var(--gray-900)',
    				DEFAULT: 'var(--gray-500)'
    			},
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		spacing: {
    			'base-x1': '4px',
    			'base-x2': '8px',
    			'base-x3': '12px',
    			'base-x4': '16px',
    			'base-x5': '20px',
    			'base-x6': '24px',
    			'base-x8': '32px',
    			'base-x9': '36px',
    			'base-x10': '40px',
    			'base-x12': '48px',
    			'base-x16': '64px',
    			'base-x18': '72px'
    		},
    		fontSize: {
    			'base-h1': '32px',
    			'base-h2': '24px',
    			'base-h3': '20px',
    			'base-h4': '16px',
    			'base-body': '16px',
    			'base-body-digest': '15px',
    			'base-body-digest1': '18px',
    			'base-body1': '14px',
    			'base-body2': '13px',
    			'base-body3': '12px',
    			'base-body4': '11px',
    			'base-body5': '10px'
    		},
    		borderRadius: {
    			'base-x0': '0px',
    			'base-x2': '8px',
    			'base-x3': '12px',
    			'base-x4': '16px',
    			'base-x6': '24px',
    			'base-x8': '32px',
    			'base-x16': '64px',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		screens: {
    			laptop: '1280px',
    			desktop: '1440px'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [require('tailwindcss-animate')]
}
export default config
