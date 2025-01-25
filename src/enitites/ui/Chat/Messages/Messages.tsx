'use client'

import { format } from 'date-fns'
import { useEffect, useRef } from 'react'

import { useStore } from '@/shared/libs'
import { cn } from '@/shared/utils'

import { Message } from './ui'
import { CHAT_MESSAGES } from '@/enitites/api'

export function Messages() {
    const messagesRef = useRef<HTMLDivElement | null>(null)

    const { showChatCompose } = useStore()

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [CHAT_MESSAGES[0].messages])

    return (
        <section
            ref={messagesRef}
            className={cn('flex max-h-[679px] flex-col gap-6 overflow-y-auto overflow-x-hidden px-4 py-5', {
                'max-h-[323px]': showChatCompose === 'max'
            })}
        >
            {CHAT_MESSAGES[0].messages.map((message, idx) => {
                const iAmSender = message.metadata.from_ === 'dmytro.marynenko@scive.ai'

                const formatMessageGroup =
                    idx > 0 &&
                    format(message.metadata.created_at, 'd MMMM') ===
                        format(CHAT_MESSAGES[0].messages[idx - 1].metadata.created_at || '', 'd MMMM')

                return (
                    <Message
                        key={message.metadata.id}
                        message={message}
                        showAvatar={!iAmSender}
                        showDate={formatMessageGroup}
                        iAmSender={iAmSender}
                    />
                )
            })}
        </section>
    )
}
