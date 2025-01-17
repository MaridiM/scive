import { Search } from 'lucide-react'

import { Input } from '../ui'

export function SearchInput() {
    return (
        <div className='relative flex h-[36px] items-center'>
            <Search size={24} className='absolute left-2 z-10 stroke-gray-400' />
            <Input className='flex h-full border-none bg-gray-100 pb-[2.5px] pl-[40px]' placeholder='Search task...' />
        </div>
    )
}
