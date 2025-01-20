'use client'

import { CircleCheckBig, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button, Typography } from '@/shared/components'
import { paths } from '@/shared/config'
import { useTextSize } from '@/shared/hooks'
import { cn, parseStringToList } from '@/shared/utils'

import { DIGESTS, DIGEST_TAGS, MESSAGE_DETAILS } from '@/enitites/api'
import { Header } from '@/features'

export default function Dashboard() {
    const [readDigestItems, setRreadDigestItems] = useState<Array<string>>(['9555', '19548'])
    const [readDigestItemIds, setReadDigestItemIds] = useState<Array<number>>([])
    const [selectedDigestId, setSelectedDigestId] = useState<number | null>(null)

    const { textSize } = useTextSize()

    const [isHoveredId, setIsHoveredId] = useState<string | null>(null)

    const [refreshTimeout] = useState<number>(0)
    const [selectedDigestTag, setSelectedDigestTag] = useState('all')

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    const selectedDigestItem = (id: number) => {
        console.log('selecteDigestItem', id)

        setReadDigestItemIds(prew => [...prew, id])
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

    function markAllAsDoneHandler() {
        // tagManageClick('mark_all_as_done_dashboard')
        // readAll(allDigestThreadIds)}
        console.log('mark_all_as_done_dashboard')
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

    function digestTagsHandler(key: string) {
        setSelectedDigestTag(key)
    }

    function refreshSubmit() {
        console.log(refreshSubmit)
    }

    return (
        <div className='flex flex-1 justify-between gap-1'>
            <section className='border-devider flex min-w-[440px] flex-col gap-y-1 border-r-[1px] bg-surface-inactive px-6 py-5 desktop:max-w-[640px]'>
                <section className='flex h-full max-h-[601px] min-h-[509px] flex-col'>
                    <Header title='Scive Digest AI' counter={{ count: 2, subject: 'new' }} />

                    <section className='flex w-auto flex-1 flex-col gap-4 overflow-hidden py-2'>
                        <div className='flex flex-wrap gap-1.5'>
                            {DIGEST_TAGS.map(tag => {
                                const selected = selectedDigestTag === tag.key
                                return (
                                    <Button
                                        key={tag.key}
                                        variant='clear'
                                        className={cn('h-8 rounded-lg bg-white px-2', {
                                            'bg-black': selected
                                        })}
                                        onClick={() => digestTagsHandler(tag.key)}
                                    >
                                        <Typography
                                            variant='body'
                                            className={cn('!text-base-body1 font-normal leading-7', {
                                                'text-white': selected
                                            })}
                                        >
                                            {tag.title}
                                        </Typography>
                                    </Button>
                                )
                            })}
                        </div>

                        <section className='flex h-full flex-1 flex-col overflow-hidden'>
                            {/* <Typography variant='body' className='!text-text-ultra-light'>
                                Hello! Here you will see an Executive Summary of your new emails. Click on the number to
                                view the message each part refers to.
                            </Typography> */}

                            {/* <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                                {DIGESTS.map((item, idx) => {
                                    let part1 = DIGESTS.slice(0, Math.floor(DIGESTS.length / 3))
                                    let part2 = DIGESTS.slice(
                                        Math.floor(DIGESTS.length / 3),
                                        Math.floor((2 * DIGESTS.length) / 3)
                                    )
                                    let part3 = DIGESTS.slice(Math.floor((2 * DIGESTS.length) / 3))

                                    const isReadDigest =
                                        readDigestItemIds.includes(item.id) && selectedDigestId !== item.id
                                    const isActiveDigest = item.id === selectedDigestId
                                    const isHoverDigest = isHoveredId === String(item.id)
                                    const isHoverReadDigest = isReadDigest && isHoveredId === String(item.id)

                                    if (readDigestItems.includes(String(item.id))) return

                                    return (
                                        <li
                                            key={idx}
                                            className='relative flex min-h-fit flex-row overflow-hidden'
                                            onMouseLeave={() => setIsHoveredId(null)}
                                            onMouseEnter={() => setIsHoveredId(String(item.id))}
                                            onClick={() => digestItemHandler(item.id)}
                                        >
                                            <Typography
                                                variant='body'
                                                className={cn(
                                                    'relative mb-2 flex w-fit cursor-default flex-row overflow-hidden rounded-lg bg-white px-2 py-1 font-semibold transition-all duration-150 ease-in-out',
                                                    isHoverDigest && `bg-white !text-text-ultra-light`,
                                                    isReadDigest && 'bg-gray-200 font-normal !text-gray-400',
                                                    isHoverReadDigest && 'bg-gray-200 font-semibold !text-gray-400',
                                                    isActiveDigest && 'bg-black !text-white',

                                                    part3.includes(item) &&
                                                        `min-h-fit text-base-body2 leading-5 ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-body'
                                                                : 'desktop:text-base-body2'
                                                        }`,
                                                    part2.includes(item) &&
                                                        `min-h-fit text-base-body-digest leading-7 ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-body-digest1'
                                                                : 'desktop:text-base-body-digest'
                                                        }`,
                                                    part1.includes(item) &&
                                                        `min-h-fit text-base-body-digest1 leading-[30px] ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-h3'
                                                                : 'desktop:text-base-body-digest1'
                                                        }`
                                                )}
                                            >
                                                {item.content}
                                                {isHoverDigest && (
                                                    <Button
                                                        variant='clear'
                                                        className={cn(
                                                            'absolute left-0 top-0 flex h-full w-[32px] rounded-none bg-button px-0'
                                                        )}
                                                        onClick={() => digestItemDoneHandler(item.id)}
                                                    >
                                                        <svg
                                                            width='28px'
                                                            height='28px'
                                                            viewBox='0 0 36 36'
                                                            fill='none'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                        >
                                                            <path
                                                                d='M11.25 17.25L16.25 22.25L24.75 13.75'
                                                                stroke='#ffff'
                                                                strokeWidth='5'
                                                            />
                                                        </svg>
                                                    </Button>
                                                )}
                                            </Typography>
                                        </li>
                                    )
                                })}
                            </ul> */}

                            <Typography variant='body' className='text-base-body text-text-bold'>
                                Oops, the number of detailed report generation is over. Need more?
                                <Link
                                    href={paths.settings('plans')}
                                    className={cn('pl-2 text-black underline underline-offset-4')}
                                >
                                    Check out our plans.
                                </Link>
                                {/* <Button
                                    variant='body'
                                    className={cn(
                                        'pl-2 underline underline-offset-4',
                                        textColor.boldText,
                                        textColor.black
                                    )}
                                >
                                    Check out our plans.
                                </Button> */}
                            </Typography>
                        </section>
                    </section>

                    <footer className='m-auto flex flex-row items-center gap-4 gap-x-base-x4 self-end pb-3 pt-base-x2'>
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
                                'flex h-[36px] gap-2 bg-button px-base-x2 !text-base-body2 font-semibold tracking-tight hover:bg-button-hover',
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
                </section>

                <section className='flex flex-1 flex-col'>
                    <Header title='Message Summary' counter={{ count: 2, subject: 'pro' }} />

                    <section className='flex h-full flex-1 flex-col overflow-hidden'>
                        <Typography variant='body' className='!text-text-ultra-light'>
                            Here you will see the AI-generated details of the selected email
                        </Typography>
                        {/* <ul className='flex flex-1 flex-col overflow-y-auto'>
                            {parseStringToList(MESSAGE_DETAILS).length > 1
                                ? parseStringToList(MESSAGE_DETAILS).map((item: string, idx: number) => (
                                      <li key={idx} className='mb-0.5'>
                                          <Typography variant='body'>{item}</Typography>
                                      </li>
                                  ))
                                : MESSAGE_DETAILS}
                        </ul> */}
                    </section>
                </section>
            </section>

            <section className='border-devider min-w-[536px] flex-1 flex-grow border-x-[1px] desktop:min-w-[656px]'>
                CHAT
            </section>
            <section className='grid-row-3 border-devider grid min-w-[320px] flex-1 border-l-[1px] px-6 py-5 desktop:max-w-[480px]'>
                <section>TODO LIST</section>
                <section>TODO SUGGESTIONS</section>
                <section>
                    <Header title='Highlights' />
                    <section className='flex w-auto flex-1 flex-col gap-4 overflow-hidden py-2'>
                        <section className='flex h-full flex-1 flex-col overflow-hidden'>
                            <Typography variant='body' className='!text-text-ultra-light'>
                                Here you will see details of selected email chain
                            </Typography>

                            {/* <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                                {DIGESTS.map((item, idx) => {
                                    let part1 = DIGESTS.slice(0, Math.floor(DIGESTS.length / 3))
                                    let part2 = DIGESTS.slice(
                                        Math.floor(DIGESTS.length / 3),
                                        Math.floor((2 * DIGESTS.length) / 3)
                                    )
                                    let part3 = DIGESTS.slice(Math.floor((2 * DIGESTS.length) / 3))

                                    const isReadDigest =
                                        readDigestItemIds.includes(item.id) && selectedDigestId !== item.id
                                    const isActiveDigest = item.id === selectedDigestId
                                    const isHoverDigest = isHoveredId === String(item.id)
                                    const isHoverReadDigest = isReadDigest && isHoveredId === String(item.id)

                                    if (readDigestItems.includes(String(item.id))) return

                                    return (
                                        <li
                                            key={idx}
                                            className='relative flex min-h-fit flex-row overflow-hidden'
                                            onMouseLeave={() => setIsHoveredId(null)}
                                            onMouseEnter={() => setIsHoveredId(String(item.id))}
                                            onClick={() => digestItemHandler(item.id)}
                                        >
                                            <Typography
                                                variant='body'
                                                className={cn(
                                                    'relative mb-2 flex w-fit cursor-default flex-row overflow-hidden rounded-lg bg-white px-2 py-1 font-semibold transition-all duration-150 ease-in-out',
                                                    isHoverDigest && `bg-white !text-text-ultra-light`,
                                                    isReadDigest && 'bg-gray-200 font-normal !text-gray-400',
                                                    isHoverReadDigest && 'bg-gray-200 font-semibold !text-gray-400',
                                                    isActiveDigest && 'bg-black !text-white',

                                                    part3.includes(item) &&
                                                        `min-h-fit text-base-body2 leading-5 ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-body'
                                                                : 'desktop:text-base-body2'
                                                        }`,
                                                    part2.includes(item) &&
                                                        `min-h-fit text-base-body-digest leading-7 ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-body-digest1'
                                                                : 'desktop:text-base-body-digest'
                                                        }`,
                                                    part1.includes(item) &&
                                                        `min-h-fit text-base-body-digest1 leading-[30px] ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-h3'
                                                                : 'desktop:text-base-body-digest1'
                                                        }`
                                                )}
                                            >
                                                {item.content}
                                                {isHoverDigest && (
                                                    <Button
                                                        variant='clear'
                                                        className={cn(
                                                            'absolute left-0 top-0 flex h-full w-[32px] rounded-none bg-button px-0'
                                                        )}
                                                        onClick={() => digestItemDoneHandler(item.id)}
                                                    >
                                                        <svg
                                                            width='28px'
                                                            height='28px'
                                                            viewBox='0 0 36 36'
                                                            fill='none'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                        >
                                                            <path
                                                                d='M11.25 17.25L16.25 22.25L24.75 13.75'
                                                                stroke='#ffff'
                                                                strokeWidth='5'
                                                            />
                                                        </svg>
                                                    </Button>
                                                )}
                                            </Typography>
                                        </li>
                                    )
                                })}
                            </ul> */}
                        </section>
                    </section>
                </section>
            </section>
        </div>
    )
}
