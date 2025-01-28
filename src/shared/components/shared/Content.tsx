import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { paths } from '@/shared/config'
import { cn } from '@/shared/utils'

import { Loader } from './Loader'
import { Typography } from './Typography'

interface IProps {
    showPlaceholder?: boolean
    className?: string
    placeholder?: string
    loadingText?: string
    limited?: boolean
    loading?: boolean
}

export function Content({
    children,
    placeholder,
    showPlaceholder,
    limited,
    loading,
    loadingText,
    className
}: PropsWithChildren<IProps>) {
    return (
        <section className={cn('flex flex-1 flex-col overflow-hidden', className)}>
            {!loading ? (
                <>
                    {placeholder && showPlaceholder && (
                        <Typography variant='body' className='!text-text-ultra-light'>
                            {placeholder}
                        </Typography>
                    )}
                    {!showPlaceholder && children}
                    {limited && (
                        <Typography variant='body' className='!text-text-bold'>
                            Oops, the number of detailed report generation is over. <br /> Need more?
                            <Link
                                href={paths.settings('plans')}
                                className={cn('pl-2 text-black underline underline-offset-4')}
                            >
                                Check out our plans.
                            </Link>
                        </Typography>
                    )}
                </>
            ) : (
                <Loader label={loadingText} />
            )}
        </section>
    )
}
