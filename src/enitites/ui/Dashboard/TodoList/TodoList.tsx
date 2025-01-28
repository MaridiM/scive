'use client'

import { Content } from '@/shared/components'

import { TodoItem } from './ui'
import { TODO_DASHBOARD } from '@/enitites/api'

export function TodoList() {
    function isFavoriteHandler(id: number) {
        console.log('todo_favorite_dashboard', id)
        // updateTask &&
        //     updateTask(id, {
        //         ...todo,
        //         is_favorite: !is_favorite
        //     })
    }

    function isDoneHandler(id: number) {
        console.log('todo_complete_dashboard', id)
        // tagManageClick('todo_complete_dashboard')
        // updateTask &&
        //     updateTask(id as number, {
        //         ...todo,
        //         is_done: !is_done
        //     })
    }
    return (
        <Content
            className='gap-4'
            placeholder='This is our little daily tasks section. You can add tasks here from selected emails or create them yourself.'
            showPlaceholder={!TODO_DASHBOARD.length}
            loadingText='Loading todos'
            loading={false}
        >
            <ul className='flex flex-1 flex-col gap-2 overflow-y-auto pr-1'>
                {TODO_DASHBOARD.map(item => {
                    if (!item.content.length && !item.sub_content.length) return null
                    return (
                        <TodoItem
                            key={item.id}
                            item={item}
                            onClickDone={() => isDoneHandler(item.id)}
                            onClickFavorite={() => isFavoriteHandler(item.id)}
                        />
                    )
                })}
            </ul>
        </Content>
    )
}
