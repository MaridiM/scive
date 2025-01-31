import { Typography } from "@/shared/components"
import { CardPlan } from "@/shared/components/shared/CardPlan"
import { FC } from "react"


export interface IPlanCard {
    type: 'Standart' | 'Plus' | 'Pro',
    price: string,
    points: string[], 
    tooltip?: string, 
}




export const Plane:FC<IPlanCard > = ()=>{
    
    const planCards = [
        {
            type: 'Standart',
            price: 'Free',
            points: [
                'For people who rarely use emails',
                '2 Executive Summaries/day',
                '3 Detailed Summaries/day',
                '2 Reply Generations/day'
            ]
        },
        {
            type: 'Plus',
            tooltip: 'Popular',
            price: '$5/mo',
            points: [
                'For average users',
                '5 Executive Summaries/day',
                '10 Detailed Summaries/day',
                '10 Reply Generations/day'
            ]
        },
        {
            type: 'Pro',
            price: '$20/mo',
            points: ['For ultimate users', 'Full unlimited']
        }
    ]
    return (
        <div className='pt-[20px] px-[36px] '>
            <div className='mb-[52px] '>
                 <Typography variant='body' className='!text-gray-900'>
                     Current plan: 
                     <Typography variant='body' className='!font-bold text-gray-900'>Standard</Typography>, active till{' '}
                <Typography variant='body' className='font-bold text-sky-400'>09.27.2023</Typography>
                </Typography>
            </div>
        <div className='flex justify-center' style={{gap:28}}>
            {planCards.map((item)=>(
                <CardPlan
                key={item.type} 
                type={item.type} 
                price={item.price} 
                points={item.points} 
                tooltip={item.tooltip}        
                />
            ))}
            
        </div>
        </div>
    )
}
