'use client'

import { format } from 'date-fns'
import { LucideProps } from 'lucide-react'
import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'

import { Typography } from '@/shared/components'

import { NavbarItem } from './ui/NavbarItem'
import { cn } from '@/shared/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import path from 'path'

interface IProps {
    title?: string
    navbar: INavbarItem[]
   
}

interface INavbarItem {
    title: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    path: string 
    
//     isRedCounter?: boolean
//     countUnread?: number
//     disabled?: boolean

}

export const Navbar: FC<IProps> = ({ title, navbar}) => {
    const searchParams = useSearchParams()
    
    // const isActive = path === searchParam

    const search = searchParams.get('path')
    console.log('search', search)
    return (
                
        <div className={cn(' border-r-[1px] px-2 py-2 ')}>
            {title ? <div className='text-base-x5 ml-1 mb-4'>{title}</div> : <Typography>{format(new Date(), 'dd MMMM yyy')}</Typography>}
            <div>
                {navbar.map(item => (
                    <NavbarItem key={item.title} navItem={item}    />
                ))}
            </div>
        </div>
    )
}
