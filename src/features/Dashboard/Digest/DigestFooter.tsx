'use client'

import { CircleCheckBig, Wand2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/components'
import { cn, formatTime } from '@/shared/utils'

export function DigestFooter() {
    const [refreshTimeout] = useState<number>(0)

    function markAllAsDoneHandler() {
        // tagManageClick('mark_all_as_done_dashboard')
        // readAll(allDigestThreadIds)}
        console.log('mark_all_as_done_dashboard')
    }

    function refreshSubmit() {
        console.log(refreshSubmit)
    }

    return (
        <footer className='flex justify-center gap-x-base-x4 pt-base-x4'>
            <Button
                variant='clear'
                className='h-[36px] gap-1 border-2 border-button px-base-x2 !text-base-body2 font-semibold leading-[19px] tracking-tight text-button hover:border-button-hover hover:text-button-hover laptop:min-w-[160px] desktop:min-w-[180px]'
                onClick={markAllAsDoneHandler}
            >
                <CircleCheckBig size={20} className='mr-1 stroke-black' />
                Mark all as done
            </Button>
            <Button
                className={cn(
                    'flex h-[36px] gap-2 bg-button px-base-x2 !text-base-body2 font-semibold tracking-tight hover:bg-button-hover laptop:min-w-[160px] desktop:min-w-[180px]',
                    {
                        'bg-sky-400': refreshTimeout !== 0
                    }
                )}
                onClick={refreshSubmit}
            >
                <Wand2 size={20} className='stroke-black' />
                {refreshTimeout !== 0 ? `Timeout ${formatTime(refreshTimeout || 0)}` : `Generate new`}
            </Button>
        </footer>
    )
}
