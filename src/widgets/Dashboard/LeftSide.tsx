import { SearchInput } from '@/shared/components'

import { Widget } from './Widget'
import { Highlights, TodoList, TodoSuggestions } from '@/enitites/ui'
import { AddTodo } from '@/features'

export function LeftSide() {
    return (
        <aside className='border-devider grid grid-rows-[minmax(463px,463px)_auto_auto] gap-2 border-l-[1px] bg-white'>
            <Widget title='To-Do List' filter>
                <SearchInput />
                <AddTodo />
                <TodoList />
            </Widget>

            <Widget className='max-h-[96px] min-h-[96px] py-1'>
                <TodoSuggestions />
            </Widget>

            <Widget className='max-h-[334px] min-h-[334px]' title='Highlights'>
                <Highlights />
            </Widget>
        </aside>
    )
}
