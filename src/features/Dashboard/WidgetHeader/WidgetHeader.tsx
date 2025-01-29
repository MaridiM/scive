import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

import { ICounterDashboard } from './types'
import { Counter, RelatedConversations, TodoFilter } from './ui'

interface IProps {
    className?: string
    title: string
    counter?: ICounterDashboard
    filter?: boolean
    pagination?: boolean
}

export function WidgetHeader({ title, counter, filter, pagination, className }: IProps) {
    return (
        <header
            className={cn(
                'flex cursor-default items-center py-2',
                {
                    'justify-between': counter?.subject === 'new' || filter || pagination,
                    'border-b border-divider': pagination
                },
                className
            )}
        >
            <Typography variant='h3' className='text-base-h3 font-normal !text-text-light'>
                {title}
            </Typography>

            {counter && <Counter counter={counter} />}
            {filter && <TodoFilter />}
            {pagination && <RelatedConversations />}
        </header>
    )
}
