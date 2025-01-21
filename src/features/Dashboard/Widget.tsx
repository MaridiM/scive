import { PropsWithChildren } from 'react'

import { cn } from '@/shared/utils'

import { ICounterDashboard } from './Dashboard.types'
import { Header } from './Header'

interface IProps {
    className?: string
    title?: string
    counter?: ICounterDashboard
}

export function Widget({ children, className, title, counter }: PropsWithChildren<IProps>) {
    return (
        <section className={cn('px-6 py-5', className)}>
            {title && <Header title={title} counter={counter} />}
            {children}
        </section>
    )
}
