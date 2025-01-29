import { LogOut, LucideProps } from 'lucide-react'
import { Typography } from '@/shared/components'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'


// interface INavbarItem {
//     title?: string
//     icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
// 	path: string 
// }

// export interface INavbarItemProps {
//     navItem: INavbarItem
//     isActive: boolean
// }
export const SettingsHeader = () => {
    // const { title} = navItem
    return (
        <div className='flex justify-between '>
            <div className='flex'>
                <Typography className='text-base-h3 '>title</Typography>
            </div>
            <div className='flex'>
                <button className='flex items-center justify-center rounded-base-x2 p-base-x1 pr-base-x2 text-base-body2'>
                    <LogOut size={20} className='mr-2 flex' />
                    Log out
                </button>
            </div>
        </div>
    )
}
