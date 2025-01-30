import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)']
            },
            colors: {
                background: {
                    DEFAULT: 'var(--bg-default)',
                    dashboard: 'var(--bg-dashboard)',
                    side: 'var(--bg-side)'
                },

                white: 'var(--color-white)',
                black: 'var(--color-black)',
                blue: 'var(--color-blue)',
                primary: {
                    DEFAULT: 'var(--primary)'
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

                slider: {
                    DEFAULT: 'var(--slider-track)',
                    'track-fill': 'var(--slider-track-fill)',
                    thumb: 'var(--slider-thumb)',
                    'thumb-outline': 'var(--slider-thumb-outline)',
                    mark: 'var(--slider-mark)',
                    'mark-fill': 'var(--slider-mark-fill)'
                },
                border: 'var(--border)',
                surface: {
                    hover: 'var(--surface-hover)',
                    'over-hover': 'var(--surface-over-hover)',
                    disabled: 'var(--surface-disabled)',
                    dashboard: 'var(--surface-dashboard)',
                    inactive: 'var(--surface-inactive)'
                },
                'mail-selected': 'var(--mail-selected)',
                'counter-zero-new': 'var(--counter-zero-new)',
                'message-outcoming': 'var(--message-outcoming)',
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
                    '400': 'var(--sky-400)',
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
                'base-x16': '64px'
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
                },
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-1.5px)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                bounce: 'bounce 3s ease-in-out infinite'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
}
export default config
