'use client'

import { Mails } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { avatarImage, logoSidebarHoverSVG, logoSidebarInactiveSVG, logoSidebarSVG } from '@/shared/assets'
import { UserAvatar } from '@/shared/components'
import { paths } from '@/shared/config'

import { SidebarItem } from './ui/SidebarItem'

export function Sidebar() {
    const pathname = usePathname()

    const [isHovered, setIsHovered] = useState(false)

    const dashboardIcon =
        paths.dashboard === pathname ? logoSidebarSVG : isHovered ? logoSidebarHoverSVG : logoSidebarInactiveSVG

    return (
        <section className='flex w-14 flex-col items-center justify-between pb-[46px] pt-8'>
            <nav className='flex max-w-base-x10 flex-col items-center justify-center gap-2'>
                <SidebarItem href={paths.dashboard} src={dashboardIcon.src} setIsHovered={setIsHovered} />
                <SidebarItem href={paths.mailbox()} icon={Mails} />
                {/* <SidebarItem href={paths.todos()} icon={ListTodo}  /> */}
            </nav>
            <Link href={paths.settings}>
                <UserAvatar src={avatarImage.src} />
            </Link>
        </section>
    )
}
