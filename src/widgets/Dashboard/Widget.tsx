import { PropsWithChildren } from 'react'

import { cn } from '@/shared/utils'

import { Header, type ICounterDashboard } from '@/features'

interface IProps {
    className?: string
    title?: string
    counter?: ICounterDashboard
    withFooter?: boolean
}

export function Widget({ children, className, title, counter, withFooter }: PropsWithChildren<IProps>) {
    return (
        <section className={cn('flex flex-col gap-2 overflow-hidden px-5 py-4', className)}>
            {title && <Header title={title} counter={counter} />}
            {children}
            {!children && <section className='flexbg-green-300'>CONTENT</section>}
            {withFooter && <footer className='bg-red-500'>FOOTER</footer>}
        </section>
    )
}
