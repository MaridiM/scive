'use client'

import { MoveUp } from 'lucide-react'

import { Button, Hint, Typography } from '@/shared/components'
import { useStore } from '@/shared/libs'

export function ChatFooter() {
    const { showChatCompose, setShowChatCompose } = useStore()

    function showChatComposeHandler() {
        setShowChatCompose(showChatCompose === 'max' ? 'min' : 'max')
        // tagManageClick('compose_move_up_down')
        // setChatType(type)
    }
    return (
        <div className='flex h-9 w-full cursor-pointer items-center justify-between' onClick={showChatComposeHandler}>
            <div className='flex h-9 w-full items-center'>
                <Typography variant='body' className='!text-text-disabled'>
                    Type to quick respond or use Scive power...
                </Typography>
            </div>

            <div className='flex gap-4'>
                <Hint side='top' label={'Expand'} asChild>
                    <Button
                        variant='clear'
                        size='clear'
                        className='flex h-base-x9 w-base-x9 items-center justify-center rounded-base-x2 transition-all duration-300 ease-in-out hover:bg-surface-hover'
                    >
                        <MoveUp size={20} className='stroke-black' />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}
