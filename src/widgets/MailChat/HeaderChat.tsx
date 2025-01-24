import Image from 'next/image'
// import {CHAT_MESSAGES} from '@/enitites/api/chat'
import { FC, useState } from 'react'

import Important from '@/shared/assets/icons/important.svg'
import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IMessageMetadata {
    cc: never[]
    id: string
    to: string[]
    bcc: never[]
    from_: string
    labels: string[]
    snippet: string
    subject: string
    user_id: string
    thread_id: string
    created_at: string
    references: never[]
    in_reply_to: null | string
    provider_message_id: string
}

interface IMessage {
    name: string
    email: string
    subject: string
}

interface IProps {
    thread: IMessage[]
}


export const HeaderChat: FC<IProps> = ({ thread }) => {
    const [isImportant, setIsImportant] = useState(false)
    console.log('isimportant', isImportant)

    return (
        <div>
            <table className={cn('flex-col justify-between overflow-hidden border-b pt-base-x1')}>
                <tbody className={cn('bg-blue')}>
                    <tr>
                        <td>
                            <Typography>Related Conversations</Typography>
                        </td>
                        <td>
                            <Typography>1</Typography>
                        </td>
                        <td>
                            <Typography>2</Typography>
                        </td>
                    </tr>
                </tbody>

                {thread.map((item, index) => (
                    <tbody key={index} className={cn('bg-gray')}>
                        <tr>
                            <td className='w-[50px] w-full pr-[8px]'>
                                <Typography variant='button-default' className={cn('text-bold line-clamp-1')}>
                                    {item.name}
                                </Typography>
                            </td>
                            <td className='pr-[8px]'>
                                <Typography variant='calout' className='text-light-text line-clamp-1'>
                                    {item.email}
                                </Typography>
                            </td>
                            <td className='max-w-16 overflow-hidden'></td>
                            <td className={cn('min-w-fit max-w-[50px]')}>
                                <Typography variant='label-date' className={cn('max-w-[50px]')}>
                                    12:58
                                </Typography>
                            </td>
                        </tr>
                    </tbody>
                ))}

                {thread.map((item, index) => (
                    <tbody key={index} className={cn('bg-white')}>
                        <tr>
                            <td className='w-full'>
                                <Typography variant='h4' className='line-clamp-1 font-bold leading-7'>
                                    {item.subject}
                                </Typography>
                            </td>
                            <td className='mr-0 w-[36px]'>
                                <button onClick={() => setIsImportant(!isImportant)}>
                                    <Image src={Important} alt='Important Icon' />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

// className={cn('stroke-star', {
//     'fill-star': filterTodoSuggestion === 'favorite'
// })}
