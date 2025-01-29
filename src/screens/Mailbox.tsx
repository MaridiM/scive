'use client'

import { format } from 'date-fns'
import {
    AlertOctagon,
    ArchiveRestore,
    BellDot,
    File,
    FolderSymlink,
    Mail,
    MailCheck,
    MailOpen,
    Pencil,
    RefreshCcw,
    Send,
    Trash2
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParam, useSet } from 'react-use'

import { Button, Checkbox, Hint, SearchInput, Typography } from '@/shared/components'
import { paths } from '@/shared/config'
import { EFilterOptions, EThreadLabels } from '@/shared/types'
import { cn } from '@/shared/utils'

import { THREADS } from '@/enitites/api'

function Mailbox() {
    const navbar = useMemo(
        () => [
            { icon: BellDot, title: 'New', path: paths.mailbox('new'), countUnread: 12 },
            { icon: Mail, title: 'Inbox', path: paths.mailbox('inbox'), countUnread: 12 },
            { icon: Send, title: 'Sent', path: paths.mailbox('sent') },
            { icon: File, title: 'Drafts', path: paths.mailbox('drafts'), countUnread: 9 },
            {
                icon: AlertOctagon,
                title: 'Spam',
                path: paths.mailbox('spam'),
                countUnread: 5,
                isRedCounter: true
            },
            { icon: Trash2, title: 'Trash', path: paths.mailbox('trash') }
        ],
        []
    )

    const searchParam = useSearchParams()
    const router = useRouter()
    const [selectedThreadsIds, { add, has, remove }] = useSet<string>(new Set(['1948978bdb0165a9', '19485e8ece2aa07a']))
    const [selectedCheckState, setSelectedCheckState] = useState<'all' | 'some' | null>(null)

    useEffect(() => {
        setSelectedCheckState(
            selectedThreadsIds.size === THREADS.length ? 'all' : selectedThreadsIds.size ? 'some' : null
        )
    }, [selectedThreadsIds.size, THREADS.length])
    function onCheckedHandler() {
        setSelectedCheckState('all')
        // tagManageClick('select_all_inbox')
    }

    function markAllAsDoneThreadsHandler() {
        console.log('markAllAsDoneThreadsHandler')
    }

    function showComposeHandler() {
        console.log('showComposeHandler')
    }

    function updateSelectedThreads(label: EThreadLabels | EFilterOptions) {
        console.log('update selected threads by: ', label)
        // tagManageClick('selected_read_unread')
        // tagManageClick('selected_report_spam_inbox')
        // tagManageClick('selected_trash_inbox')
        // tagManageClick('selected_send_to_inbox_from_sent_inbox')
        // tagManageClick('selected_not_spam_inbox'),
        // tagManageClick('mark_as_unread_spam_inbox'),
        // tagManageClick('selected_mark_as_unread_trash_inbox'),
        // tagManageClick('selected_restore_from_trash_inbox'),
        // tagManageClick('selected_report_spam_from_trash_inbox'),
    }

    function refreshThreadsHandler() {
        console.log('refresh spam threads')
        // tagManageClick('refresh_spam')
        // fetchThreads()
    }

    useEffect(() => {
        !searchParam.get('label') && router.push(paths.mailbox('new'))
        searchParam.get('label')?.includes('trash') && router.push(paths.mailbox('trash'))
    }, [searchParam, router])

    const unreadThreads = false
    const showCompose = false
    const selectedThreads = THREADS

    const label = searchParam.get('label') ?? 'new'

    const isNew = label === 'new'
    const isSent = label === 'sent'
    const isSpam = label === 'spam'
    const isTrash = label === 'trash'

    return (
        <div className='grid w-full grid-cols-[220px_auto] gap-1 overflow-hidden'>
            <aside className='flex flex-col justify-start gap-2 border-r border-divider px-2 pb-6 pt-3'>
                <Typography
                    variant='body'
                    className='flex max-h-[38px] w-full flex-1 items-center justify-center text-text-ultra-light'
                >
                    {format(new Date(), 'dd MMMM yyy')}
                </Typography>
                <ul className='space-y-2'>
                    {navbar.map((item, idx) => {
                        const isActive = item.path.includes(label)
                        return (
                            <li key={idx}>
                                <Link
                                    href={item.path}
                                    className={cn(
                                        'group relative flex items-center justify-between gap-2 rounded-lg px-3 py-3 pr-2 transition-all duration-300 ease-in-out hover:bg-surface-hover hover:pl-4',
                                        {
                                            'cursor-default bg-surface-hover pl-4 hover:bg-surface-hover': isActive
                                        }
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'absolute left-0 h-6 w-1.5 rounded-lg bg-transparent transition-all duration-300 ease-in-out',
                                            {
                                                'bg-primary': isActive
                                            }
                                        )}
                                    />
                                    <Typography
                                        variant='body-list'
                                        className={cn(
                                            'flex items-center gap-3 !text-text-bold' /*{ 'text-button-disabled': item.disabled }*/
                                        )}
                                    >
                                        <item.icon
                                            size={20}
                                            className={cn(
                                                'stroke-[1.5px] text-black' /*{'text-text-disabled': item.disabled } */
                                            )}
                                        />
                                        {item.title}
                                    </Typography>
                                    {item.countUnread && (
                                        <Typography
                                            variant='label-date'
                                            className={cn(
                                                '!text-light-text flex h-base-x4 min-w-[16px] items-center justify-center rounded-base-x4 bg-surface-over-hover pl-[2px] pr-[2px]',
                                                { 'bg-red-400 !text-white': item.isRedCounter }
                                            )}
                                        >
                                            {item.countUnread}
                                        </Typography>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </aside>
            <section className='flex flex-col gap-2 overflow-hidden border-l border-divider px-1 pb-6 pt-3'>
                <header className='flex h-[38px] items-center justify-between pr-5'>
                    <div className='flex gap-4'>
                        {isNew && !!selectedThreadsIds.size && (
                            <Button
                                variant='clear'
                                size='clear'
                                onClick={markAllAsDoneThreadsHandler}
                                className='pl-4 pr-10 text-button hover:text-button-hover'
                            >
                                Mark all as done
                            </Button>
                        )}
                        {!isNew && (
                            <Hint side='bottom' label='Select all' asChild>
                                <Checkbox checkState={selectedCheckState} onCheckedChange={onCheckedHandler} />
                            </Hint>
                        )}
                        {!isNew && !!selectedThreadsIds.size && (
                            <ul className='flex gap-2'>
                                {!isSent && !isSpam && (
                                    <>
                                        {!isTrash && (
                                            <li
                                                className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                                onClick={() => updateSelectedThreads(EThreadLabels.UNREAD)}
                                            >
                                                {unreadThreads ? (
                                                    <MailOpen
                                                        size={20}
                                                        className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                                    />
                                                ) : (
                                                    <Mail
                                                        size={20}
                                                        className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                                    />
                                                )}
                                            </li>
                                        )}
                                        <li
                                            className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                            onClick={() => updateSelectedThreads(EThreadLabels.SPAM)}
                                        >
                                            <AlertOctagon
                                                size={20}
                                                className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                            />
                                        </li>
                                        {!isTrash && (
                                            <li
                                                className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                                onClick={() => updateSelectedThreads(EThreadLabels.TRASH)}
                                            >
                                                <Trash2
                                                    size={20}
                                                    className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                                />
                                            </li>
                                        )}
                                    </>
                                )}
                                {isSent && (
                                    <li
                                        className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                        onClick={() => updateSelectedThreads(EThreadLabels.INBOX)}
                                    >
                                        <FolderSymlink
                                            size={20}
                                            className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                        />
                                    </li>
                                )}
                                {isSpam && (
                                    <li
                                        className='flex h-9 cursor-pointer items-center justify-center rounded-lg px-2 text-base-body2 text-black transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                        onClick={() => updateSelectedThreads(EFilterOptions['not spam'])}
                                    >
                                        Not spam
                                    </li>
                                )}
                                {(isTrash || isSpam) && (
                                    <>
                                        <li
                                            className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                            onClick={() => updateSelectedThreads(EThreadLabels.UNREAD)}
                                        >
                                            <MailCheck
                                                size={20}
                                                className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                            />
                                        </li>
                                        {isTrash && (
                                            <li
                                                className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                                onClick={() => updateSelectedThreads(EThreadLabels.INBOX)}
                                            >
                                                <ArchiveRestore
                                                    size={20}
                                                    className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                                />
                                            </li>
                                        )}
                                    </>
                                )}
                                {isSpam && (
                                    <li
                                        className='group flex h-9 w-9 items-center justify-center rounded-base-x2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                        onClick={refreshThreadsHandler}
                                    >
                                        <RefreshCcw
                                            size={20}
                                            className='stroke-black stroke-[1.5px] group-hover:bg-surface-hover'
                                        />
                                    </li>
                                )}
                            </ul>
                        )}
                        <SearchInput className='w-[440px]' />
                    </div>
                    <Button
                        className={cn('h-9 gap-2 bg-button font-normal hover:bg-button-hover', {
                            'cursor-default bg-surface-inactive hover:bg-surface-inactive': showCompose
                        })}
                        onClick={!showCompose ? showComposeHandler : undefined}
                    >
                        <Pencil
                            size={20}
                            className={cn('stroke-black stroke-[1.5px]', { 'stroke-icon-inactive': showCompose })}
                        />
                        Compose
                    </Button>
                    {/* <Button
                        disabled={showCompose}
                        className={cn(
                            'mr-6 h-9 rounded-base-x3 bg-sky pl-base-x3 pr-base-x4',
                            showCompose && bg.inactiveSurface
                        )}
                        classNameText={cn(showCompose ? text.disabledText : text.white)}
                    >
                        Compose
                    </Button> */}
                </header>
                <section className='flex flex-1 border-t border-divider bg-green-500'>
                    <section className='w-full border-r-2 border-black bg-orange-500'>THREADS</section>
                    <section className='w-full bg-sky-500'>CHAT</section>
                </section>
            </section>
        </div>
    )
}
export default Mailbox
