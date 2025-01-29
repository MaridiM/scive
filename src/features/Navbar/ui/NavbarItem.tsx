'use client'
import { Typography } from "@/shared/components"
import { paths } from "@/shared/config"
import { LucideProps, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import { useSearchParam } from "react-use"


interface INavbarItem {
    title?: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	path: string 
	// isRedCounter?: boolean
	// countUnread?: number
	// disabled?: boolean
    
}

export interface INavbarItemProps {
    navItem: INavbarItem
    
    // title: string
    // path: string
    
}

export const NavbarItem:FC<INavbarItemProps>=({navItem})=>{
    const { title, icon:Icon , path} = navItem
    // const searchParams = useSearchParams()
    // console.log('searchParam', searchParams)
    // console.log('path', path)
    // // const isActive = path === searchParam

    // const search = searchParams.get('path')
    // console.log('href', href)
    
    return(
        <div className='bg-slate-400 w-[220px] flex-row py-1 px-2 justify-between items-center rounded-base-x2 mb-2'>
        {/* <Link href={paths.settings()} className='flex '> */}
        <Link href={path} className='flex '>
        <Icon width='35px'
         height='35px' className='flex p-2 justify-between items-center  '/>
        <Typography 
        className='flex text-base-h4 justify-between items-center '>{title}</Typography>
       </Link>
        </div>
    )
}