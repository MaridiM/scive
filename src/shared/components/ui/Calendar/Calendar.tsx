'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/shared/utils'

import './Calendar.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={classNames}
            {...props}
        />
    )
}
Calendar.displayName = 'Calendar'

export { Calendar }
