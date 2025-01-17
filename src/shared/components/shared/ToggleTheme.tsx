'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { themeDarkSVG, themeLightSVG } from '@/shared/assets'

import { Button } from '../ui'

export function ToggleTheme() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // Возвращаем null на сервере, чтобы избежать ошибки SSR

    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Image src={theme === 'dark' ? themeDarkSVG : themeLightSVG} alt={theme as string} />
        </Button>
    )
}
