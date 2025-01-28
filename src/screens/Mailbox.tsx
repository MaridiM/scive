'use client'

import { format } from 'date-fns'
import { AlertOctagon, BellDot, File, Mail, Send, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Typography } from '@/shared/components'
import { paths } from '@/shared/config'
import { cn } from '@/shared/utils'

function Mailbox() {
    const navbar = [
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
    ]
    return (
        <div className='grid h-screen w-full grid-cols-[220px_auto] gap-1'>
            <aside className='flex flex-col justify-start gap-2 border-r border-divider px-2 pb-6 pt-3'>
                <Typography
                    variant='body'
                    className='flex max-h-[38px] w-full flex-1 items-center justify-center text-text-ultra-light'
                >
                    {format(new Date(), 'dd MMMM yyy')}
                </Typography>
                <ul className='space-y-2'>
                    {navbar.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Link
                                    href={item.path}
                                    className='flex items-center justify-between gap-2 rounded px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                                >
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
            <section className='flex flex-col gap-2 border-l border-divider bg-gray-500 px-1 pb-6 pt-3'>
                <header className='h-[38px] bg-green-500'>HEADER</header>
                <section className='flex border-t border-divider'>
                    <section className='border-r-2 border-black bg-orange-500'>THREADS</section>
                    <section className='bg-sky-500'>CHAT</section>
                </section>
            </section>
        </div>
    )
}
export default Mailbox
