import { PropsWithChildren } from 'react'

import { cn } from '@/shared/utils'

import { type ICounterDashboard, WidgetHeader } from '@/features'

interface IProps {
    className?: string
    title?: string
    counter?: ICounterDashboard
    filter?: boolean
    pagination?: boolean
}

export function Widget({ children, className, title, counter, filter, pagination }: PropsWithChildren<IProps>) {
    return (
        <section className={cn('flex flex-col gap-2 overflow-hidden px-5 py-4', className)}>
            {title && <WidgetHeader title={title} counter={counter} filter={filter} pagination={pagination} />}
            {children}
        </section>
    )
}
