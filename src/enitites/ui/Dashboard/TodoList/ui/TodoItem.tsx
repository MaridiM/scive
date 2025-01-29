'use client'

import { CheckCircle, Circle, Star } from 'lucide-react'

import { Button, Hint, Typography } from '@/shared/components'
import { ITodo } from '@/shared/types'
import { cn } from '@/shared/utils'

interface IProps {
    item: ITodo
    onClickDone: VoidFunction
    onClickFavorite: VoidFunction
}

export function TodoItem({ item, onClickDone, onClickFavorite }: IProps) {
    return (
        <li className='bg flex w-full flex-col items-center gap-2'>
            <div className='flex w-full items-center'>
                <Hint label='Mark completed' side='right' asChild>
                    <Button variant='clear' size='clear' className='min-h-9 min-w-9 max-w-9' onClick={onClickDone}>
                        {item.is_done ? (
                            <CheckCircle size={16} className='stroke-tooltip' />
                        ) : (
                            <Circle size={16} className='stroke-black' />
                        )}
                    </Button>
                </Hint>

                <div className='flex w-full flex-col'>
                    <Typography
                        variant='body-list'
                        className={cn('w-full text-wrap leading-6 !text-text-bold', {
                            'text-red': item.date === 'Yesterday'
                        })}
                    >
                        {item.content}
                    </Typography>
                    {item.sub_content && (
                        <Typography
                            variant='body-list'
                            className={cn('w-full text-wrap leading-6 !text-text-light', {
                                'text-red': item.date === 'Yesterday'
                            })}
                        >
                            {item.sub_content}
                        </Typography>
                    )}
                </div>

                <Button variant='clear' size='clear' className='min-h-9 min-w-9 max-w-9' onClick={onClickFavorite}>
                    <Star
                        size={20}
                        className={cn('stroke-star', {
                            'fill-star': item.is_favorite
                        })}
                    />
                </Button>
            </div>
            {item.date && (
                <div className={cn('w-fit rounded-full bg-surface-inactive px-base-x2 pb-[2px]')}>
                    <Typography variant='button-plain' className={cn('text-center !text-base-body5 text-text-light')}>
                        {item.date}
                    </Typography>
                </div>
            )}
        </li>
    )
}
