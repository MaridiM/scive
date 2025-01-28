import { Star } from 'lucide-react'

import { Button, FormControl, FormItem, Input } from '@/shared/components'
import { TIcon } from '@/shared/types'
import { cn } from '@/shared/utils'

interface IProps {
    isFavoriteHandler?: VoidFunction
    isFavorite?: boolean
    isNoValidField: boolean
    className?: string
    placeholder?: string
    autoFocus?: boolean
    icon?: TIcon
}

export function AddTodoInput({
    isFavorite,
    isFavoriteHandler,
    isNoValidField,
    className,
    placeholder = 'Input text...',
    autoFocus = false,
    icon: Icon,
    ...props
}: IProps) {
    return (
        <FormItem className='flex flex-col'>
            <FormControl>
                <div className={cn('flex h-[36] w-full items-center justify-start gap-4 border-none px-2', className)}>
                    {Icon && <Icon size={20} />}
                    <Input
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        className={cn(
                            'rounded-[4px] border-[2px] border-transparent bg-transparent pl-2 !text-base-body1 font-normal text-text-bold placeholder:text-text-light',
                            {
                                'border-error bg-error-light text-error placeholder:text-error': isNoValidField
                            }
                        )}
                        {...props}
                    />
                    {isFavoriteHandler && (
                        <Button
                            variant='clear'
                            size='clear'
                            type='button'
                            className='min-h-9 min-w-9 max-w-9'
                            onClick={isFavoriteHandler}
                        >
                            <Star
                                size={20}
                                className={cn('stroke-star', {
                                    'fill-star': isFavorite
                                })}
                            />
                        </Button>
                    )}
                </div>
            </FormControl>
        </FormItem>
    )
}
