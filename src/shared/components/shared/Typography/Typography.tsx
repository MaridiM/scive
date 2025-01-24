'use client'

import { ElementType, PropsWithChildren } from 'react'

import { useTextSize } from '@/shared/hooks'
import { cn } from '@/shared/utils'

import { ITypographyProps, TTextType, TVariant } from './Typography.types'

export function Typography({
    variant = 'body',
    className,
    nowrap = false,
    children,
    type,
    ref,
    ...props
}: PropsWithChildren<ITypographyProps>) {
    const { textSize } = useTextSize()

    const variants: Record<TVariant, string> = {
        h1: 'text-base-h1 font-medium tracking-[-0.32px]',
        h2: 'text-base-h2 font-medium',
        h3: 'text-base-h3 font-medium',
        h4: 'text-base-h4 font-medium tracking-[-0.32px]',
        'h4-bold': 'text-base-h4 font-bold tracking-[-0.32px]',
        body: `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} tracking-[-0.32px] leading-[24px]`,
        'body-bold': `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} font-bold tracking-[-0.32px] leading-[24px]`,
        'body-semibold': `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} font-semibold tracking-[-0.32px] leading-[24px]`,
        'body-link': `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} underline tracking-[-0.32px] leading-[24px]`,
        'body-list': `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} tracking-[-0.32px]`,
        'body-strike': `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} line-through leading-[24px] tracking-[-0.32px]`,
        'body-small': 'text-base-body3 leading-[24px]',
        calout: 'text-base-body1',
        caption: `${textSize === 'large' ? 'text-base-body2' : 'text-base-body4'}`,
        subheadline: 'text-base-body2',
        'button-big': 'text-base-h2 font-semibold tracking-[-0.32px]',
        'button-default': 'text-base-h4 tracking-[-0.32px]',
        'button-plain': `${textSize === 'large' ? 'text-base-body' : 'text-base-body2'} font-semibold`,
        'menu-active': 'text-base-body2 font-semibold',
        'label-date': `${textSize === 'large' ? 'text-base-body4' : 'text-base-body5'} tracking-[-0.32px]`,
        'label-date-bold': 'text-base-body5 font-bold'
    }

    function isTTextType(value: string): value is TTextType {
        return /^(span|p|div|h1|h2|h3|h4)$/.test(value)
    }

    const variantIsTag = isTTextType(variant)

    const fallback: TTextType = variantIsTag ? variant : 'span'
    const Component: ElementType = type || fallback

    return (
        <Component
            className={cn(variants[variant], nowrap && 'overflow-hidden text-ellipsis whitespace-nowrap', className)}
            {...props}
        >
            {children}
        </Component>
    )
}
