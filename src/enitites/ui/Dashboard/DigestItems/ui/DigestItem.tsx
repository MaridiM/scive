import { Button, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    content: string
    classNames: string
    className?: string
    isHoverItem: boolean
    onMouseLeave: VoidFunction
    onMouseEnter: VoidFunction
    onClickItem: VoidFunction
    onClickDone: VoidFunction
}

export function DigestItem({
    content,
    classNames,
    className,
    onMouseLeave,
    onMouseEnter,
    onClickItem,
    onClickDone,
    isHoverItem
}: IProps) {
    return (
        <li
            className='relative flex min-h-fit flex-row overflow-hidden'
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            onClick={onClickItem}
        >
            <Typography variant='body' className={cn(classNames, className)}>
                {content}
                {isHoverItem && (
                    <Button
                        variant='clear'
                        className={cn('absolute left-0 top-0 flex h-full w-[32px] rounded-none bg-button px-0')}
                        onClick={onClickDone}
                    >
                        <svg
                            width='28px'
                            height='28px'
                            viewBox='0 0 36 36'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M11.25 17.25L16.25 22.25L24.75 13.75' stroke='#ffff' strokeWidth='5' />
                        </svg>
                    </Button>
                )}
            </Typography>
        </li>
    )
}
