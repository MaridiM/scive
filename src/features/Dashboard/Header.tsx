import { Mail } from 'lucide-react'

import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

import { ICounterDashboard } from './Dashboard.types'

interface IProps {
    title: string
    counter?: ICounterDashboard
}

export function Header({ title, counter }: IProps) {
    return (
        <header
            className={cn('flex cursor-default items-center py-2', {
                'justify-between': counter?.subject === 'new'
            })}
        >
            <Typography variant='h3' className='text-base-h3 font-normal !text-text-light'>
                {title}
            </Typography>

            {counter && (
                <div
                    className={cn(
                        'items-center justify-center rounded-full px-base-x3 py-base-x1',
                        counter.subject === 'pro' && 'ml-2 bg-black',
                        counter.subject === 'new' && counter.count === 0 && 'bg-surface-inactive',
                        counter.subject === 'left' && counter.count === 0 && 'bg-white'
                    )}
                >
                    <Typography
                        variant='button-plain'
                        className={cn(
                            'flex items-center !text-base-body2 text-primary',
                            counter?.subject === 'pro' && '!text-base-body4 text-white',
                            counter?.subject === 'left' && 'text-black',
                            counter?.count === 0 && counter.subject === 'new' && 'text-sky-200',
                            counter?.subject === 'left' && counter.count === 0 && 'text-error'
                        )}
                    >
                        {counter?.subject !== 'pro' && counter?.count}{' '}
                        {counter?.subject === 'left' || counter?.subject === 'pro' ? (
                            counter?.subject === 'pro' ? (
                                counter?.subject.charAt(0).toUpperCase() + counter.subject.slice(1)
                            ) : (
                                counter?.subject
                            )
                        ) : (
                            <Mail
                                size={20}
                                className={cn('ml-[6px] stroke-primary', {
                                    'stroke-sky-200': counter?.count === 0 && counter.subject === 'new'
                                })}
                            />
                        )}
                    </Typography>
                </div>
            )}
        </header>
    )
}
