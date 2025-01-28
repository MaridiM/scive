import { format } from 'date-fns'
import dynamic from 'next/dynamic'

import { Typography, UserAvatar } from '@/shared/components'
import { IMessage } from '@/shared/types'
import { cn } from '@/shared/utils'

interface IProps {
    message: IMessage
    showAvatar: boolean
    showDate: boolean
    iAmSender: boolean
}

const Letter = dynamic(() => import('react-letter').then(mod => mod.Letter), { ssr: false })

export function Message({ message, iAmSender, showDate }: IProps) {
    return (
        <article key={message.metadata.id} className='flex flex-col gap-2'>
            {!showDate && (
                <Typography variant='body' className='w-full py-2 text-center font-medium text-text-bold'>
                    {format(message.metadata.created_at || '', 'd MMMM')}
                </Typography>
            )}

            {!iAmSender && <UserAvatar username={message.metadata.from_[0]} />}

            <div className={cn('w-fit', { 'ml-auto': iAmSender })}>
                <Letter
                    className={cn(
                        'w-fit max-w-[701] cursor-default rounded-base-x2 bg-surface-inactive p-2 text-black',
                        {
                            'bg-message-outcoming': iAmSender
                        }
                    )}
                    html={message.html ?? message.plain ?? (message.metadata.snippet as string) ?? ''}
                />
                <Typography variant='body' className={cn('pl-base-x2 pr-base-x2 text-text-light')}>
                    <Typography>{format(message.metadata.created_at || '', 'MMM d')}</Typography>
                </Typography>
            </div>
        </article>
    )
}
