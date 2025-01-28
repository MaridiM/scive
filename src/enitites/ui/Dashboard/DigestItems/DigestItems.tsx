'use client'

import { useState } from 'react'

import { Content } from '@/shared/components'
import { useTextSize } from '@/shared/hooks'
import { cn } from '@/shared/utils'

import { DigestItem } from './ui'
import { DIGESTS } from '@/enitites/api'

export function DigestItems() {
    const [readDigestItems] = useState<Array<string>>(['9555', '19548'])
    const [readDigestItemIds, setReadDigestItemIds] = useState<Array<number>>([])
    const [selectedDigestId, setSelectedDigestId] = useState<number | null>(null)

    const { textSize } = useTextSize()

    const [isHoveredId, setIsHoveredId] = useState<string | null>(null)

    function selectedDigestItem(id: number) {
        console.log('selecteDigestItem', id)

        setReadDigestItemIds(prev => [...prev, id])
        setSelectedDigestId(id)

        // if (!selectMessage) return

        // selectMessage(id)
        // setChatType('chat_dashboard')
        // fetchFirstDigestThread(id)
        // setReadDigestItemIds(id)
        // ()

        // clearSendMessageForm()
        // clearComposePrompt()
        // setCreateDraft(true)
    }
    function digestItemHandler(id: number) {
        selectedDigestItem(id)
        // tagManageClick('digest_item')
        console.log(id)
    }

    function digestItemDoneHandler(id: number) {
        // tagManageClick('digest_item_done')
        // readDigestItem(id, allDigestThreadIds)
        // markDigestItemAsRead(id)
        console.log('digest_item_done', id)
    }
    return (
        <Content
            placeholder='Hello! Here you will see an Executive Summary of your new emails. Click on the number to view the message each part refers to.'
            showPlaceholder={!DIGESTS.length}
            loadingText='Fetching digests list'
            // loadingText='Refresh digests list'
            loading={false}
        >
            <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                {DIGESTS.map((item) => {
                    const part1 = DIGESTS.slice(0, Math.floor(DIGESTS.length / 3))
                    const part2 = DIGESTS.slice(Math.floor(DIGESTS.length / 3), Math.floor((2 * DIGESTS.length) / 3))
                    const part3 = DIGESTS.slice(Math.floor((2 * DIGESTS.length) / 3))

                    const isReadDigest = readDigestItemIds.includes(item.id) && selectedDigestId !== item.id
                    const isActiveDigest = item.id === selectedDigestId
                    const isHoverDigest = isHoveredId === String(item.id)
                    const isHoverReadDigest = isReadDigest && isHoveredId === String(item.id)

                    if (readDigestItems.includes(String(item.id))) return

                    const classNames = cn(
                        'relative mb-2 flex w-fit cursor-default flex-row overflow-hidden rounded-lg bg-white px-2 py-1 font-semibold transition-all duration-150 ease-in-out',
                        isHoverDigest && `bg-white !text-text-ultra-light`,
                        isReadDigest && 'bg-gray-200 font-normal !text-gray-400',
                        isHoverReadDigest && 'bg-gray-200 font-semibold !text-gray-400',
                        isActiveDigest && 'bg-black !text-white',

                        part3.includes(item) &&
                            `min-h-fit text-base-body2 leading-5 ${
                                textSize === 'large' ? 'desktop:text-base-body' : 'desktop:text-base-body2'
                            }`,
                        part2.includes(item) &&
                            `min-h-fit text-base-body-digest leading-7 ${
                                textSize === 'large'
                                    ? 'desktop:text-base-body-digest1'
                                    : 'desktop:text-base-body-digest'
                            }`,
                        part1.includes(item) &&
                            `min-h-fit text-base-body-digest1 leading-[30px] ${
                                textSize === 'large' ? 'desktop:text-base-h3' : 'desktop:text-base-body-digest1'
                            }`
                    )

                    return (
                        <DigestItem
                            key={item.id}
                            content={item.content}
                            classNames={classNames}
                            isHoverItem={isHoverDigest}
                            onClickItem={() => digestItemHandler(item.id)}
                            onClickDone={() => digestItemDoneHandler(item.id)}
                            onMouseLeave={() => setIsHoveredId(null)}
                            onMouseEnter={() => setIsHoveredId(String(item.id))}
                        />
                    )
                })}
            </ul>
        </Content>
    )
}
