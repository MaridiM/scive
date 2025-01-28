'use client'

import { Plus, Star } from 'lucide-react'
import { useState } from 'react'

import { Button, Content, Hint, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

import { TODO_SUGGESTIONS } from '@/enitites/api'

export function TodoSuggestions() {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    function addTodoSuggestionHandler() {
        console.log('todo_add_dashboard')
        // tagManageClick('todo_add_dashboard')
        //     addTask?.({
        //         id: todoSuggestions?.id,
        //         content,
        //         due: getDate(),
        //         is_favorite: isFavorite
        //     } as unknown as IUpdateTodo)
    }

    function isFavoriteTodoSuggestionHandler() {
        console.log('todo_add_dashboard')
        setIsFavorite(!isFavorite)
        // tagManageClick('todo_favorite_dashboard')
    }

    return (
        <Content
            className='gap-4'
            placeholder='Here you can add important things from executive summary to your tasks'
            showPlaceholder={!TODO_SUGGESTIONS.content.length}
            loadingText='Generate todo suggestions'
            loading={false}
        >
            <ul className='flex flex-1 flex-col gap-1 overflow-y-auto pr-1'>
                {TODO_SUGGESTIONS.content.map((item: string, idx: number) => (
                    <li key={idx} className='flex items-center'>
                        <Hint side='right' label='Add to To-Do list' asChild>
                            <Button variant='clear' className='p-base-x2' onClick={addTodoSuggestionHandler}>
                                <Plus size={32} className='stroke-sky-400' />
                            </Button>
                        </Hint>
                        <Typography variant='body-list' className={cn('flex-grow !text-sky-400')}>
                            {item}
                        </Typography>
                        <Button variant='clear' onClick={isFavoriteTodoSuggestionHandler}>
                            <Star
                                size={20}
                                className={cn('stroke-star', {
                                    'fill-star': isFavorite
                                })}
                            />
                        </Button>
                    </li>
                ))}
            </ul>
        </Content>
    )
}
