import { PropsWithChildren } from 'react'

import { cn } from '@/shared/utils'

interface IProps {
    className?: string
}

export function PageWrapper({ children, className }: PropsWithChildren<IProps>) {
    return (
        <div
            className={cn(
                'flex h-full w-full flex-1 gap-1 overflow-hidden rounded-tl-base-x6 border-r-[1px] bg-background',
                className
            )}
        >
            {children}
        </div>
    )
}
