import { Mail } from 'lucide-react'

import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

import { ICounterDashboard } from '../types'

interface IProps {
    counter: ICounterDashboard
}

export function Counter({ counter }: IProps) {
    if (!counter) return null

    const { subject, count } = counter
    const isPro = subject === 'pro'
    const isNew = subject === 'new'
    const isLeft = subject === 'left'
    const isZeroCount = count === 0

    const wrapperClasses = cn(
        'items-center justify-center rounded-full px-base-x3 py-base-x1',
        isPro && 'ml-2 bg-black',
        isNew && isZeroCount && 'bg-surface-inactive',
        isLeft && isZeroCount && 'bg-white'
    )

    const textClasses = cn(
        'flex items-center !text-base-body2 text-primary',
        isPro && '!text-base-body4 text-white',
        isLeft && 'text-black',
        isNew && isZeroCount && 'text-sky-200',
        isLeft && isZeroCount && 'text-error'
    )

    // Что выводить вместо/рядом с числом?
    // - Если subject = 'pro', выводим "Pro" (с заглавной буквы)
    // - Если subject = 'left', выводим 'left'
    // - Иначе иконку <Mail>
    let extraContent
    if (isPro) {
        extraContent = subject[0].toUpperCase() + subject.slice(1)
    } else if (isLeft) {
        extraContent = subject
    } else {
        extraContent = (
            <Mail
                size={20}
                className={cn('ml-[6px] stroke-primary', {
                    'stroke-sky-200': isNew && isZeroCount
                })}
            />
        )
    }

    return (
        <div className={wrapperClasses}>
            <Typography variant='button-plain' className={textClasses}>
                {!isPro && count} {extraContent}
            </Typography>
        </div>
    )
}
