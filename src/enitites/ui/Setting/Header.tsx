import { LogOut } from 'lucide-react'

import { Typography } from '@/shared/components'

export const Header = () => {
    return (
        <div className='flex flex-1 bg-orange-500 p-2'>
            <div className='flex bg-slate-500'>
                <Typography className='text-base-x5 justify-between'>Title</Typography>
            </div>
            <div className='mr-0 flex items-end bg-orange-950'>
                <button className='flex items-center justify-center rounded-base-x2 p-base-x1 pr-base-x2 text-base-body2'>
                    <LogOut size={20} className='mr-2 flex' />
                    Log out
                </button>
            </div>
        </div>
    )
}
