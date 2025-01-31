import { Check } from 'lucide-react'

import { cn } from '@/shared/utils'

import { Button } from '../ui'

import { Typography } from './Typography'

export interface IPlanCard {
    type: 'Standart' | 'Plus' | 'Pro'
    price: string
    points: string[]
    tooltip?: string
}

export const CardPlan: FC<IPlanCard> = ({ price, points, type }) => {
    return (
        <div
            className={cn(
                'h-[400px] w-[280px] rounded-3xl bg-slate-400 p-[32px]',
                type === 'Standart' && 'bg-gray-50',
                type === 'Plus' && 'bg-sky-400',
                type === 'Pro' && 'bg-black'
            )}
        >
            <Typography className='mb-[16px] flex justify-center'>{type}</Typography>
            <Typography className='mb-[36px] flex justify-center'>{price}</Typography>
            {/* <Typography>{tooltip}</Typography> */}
            <ul className='mb-[36px]'>
                {points.map((point, index) => (
                    <li key={index} className='flex-column mb-4 flex'>
                        <Check 
                            size={20}
                            className={cn(
                                'mr-4',
                                type === 'Standart' && 'fill-bg-gray-900',
                                type === 'Plus' && 'fill-bg-gray-900',
                                type === 'Pro' && 'fill-wite'
                            )}
                        />
                        <Typography
                            variant='subheadline'
                            className={cn(
                                type === 'Standart' && 'text-gray-900',
                                type === 'Plus' && 'text-gray-900',
                                type === 'Pro' && 'text-white'
                            )}
                        >
                            {point}
                        </Typography>
                    </li>
                ))}
            </ul>
            <Button variant={'clear'} className='m-auto flex'>
                Active
            </Button>
        </div>
    )
}
