import { Loader as LoaderIcon } from 'lucide-react'

import { Typography } from './Typography'

interface IProps {
    label?: string
    spiner?: 'default' | 'spiner' | boolean
}

export function Loader({ label = 'Loading', spiner = 'default' }: IProps) {
    const text = `${label}...`.split('').map((symbol, idx) => (
        <Typography
            variant='body'
            type='span'
            key={idx}
            className='animate-bounce'
            style={{ animationDelay: `${idx * 100}ms` }}
        >
            {symbol === ' ' ? '\u00A0' : symbol}
        </Typography>
    ))
    return (
        <div className='flex flex-1 flex-col items-center justify-center gap-2'>
            {(!spiner || spiner === 'spiner') && <LoaderIcon className='animate-spin' />}
            {spiner === 'default' && (
                <svg
                    className='animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                >
                    <circle cx='5' cy='5' r='5' fill='#9CA3AF' />
                    <circle cx='19' cy='5' r='5' fill='#0EA5E9' />
                    <circle cx='5' cy='19' r='5' fill='#0EA5E9' />
                    <circle cx='19' cy='19' r='5' fill='#9CA3AF' />
                </svg>
            )}
            <div className='flex items-end justify-center gap-[0.7px]'>{text}</div>
        </div>
    )
}
