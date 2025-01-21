'use client'

import { CircleCheckBig, Plus, Star, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button, Hint, Typography } from '@/shared/components'
import { paths } from '@/shared/config'
import { useTextSize } from '@/shared/hooks'
import { cn, parseStringToList } from '@/shared/utils'

import { DIGESTS, DIGEST_TAGS, HIGHLIGHTS, MESSAGE_DETAILS, TODO_SUGGESTIONS } from '@/enitites/api'
import { Widget } from '@/widgets'

export default function Dashboard() {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

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

    function addTodoSuggestionItemHandler() {
        console.log('todo_add_dashboard')
        // tagManageClick('todo_add_dashboard')
        //     addTask?.({
        //         id: todoSuggestions?.id,
        //         content,
        //         due: getDate(),
        //         is_favorite: isFavorite
        //     } as unknown as IUpdateTodo)
    }
    function isFavoriteTodoSuggestionItemHandler() {
        console.log('todo_add_dashboard')
        setIsFavorite(!isFavorite)
        // tagManageClick('todo_favorite_dashboard')
    }

    return (
        <div className='grid flex-1 grid-cols-[minmax(440px,640px)_minmax(556px,auto)_minmax(320px,480px)] gap-1'>
            <aside className='border-devider grid grid-rows-[1fr_auto] gap-2 border-r-[1px] bg-surface-inactive desktop:max-w-[640px]'>
                <Widget
                    className='max-h-[567px] min-h-[512px]'
                    title='Scive Digest AI'
                    counter={{ count: 2, subject: 'new' }}
                >
                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        <ul className='flex flex-wrap gap-1.5'>
                            {DIGEST_TAGS.map(tag => {
                                const selected = selectedDigestTag === tag.key
                                return (
                                    <li
                                        key={tag.key}
                                        onClick={() => digestTagsHandler(tag.key)}
                                        className={cn(
                                            'flex h-8 cursor-pointer items-center justify-center rounded-lg bg-white px-2',
                                            {
                                                'bg-black': selected
                                            }
                                        )}
                                    >
                                        <Typography
                                            variant='body'
                                            className={cn('!text-base-body font-normal leading-7', {
                                                'text-white': selected
                                            })}
                                        >
                                            {tag.title}
                                        </Typography>
                                    </li>
                                )
                            })}
                        </ul>

                        <section className='flex flex-1 flex-col overflow-hidden'>
                            {/* <Typography variant='body' className='!text-text-ultra-light'>
                                Hello! Here you will see an Executive Summary of your new emails. Click on the number to
                                view the message each part refers to.
                            </Typography> */}

                            <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
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
                            </ul>

                            {/* <Typography variant='body' className='!text-text-bold'>
                                Oops, the number of detailed report generation is over. <br /> Need more?
                                <Link
                                    href={paths.settings('plans')}
                                    className={cn('pl-2 text-black underline underline-offset-4')}
                                >
                                    Check out our plans.
                                </Link>
                            </Typography> */}
                        </section>
                    </section>

                    <footer className='flex justify-center gap-x-base-x4 pt-base-x4'>
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
                                'flex h-[36px] gap-2 bg-button px-base-x2 !text-base-body2 font-semibold tracking-tight hover:bg-button-hover laptop:min-w-[160px] desktop:min-w-[180px]',
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
                </Widget>
                <Widget
                    className='max-h-[334px] min-h-[334px]'
                    title='Message Summary'
                    counter={{ count: 2, subject: 'pro' }}
                >
                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                                Here you will see the AI-generated details of the selected email
                            </Typography> */}

                        <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                            {parseStringToList(MESSAGE_DETAILS).length > 1
                                ? parseStringToList(MESSAGE_DETAILS).map((item: string, idx: number) => (
                                      <li key={idx} className='mb-0.5'>
                                          <Typography variant='body'>{item}</Typography>
                                      </li>
                                  ))
                                : MESSAGE_DETAILS}
                        </ul>
                    </section>
                </Widget>
            </aside>

            <section className='border-devider grid grid-rows-[auto_minmax(100px,334px)] gap-base-x2 border-x-[1px] bg-white desktop:min-w-[656px]'>
                <section className='flex flex-col bg-green-900'>CHAT</section>
                <section className='flex flex-col bg-orange-900'>EDITOR</section>
            </section>

            <aside className='border-devider grid grid-rows-[1fr_auto_auto] gap-2 border-l-[1px] bg-white desktop:max-w-[480px]'>
                <Widget className='flex flex-col bg-red-300' title='To-Do list'>
                    <section className='flex flex-col bg-green-900'>CHAT</section>
                    <section className='flex flex-col bg-sky-900'>CHAT</section>
                    <section className='flex flex-col bg-orange-900'>CHAT</section>
                </Widget>
                <Widget className='max-h-[120px] min-h-[120px]'>
                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                            Here you can add important things from executive summary to your tasks
                        </Typography> */}

                        <ul className='flex flex-1 flex-col gap-1 overflow-y-auto pr-1'>
                            {TODO_SUGGESTIONS.content.map((item: string, idx: number) => (
                                <li key={idx} className='flex items-center'>
                                    <Hint side='right' label='Add to To-Do list'>
                                        <Button
                                            variant='clear'
                                            className='p-base-x2'
                                            onClick={addTodoSuggestionItemHandler}
                                        >
                                            <Plus size={32} className='stroke-sky-400' />
                                        </Button>
                                    </Hint>
                                    <Typography variant='body-list' className={cn('flex-grow !text-sky-400')}>
                                        {item}
                                    </Typography>
                                    <Button variant='clear' onClick={isFavoriteTodoSuggestionItemHandler}>
                                        <Star
                                            size={20}
                                            className={cn('stroke-star', {
                                                'fill-star': isFavorite
                                            })}
                                        />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </Widget>

                <Widget className='max-h-[334px] min-h-[334px]' title='Highlights'>
                    <section className='flex flex-col overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                            Here you will see the AI-generated details of the selected email
                        </Typography> */}

                        <ul className='mr-2 flex max-h-[236px] flex-col gap-1 overflow-y-auto pl-4 pr-2'>
                            {HIGHLIGHTS['193922fe5724824d'].content.map((highlight: string, idx: number) => (
                                <li key={idx} className='mb-0.5'>
                                    <Typography variant='body' className={cn('leading-7 !text-text-bold')}>
                                        {idx + 1}. {highlight}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </section>
                </Widget>
            </aside>
        </div>
    )
}
