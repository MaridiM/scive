'use client'

import { Mail } from 'lucide-react'
import { useState } from 'react'

import { Button, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

const digestTags = [
    { key: 'all', title: 'All' },
    { key: 'work', title: 'Work' },
    { key: 'university', title: 'University' },
    { key: 'required_actions', title: 'Required actions' },
    { key: 'other', title: 'Other' },
    {
        key: 'item_orange',
        title: 'Item Orange'
    }
]

function Dashboard() {
    const [selectedDigestTag, setSelectedDigestTag] = useState('all')
    const [counter] = useState({ count: 2, subject: 'new' })

    return (
        <div className='flex flex-1 justify-between gap-1'>
            <section className='border-devider flex w-full min-w-[460px] max-w-[640px] flex-col gap-y-1 border-r-[1px] bg-surface-inactive px-6 py-5'>
                <section className='flex max-h-[601px] min-h-[509px] flex-1 flex-col'>
                    <header className='flex items-center justify-between'>
                        <Typography variant='h3' className='text-text-light'>
                            Scive Digest AI
                        </Typography>

                        <Typography
                            variant='button-plain'
                            className={cn(
                                'flex items-center text-primary',
                                counter.subject === 'pro' && 'text-base-body3 text-white',
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

                    <section className='flex w-auto flex-row overflow-hidden py-6'>
                        <div className='flex gap-1.5'>
                            {digestTags.map(tag => {
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
                                            className={cn('text-base-body font-normal leading-7', {
                                                'text-white': selected
                                            })}
                                        >
                                            {tag.title}
                                        </Typography>
                                    </Button>
                                )
                            })}
                        </div>
                    </section>
                    <section>DIGEST LIST</section>
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
export default Dashboard
