'use client'

import type { LucideProps } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { cn } from '@/shared/utils'

interface IProps {
    href: string
    src?: string
    alt?: string
    icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
    className?: string
    setIsHovered?: (state: boolean) => void
}

export function SidebarItem({ href, src, alt, icon: Icon, className, setIsHovered }: IProps) {
    const pathname = usePathname()

    const isActive = href === pathname

    return (
        <Link
            onMouseEnter={() => setIsHovered?.(true)}
            onMouseLeave={() => setIsHovered?.(false)}
            href={href}
            className={cn(
                'group flex h-base-x10 w-base-x10 items-center justify-center rounded-base-x3 p-base-x2 transition-all duration-300 ease-in-out hover:bg-icon-inactive',
                {
                    'bg-black hover:bg-black': isActive
                },
                className
            )}
        >
            {src && !Icon && <Image src={src || ''} alt={alt || ''} width={24} height={24} />}
            {Icon && (
                <Icon
                    size={24}
                    className={cn('stroke-icon-inactive group-hover:stroke-black', {
                        'stroke-white group-hover:stroke-white': isActive
                    })}
                />
            )}
        </Link>
    )
}
