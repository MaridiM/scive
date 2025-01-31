'use client'
import { Typography } from "@/shared/components"
import { cn } from "@/shared/utils"
import { LucideProps } from "lucide-react"
import Link from "next/link"
import { FC, ForwardRefExoticComponent, RefAttributes } from "react"



interface INavbarItem {
    title?: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	path: string 
}

export interface INavbarItemProps {
    navItem: INavbarItem
    isActive: boolean
}

export const NavbarItem:FC<INavbarItemProps>=({navItem, isActive})=>{
    const { title, icon:Icon , path} = navItem
    
   
    return(
    <li>
    <Link
        href={path}
        className={cn(
            'group relative flex items-center justify-between gap-2 rounded-lg px-3 py-2 pr-2 transition-all duration-300 ease-in-out hover:bg-surface-hover hover:pl-4',
            {
                'cursor-default bg-surface-hover pl-4 hover:bg-surface-hover': isActive
            }
        )}
    >
        <span
            className={cn(
                'absolute left-0 h-6 w-1.5 rounded-lg bg-transparent transition-all duration-300 ease-in-out',
                {
                    'bg-primary': isActive
                }
            )}
        />
        <Typography
            variant='body-list'
            className={cn(
                'flex items-center gap-3 text-base-body' /*{ 'text-button-disabled': item.disabled }*/
            )}
        >
            <Icon
                size={20}
                className={cn(
                    'stroke-[1.5px] text-black' /*{'text-text-disabled': item.disabled } */
                )}
            />
            {title}
        </Typography>
        {/* {item.countUnread && (
            <Typography
                variant='label-date'
                className={cn(
                    '!text-light-text flex h-base-x4 min-w-[16px] items-center justify-center rounded-base-x4 bg-surface-over-hover pl-[2px] pr-[2px]',
                    { 'bg-red-400 !text-white': item.isRedCounter }
                )}
            >
                {item.countUnread}
            </Typography>
        )} */}
    </Link>
    </li>

    )
}