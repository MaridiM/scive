import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/shared/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui'

const avatarSizes = cva('', {
    variants: {
        size: {
            default: 'w-base-x10 w-base-x10',
            lg: 'w-base-x12 w-base-x12'
        }
    },
    defaultVariants: {
        size: 'default'
    }
})

interface IProps extends VariantProps<typeof avatarSizes> {
    src?: string
    username?: string
}

export function UserAvatar({ size, src, username }: IProps) {
    return (
        <div className='relative'>
            <Avatar className={cn(avatarSizes({ size }))}>
                <AvatarImage src={src} className='object-cover' />
                <AvatarFallback
                    className={cn(size === 'default' && 'text-base-body1', size === 'lg' && 'text-base-h3')}
                >
                    {username ? username[0] : 'A'}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}
