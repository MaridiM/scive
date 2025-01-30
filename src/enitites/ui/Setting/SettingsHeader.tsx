import { LogOut, LucideProps } from 'lucide-react'
import { Button, Typography } from '@/shared/components'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'



export const SettingsHeader = () => {
    
    return (
        <div className='flex justify-between '>
            <div className='flex'>
                <Typography className='text-base-h3 '>title</Typography>
            </div>
            <div className='flex'>
                <Button variant={'clear'} size={'clear'} 
                 className='flex w-[100px] h-[44px] items-center justify-center rounded-base-x2 p-base-x1 pr-base-x2 text-gray-900  hover:bg-gray-100'>
                    <LogOut size={20} className='mr-2 flex' />
                    <Typography className=' flex  text-base-body2'>Log out</Typography>
                   
                </Button>
            </div>
        </div>
    )
}
