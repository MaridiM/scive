'use client'

import { type PropsWithChildren, useEffect, useState } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

interface IProps {
    label: string
    asChild?: boolean
    side?: 'top' | 'bottom' | 'left' | 'right'
    aling?: 'start' | 'center' | 'end'
}

export function Hint({ children, label, asChild, aling, side }: PropsWithChildren<IProps>) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // Возвращаем null на сервере, чтобы избежать ошибки SSR

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent
                    className='bg-[#1f2128] text-white dark:bg-white dark:text-[#1f2128]'
                    side={side}
                    align={aling}
                >
                    <p className='font-semibold'>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
