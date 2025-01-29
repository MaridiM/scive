import { Search } from 'lucide-react'

import { cn } from '@/shared/utils'

import { Input } from '../ui'

interface IProps {
    className?: string
}

export function SearchInput({ className }: IProps) {
    return (
        <div className={cn('relative flex h-[36px] items-center', className)}>
            <Search size={24} className='absolute left-2 z-10 stroke-gray-400' />
            <Input
                className='flex h-full flex-1 border-none bg-gray-100 pb-[2.5px] pl-[40px] text-base-body2'
                placeholder='Search task...'
            />
        </div>
    )
}
