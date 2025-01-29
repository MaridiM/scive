import { PlusCircle } from 'lucide-react'

import { Button } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    showPopover: boolean
    showPopoverHandler: VoidFunction
}

export function AddTodoButton({ showPopover, showPopoverHandler }: IProps) {
    return (
        <Button
            variant='clear'
            size='clear'
            className={cn(
                'rounded-y-lg flex items-center justify-start gap-4 px-2 py-4 font-normal text-black hover:bg-icon-surface',
                {
                    'rounded-b-none bg-icon-surface hover:bg-icon-surface': showPopover
                }
            )}
            onClick={showPopoverHandler}
        >
            <PlusCircle size={24} className={cn('stroke-primary')} />
            Add a task
        </Button>
    )
}
