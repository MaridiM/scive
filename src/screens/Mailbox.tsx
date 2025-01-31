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
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useKey, useSet } from 'react-use'

import { Button, Checkbox, Hint, SearchInput, Separator, Typography } from '@/shared/components'
import { paths } from '@/shared/config'
import { EFilterOptions, EThreadLabels, IThread } from '@/shared/types'
import { cn } from '@/shared/utils'
import { formattedDate } from '@/shared/utils'

import { THREADS } from '@/enitites/api'

export default function Mailbox() {
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
    const [
        selectedThreadsIds,
        { add: selesctThread, has: isSelected, remove: unselectedThread, clear: clearSelectedThreads }
    ] = useSet<string>(new Set([]))
    const [selectedCheckState, setSelectedCheckState] = useState<'all' | 'some' | null>(null)

    const [isImportant, setIsImportant] = useState(false)
    const [currentThread, setCurrentThread] = useState<IThread | null>(null)

    useEffect(() => {
        setSelectedCheckState(
            selectedThreadsIds.size === THREADS.length ? 'all' : selectedThreadsIds.size ? 'some' : null
        )
    }, [selectedThreadsIds.size, THREADS.length, selectedCheckState])

    useEffect(() => {
        !searchParam.get('label') && router.push(paths.mailbox('new'))
        searchParam.get('label')?.includes('trash') && router.push(paths.mailbox('trash'))
    }, [searchParam, router])

    function onCheckedHandler() {
        if (selectedCheckState === 'some' || selectedCheckState === 'all') {
            clearSelectedThreads()
            setSelectedCheckState(null)
        }

        if (!selectedCheckState) {
            setSelectedCheckState('all')
            THREADS.map(thread => {
                if (!isSelected(thread.id)) {
                    selesctThread(thread.id)
                } else {
                    unselectedThread(thread.id)
                }
            })
        }
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

    const unreadThreads = false
    const showCompose = false

    const label = searchParam.get('label') ?? 'new'

    const isNew = label === 'new'
    const isSent = label === 'sent'
    const isSpam = label === 'spam'
    const isTrash = label === 'trash'

    function selectThreadItemByCheckboxHandler(threadId: IThread['id']) {
        if (isSelected(threadId)) {
            unselectedThread(threadId)
            return
        }
        selesctThread(threadId)
    }

    const tooltipContent = isImportant
        ? 'Click to teach Scive this conversation is not important'
        : 'Click to teach Scive this conversation is important'

    function isImportantThreadHandler() {
        setIsImportant(!isImportant)
        // tagManageClick('thread_important_dashboard')
    }

    function selectThreadItemHandler(threadId: IThread['id']) {
        const foundThread = THREADS.find(thread => thread.id === threadId)
        if (!foundThread) {
            setCurrentThread(null)
            return
        }
        setCurrentThread(foundThread)

        // tagManageClick('thread_important_dashboard')
    }

    const [isPressedControl, setIsPressedControl] = useState(false)

    function selectThreadItemByKeysHandler(threadId: IThread['id']) {
        if (isSelected(threadId)) {
            unselectedThread(threadId)
            return
        }
        selesctThread(threadId)
    }

    function onKeyPress(e: KeyboardEvent) {
        e.preventDefault()
        setIsPressedControl(true)
        setTimeout(() => {
            setIsPressedControl(false)
        }, 300)
    }

    function clearThreadsStates() {
        clearSelectedThreads()
        setCurrentThread(null)
    }
    useKey('Control', onKeyPress)
    useKey('Escape', clearThreadsStates)

    return (
        <div className='grid w-full grid-cols-[220px_auto] gap-1 overflow-hidden'>
            <aside className='flex flex-col justify-start gap-2 border-r border-divider px-2 pb-6 pt-3'>
                <Typography
                    variant='body'
                    className='flex max-h-[38px] w-full flex-1 items-center justify-center !text-text-ultra-light'
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
                                        'group relative flex h-[44px] items-center justify-between gap-2 rounded-lg px-3 pr-2 transition-all duration-300 ease-in-out hover:bg-surface-hover hover:pl-4',
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
                                <Typography variant='body'>Mark all as done</Typography>
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
                </header>
                <section className='flex overflow-hidden border-t border-divider'>
                    <ul className='flex w-full flex-col gap-0.5 overflow-y-auto py-2 pr-1'>
                        {THREADS.map(thread => {
                            const metadata = thread.messages[0].metadata
                            const lastThreadMetadata = thread.messages[thread.messages.length - 1].metadata
                            const isActiveThread = currentThread?.id === thread.id

                            const isUnreadThread = thread.messages.filter(message => {
                                const unreadLabels = []
                                const labels = message.metadata.labels

                                if (labels.includes(EThreadLabels.UNREAD)) {
                                    unreadLabels.push(EThreadLabels.UNREAD)
                                }

                                return Boolean(unreadLabels.length)
                            })

                            return (
                                <li
                                    key={thread.id}
                                    className='flex min-h-12 w-full gap-2 pl-2 pr-1'
                                    onClick={
                                        isPressedControl ? () => selectThreadItemByKeysHandler(thread.id) : undefined
                                    }
                                >
                                    <ul
                                        className={cn(
                                            'flex h-12 w-full cursor-default items-center gap-2 rounded transition-all duration-300 ease-in-out hover:bg-surface-hover',
                                            {
                                                'bg-mail-selected hover:bg-message-outcoming': isActiveThread,
                                                'bg-surface-hover hover:bg-surface-hover': isSelected(thread.id),
                                                'bg-message-outcoming hover:bg-mail-selected':
                                                    isActiveThread && isSelected(thread.id)
                                            }
                                        )}
                                    >
                                        <li className='flex h-12 min-w-9 max-w-9 items-center justify-center'>
                                            <Checkbox
                                                checked={isSelected(thread.id)}
                                                onCheckedChange={() => selectThreadItemByCheckboxHandler(thread.id)}
                                            />
                                        </li>
                                        <li className='flex h-12 min-w-9 max-w-9 items-center justify-center'>
                                            <Hint side='top' label={tooltipContent} asChild>
                                                <Button
                                                    variant='clear'
                                                    size='clear'
                                                    className='h-full w-12'
                                                    onClick={isImportantThreadHandler}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='15'
                                                        height='14'
                                                        viewBox='0 0 15 14'
                                                        fill='none'
                                                    >
                                                        <path
                                                            d='M3.50749 6.47364L0.444886 1.52635C0.0324821 0.860163 0.511644 0 1.29515 0H9.29817C9.63252 0 9.94475 0.1671 10.1302 0.445298L14.1302 6.4453C14.3542 6.7812 14.3542 7.2188 14.1302 7.5547L10.1302 13.5547C9.94475 13.8329 9.63252 14 9.29817 14H1.29515C0.511642 14 0.0324822 13.1398 0.444886 12.4736L3.50749 7.52635C3.70714 7.20385 3.70714 6.79615 3.50749 6.47364Z'
                                                            fill={isImportant ? '#FDBA74' : '#D1D5DB'}
                                                        />
                                                    </svg>
                                                </Button>
                                            </Hint>
                                        </li>
                                        <li
                                            className='flex w-[calc(100%-152px)] items-center gap-2'
                                            onClick={() => selectThreadItemHandler(thread.id)}
                                        >
                                            <Typography
                                                nowrap
                                                variant={isUnreadThread ? 'label-date-bold' : 'body'}
                                                className='!text-text-black max-w-[150px] text-base-h4'
                                            >
                                                {metadata?.from_}
                                            </Typography>

                                            <Typography
                                                nowrap
                                                variant={isUnreadThread ? 'label-date-bold' : 'body'}
                                                className='!text-text-black text-base-h4'
                                            >
                                                {metadata?.subject}
                                            </Typography>

                                            <Separator className='h-[1px] w-3 border border-black' />

                                            <Typography nowrap variant='body' className='!text-text-black'>
                                                {lastThreadMetadata.snippet}
                                            </Typography>
                                        </li>
                                        <li className='flex min-w-14 items-center justify-center'>
                                            <Typography nowrap variant='label-date' className='!text-text-black'>
                                                {formattedDate(lastThreadMetadata.created_at ?? '')}
                                            </Typography>
                                        </li>
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>

                    <Separator orientation='vertical' className='mt-2 border border-black' />

                    {/* <Chat useHeader useMenu /> */}
                </section>
            </section>
        </div>
    )
}
