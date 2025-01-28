'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/shared/utils'

import { TTodoSuggestionsFilterKey } from '../types'

export function TodoFilter() {
    const [filterTodoBy, setFilterTodoBy] = useState<TTodoSuggestionsFilterKey>('new')

    function todoListFilterHandler(key: TTodoSuggestionsFilterKey) {
        console.log('Filter by: ', key)
        setFilterTodoBy(key)
        // filterTodos(key)}
        // tagManageClick('todo_filter_new_dashboard')
        // tagManageClick('todo_filter_by_date_dashboard')
        // tagManageClick('todo_filter_favorite_dashboard')
    }
    return (
        <ul className='flex items-center justify-between gap-1'>
            <li
                className={cn('cursor-pointer px-base-x3 py-base-x1 !text-base-body1 text-text-light', {
                    'font-semibold text-black': filterTodoBy === 'new'
                })}
                onClick={() => todoListFilterHandler('new')}
            >
                New
            </li>
            <li
                className={cn('cursor-pointer px-base-x3 py-base-x1 !text-base-body1 text-text-light', {
                    'font-semibold text-black': filterTodoBy === 'due'
                })}
                onClick={() => todoListFilterHandler('due')}
            >
                By date
            </li>
            <li
                className={cn('cursor-pointer px-base-x3 py-base-x1')}
                onClick={() => todoListFilterHandler('favorite')}
            >
                <Star
                    size={20}
                    className={cn('stroke-star', {
                        'fill-star': filterTodoBy === 'favorite'
                    })}
                />
            </li>
        </ul>
    )
}
