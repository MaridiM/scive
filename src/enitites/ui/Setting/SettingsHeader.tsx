import { LogOut} from 'lucide-react'
import { Button, Typography } from '@/shared/components'



export interface IPropsHeader{
    title: string
}
export const SettingsHeader = ({title}: IPropsHeader) => {
    
    return (
        <div className='flex justify-between '>
            <div className='flex'>
                <Typography className='text-base-h3 '>{title}</Typography>
            </div>
            <div className='flex'>
                <Button variant={'clear'} size={'clear'} 
                 className='flex w-[100px] h-[44px] items-center justify-center rounded-base-x2 p-base-x1 pr-base-x2 text-gray-900  hover:bg-gray-100'>
                    <LogOut size={20} className='mr-2 flex' />
                    <Typography variant='body' className=' flex !text-gray-900'>Log out</Typography>
                   
                </Button>
            </div>
        </div>
    )
}
