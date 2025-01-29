import { MoreVertical } from 'lucide-react'

import { TIcon } from '@/shared/types'
import { cn } from '@/shared/utils'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui'

interface IOptions {
    icon: TIcon
    text: string
    reverseIcon?: boolean
}

interface IProps {
    options: IOptions[]
    onClick: (value: string) => void
}

export function Menu({ options, onClick }: IProps) {
    function onClickHandler(value: string) {
        return onClick(value.toLocaleLowerCase().replace(' ', '_'))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='ml-auto flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:bg-surface-hover'>
                    <MoreVertical size={20} className='stroke-black' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align='end'>
                {options &&
                    options.map((option, idx) => (
                        <DropdownMenuItem
                            key={idx}
                            className='flex gap-3 rounded transition-colors duration-300 ease-in-out hover:bg-surface-hover'
                            onClick={() => onClickHandler(option.text)}
                        >
                            <option.icon
                                size={20}
                                className={cn('stroke-black', { 'scale-x-[-1]': option.reverseIcon })}
                            />
                            <span>{option.text}</span>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
