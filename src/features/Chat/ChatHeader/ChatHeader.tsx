'use client'

import { format } from 'date-fns'
import { AlertOctagon, MoreVertical, ReplyAll, Trash2 } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'

import { Button, Hint, Menu, Typography } from '@/shared/components'
import { IThread } from '@/shared/types'
import { formattedDate } from '@/shared/utils'

interface IProps {
    thread: IThread
    useMenu?: boolean
}

export function ChatHeader({ children, thread, useMenu }: PropsWithChildren<IProps>) {
    const [isImportant, setIsImportant] = useState(false)

    const threadMessages = thread.messages[0]
    const titleLong = threadMessages.metadata.from_
    const titleName = titleLong.replace(/^"(.*?)".*$/, '$1')
    const titleEmail = titleLong.replace(/^.*<([^>]+)>$/, '<$1>')

    function isImportantThreadHandler() {
        setIsImportant(!isImportant)
        // tagManageClick('thread_important_dashboard')
    }

    function menuHandler(option: string) {
        console.log(option)
    }

    const tooltipContent = isImportant
        ? 'Click to teach Scive this conversation is not important'
        : 'Click to teach Scive this conversation is important'
    return (
        <header className='w-full border-b border-divider'>
            {children}
            <div className='flex h-[47px] w-full items-center gap-4 border-b border-divider pl-5 pr-8'>
                <Hint side='top' label={titleName} asChild>
                    <Typography
                        variant='body-bold'
                        className='relative cursor-default !font-bold !text-text-bold'
                        nowrap
                    >
                        {titleName}
                    </Typography>
                </Hint>
                <Hint side='top' label={titleEmail} asChild>
                    <Typography nowrap variant='calout' className='cursor-default !text-text-light'>
                        {titleEmail}
                    </Typography>
                </Hint>
                <Typography variant='label-date' className='!text-normal ml-auto min-w-fit cursor-default !text-black'>
                    {formattedDate(threadMessages.metadata.created_at ?? '')}
                </Typography>
            </div>
            <div className='flex h-[47px] w-full items-center gap-4 px-5'>
                <Typography variant='h4' nowrap className='cursor-default !font-bold leading-7 !text-text-bold'>
                    {threadMessages.metadata.subject}
                </Typography>

                <Hint side='top' label={tooltipContent} asChild>
                    <Button variant='clear' size='clear' className='ml-auto h-9 w-9' onClick={isImportantThreadHandler}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='15' height='14' viewBox='0 0 15 14' fill='none'>
                            <path
                                d='M3.50749 6.47364L0.444886 1.52635C0.0324821 0.860163 0.511644 0 1.29515 0H9.29817C9.63252 0 9.94475 0.1671 10.1302 0.445298L14.1302 6.4453C14.3542 6.7812 14.3542 7.2188 14.1302 7.5547L10.1302 13.5547C9.94475 13.8329 9.63252 14 9.29817 14H1.29515C0.511642 14 0.0324822 13.1398 0.444886 12.4736L3.50749 7.52635C3.70714 7.20385 3.70714 6.79615 3.50749 6.47364Z'
                                fill={isImportant ? '#FDBA74' : '#D1D5DB'}
                            />
                        </svg>
                    </Button>
                </Hint>
                {useMenu && (
                    <Hint side='top' label={'More options'} asChild>
                        <Menu
                            options={[
                                { icon: ReplyAll, text: 'Forward all', reverseIcon: true },
                                { icon: AlertOctagon, text: 'Report spam' },
                                { icon: Trash2, text: 'Delete' }
                            ]}
                            onClick={menuHandler}
                        />
                    </Hint>
                )}
            </div>
        </header>
    )
}
