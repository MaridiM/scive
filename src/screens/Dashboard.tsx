'use client'

import { CircleCheckBig, Mail, Wand2 } from 'lucide-react'
import { useState } from 'react'

import { Button, Typography } from '@/shared/components'
import { useTextSize } from '@/shared/hooks'
import { cn } from '@/shared/utils'

import { DIGESTS, DIGEST_TAGS } from '@/enitites/api'

export default function Dashboard() {
    const [readDigestItems, setRreadDigestItems] = useState<Array<string>>(['9555', '19548'])
    const [readDigestItemIds, setReadDigestItemIds] = useState<Array<number>>([9549, 9551, 9552, 9554])
    const [selectedDigestId, setSelectedDigestId] = useState<number | null>(9548)

    const { textSize } = useTextSize()

    const [isHoveredId, setIsHoveredId] = useState<string | null>(null)

    const [refreshTimeout] = useState<number>(0)
    const [selectedDigestTag, setSelectedDigestTag] = useState('all')
    const [counter] = useState({ count: 2, subject: 'new' })

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    function markAllAsDoneHandler() {
        // tagManageClick('mark_all_as_done_dashboard')
        // readAll(allDigestThreadIds)}
        console.log('mark_all_as_done_dashboard')
    }

    function digestItemHandler() {
        // tagManageClick('digest_item_done')
        // readDigestItem(item.id, allDigestThreadIds)
        // markDigestItemAsRead(item.id)
    }

    return (
        <div className='flex flex-1 justify-between gap-1'>
            <section className='border-devider flex w-full min-w-[460px] max-w-[640px] flex-col gap-y-1 border-r-[1px] bg-surface-inactive px-6 py-5'>
                <section className='flex h-full max-h-[601px] min-h-[509px] flex-col'>
                    <header className='flex items-center justify-between py-2'>
                        <Typography variant='h3' className='text-base-h3 font-normal !text-text-light'>
                            Scive Digest AI
                        </Typography>

                        <Typography
                            variant='button-plain'
                            className={cn(
                                'flex items-center text-primary',
                                counter.subject === 'pro' && '!text-base-body3 text-white',
                                counter.subject === 'left' && 'text-black',
                                counter.count === 0 && counter.subject === 'new' && 'text-sky-200',
                                counter.subject === 'left' && counter.count === 0 && 'text-error'
                            )}
                        >
                            {counter.subject !== 'pro' && counter.count}{' '}
                            {counter.subject === 'left' || counter.subject === 'pro' ? (
                                counter.subject === 'pro' ? (
                                    counter.subject.charAt(0).toUpperCase() + counter.subject.slice(1)
                                ) : (
                                    counter.subject
                                )
                            ) : (
                                <Mail
                                    size={20}
                                    className={cn('ml-[6px] stroke-primary', {
                                        'stroke-sky-200': counter.count === 0 && counter.subject === 'new'
                                    })}
                                />
                            )}
                        </Typography>
                    </header>

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
                                        onClick={() => {
                                            setSelectedDigestTag(tag.key)
                                        }}
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
                            <ul className='flex flex-1 flex-col overflow-y-auto'>
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
                                                    `text-base-body-digest min-h-fit leading-7 ${
                                                        textSize === 'large'
                                                            ? 'desktop:text-base-body-digest1'
                                                            : 'desktop:text-base-body-digest'
                                                    }`,
                                                part1.includes(item) &&
                                                    `text-base-body-digest1 min-h-fit leading-[30px] ${
                                                        textSize === 'large'
                                                            ? 'desktop:text-base-h3'
                                                            : 'desktop:text-base-body-digest1'
                                                    }`
                                            )}
                                            onMouseLeave={() => setIsHoveredId(null)}
                                            onMouseEnter={() => setIsHoveredId(String(item.id))}
                                        >
                                            {item.content}
                                            {isHoverDigest && (
                                                <Button
                                                    variant='clear'
                                                    className={cn(
                                                        'absolute left-0 top-0 flex h-full w-[32px] rounded-none bg-button px-0'
                                                    )}
                                                    onClick={digestItemHandler}
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
                                        </li>
                                    )
                                })}
                            </ul>
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
                        >
                            <Wand2 size={20} className='stroke-black' />
                            {refreshTimeout !== 0 ? `Timeout ${formatTime(refreshTimeout || 0)}` : `Generate new`}
                        </Button>
                        {/* 
                        <Button
                            classNameText={cn(refreshCount ? text.white : 'text-red', 'ml-1')}
                            variant='button-plain'
                            icon={refreshTimeout === 0 ? 'Wand2' : undefined}
                            noMargin
                            sizeIcon={20}
                            styleOnHover='bg-button-hover'
                            strokeWidthIcon={2}
                            classNameIcon='p-base-x1'
                            colorIcon={refreshCount ? 'black' : 'red'}
                            onPress={refreshSubmit}
                        >
                            {refreshTimeout !== 0 ? `Timeout ${formatTime(refreshTimeout || 0)}` : `Generate new`}
                        </Button> */}
                    </footer>
                </section>
                <section className='flex flex-1 bg-sky-500'>MESSAGE SUMMARY</section>
            </section>

            <section className='border-devider min-w-[536px] flex-1 border-x-[1px] desktop:min-w-[656px]'>CHAT</section>
            <section className='grid-row-3 border-devider grid min-w-[320px] max-w-[481px] flex-1 border-l-[1px] px-6 py-5'>
                LEFT
            </section>
        </div>
    )
}
