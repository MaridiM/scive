'use client'

import { useStore } from '@/shared/libs'
import { cn } from '@/shared/utils'

import { THREADS } from '@/enitites/api'
import { Messages } from '@/enitites/ui'
import { ChatFooter, ChatHeader, Editor, GenerateMessage, WidgetHeader } from '@/features'

interface IProps {
    useHeader?: boolean
    useMenu?: boolean
}

export function Chat({ useHeader, useMenu }: IProps) {
    const { showChatCompose } = useStore()

    return (
        <section
            className={cn('border-devider grid w-full grid-rows-[auto_64px] gap-base-x2 border-x-[1px] bg-white', {
                'grid-rows-[auto_420px]': showChatCompose === 'max',
                'border-transparent': useHeader
            })}
        >
            <section
                className={cn('flex max-h-[calc(100vh-108px)] flex-col overflow-hidden pb-2 pt-5', {
                    'grid-rows-[auto_420px]': showChatCompose === 'max',
                    'pt-0': useHeader
                })}
            >
                <ChatHeader thread={THREADS[0]} useMenu={useMenu}>
                    {!useHeader && <WidgetHeader className='px-5' title='Related Conversations' pagination />}
                </ChatHeader>
                <Messages />
            </section>

            <section className='grid grid-rows-[auto_304px] gap-1 border-t border-divider px-4 py-4'>
                {showChatCompose === 'max' ? (
                    <>
                        <GenerateMessage />
                        <Editor />
                    </>
                ) : (
                    <ChatFooter />
                )}
            </section>
        </section>
    )
}
