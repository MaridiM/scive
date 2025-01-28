'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button, Hint, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

const uniqueThreadIds = [1, 2, 3] // EXAMPLE

export function RelatedConversations() {
    const [currentThread, setCurrentThread] = useState<number>(1)
    const [activeArrow, setActiveArrow] = useState<'prev' | 'next' | 'all' | ''>('')

    function checkCurrentConversation(current: number, total: number) {
        if (total <= 1) return setActiveArrow('')
        if (current === 1) return setActiveArrow('next')
        if (current === total) return setActiveArrow('prev')

        return setActiveArrow('all')
    }

    useEffect(() => {
        checkCurrentConversation(currentThread, uniqueThreadIds.length)
    }, [currentThread, uniqueThreadIds])

    function setChangeCurrentThread(arrowState: 'prev' | 'next') {
        setCurrentThread(prev => {
            if (uniqueThreadIds.length === 0) return prev

            if (arrowState === 'next') {
                return prev < uniqueThreadIds.length ? prev + 1 : uniqueThreadIds.length
            } else {
                return prev > 1 ? prev - 1 : 1
            }
        })
    }

    function handleChangeThreads(arrowState: 'prev' | 'next') {
        setChangeCurrentThread(arrowState)
        // tagManageClick(`thread_${arrowState}_dashboard`)

        // fetchDigestThread()
        // clearSendMessageForm()
        // clearComposePrompt()
        // setCreateDraft(true)
    }

    return (
        <div className='flex items-center justify-between gap-2'>
            <Typography variant='body' className={cn('cursor-default px-4 text-base-body3 !text-text-ultra-light')}>
                {currentThread} of {uniqueThreadIds.length}
            </Typography>
            <Hint aling='start' side='bottom' label='Previous' asChild>
                <Button
                    variant='clear'
                    size='clear'
                    className={cn('h-9 w-9 rounded-md transition-all duration-300 ease-in-out', {
                        'hover:bg-surface-hover': activeArrow.length && currentThread !== 1
                    })}
                    onClick={activeArrow.length ? () => handleChangeThreads('prev') : undefined}
                >
                    <ChevronLeft
                        size={24}
                        className={cn('stroke-black', {
                            'stroke-icon-inactive': activeArrow !== 'prev' && activeArrow !== 'all'
                        })}
                    />
                </Button>
            </Hint>
            <Hint aling='start' side='bottom' label='Next' asChild>
                <Button
                    variant='clear'
                    size='clear'
                    className={cn('h-9 w-9 rounded-md transition-all duration-300 ease-in-out', {
                        'hover:bg-surface-hover': activeArrow.length && currentThread !== uniqueThreadIds.length
                    })}
                    onClick={activeArrow.length ? () => handleChangeThreads('next') : undefined}
                >
                    <ChevronRight
                        size={24}
                        className={cn('stroke-black', {
                            'stroke-icon-inactive': activeArrow !== 'next' && activeArrow !== 'all'
                        })}
                    />
                </Button>
            </Hint>
        </div>
    )
}
