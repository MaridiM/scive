'use client'

import { format } from 'date-fns'
import { LucideProps } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, ForwardRefExoticComponent, RefAttributes, useEffect } from 'react'

import { Typography } from '@/shared/components'
import { paths } from '@/shared/config'
import { cn } from '@/shared/utils'

import { NavbarItem } from './ui/NavbarItem'

interface IProps {
    title?: string
    navbar: INavbarItem[]
    path: string | null
}

interface INavbarItem {
    title: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    path: string
}

export const Navbar: FC<IProps> = ({ title, navbar, path }) => {
    // const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        !path && router.push(paths.settings())
    }, [path, router])

    return (
        <div className={cn('border-r-[1px] px-2 py-2 text-base-h3 text-gray-900')}>
            {title ? (
                <Typography className='mb-4 ml-1 flex text-base-h3'>{title}</Typography>
            ) : (
                <Typography>{format(new Date(), 'dd MMMM yyy')}</Typography>
            )}
            <ul>
                {navbar.map(item => {
                    const isActive = item.path.includes(path ?? '')
                    return <NavbarItem key={item.title} navItem={item} isActive={isActive} />
                })}
            </ul>
        </div>
    )
}
