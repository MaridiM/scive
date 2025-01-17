import { CSSProperties, DOMAttributes } from 'react'

export type TTextType = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type TVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h4-bold'
    | 'body'
    | 'body-bold'
    | 'body-semibold'
    | 'body-link'
    | 'body-list'
    | 'body-strike'
    | 'body-small'
    | 'calout'
    | 'caption'
    | 'subheadline'
    | 'button-big'
    | 'button-default'
    | 'button-plain'
    | 'body-strike'
    | 'menu-active'
    | 'label-date'
    | 'label-date-bold'

export interface ITypographyProps {
    variant?: TVariant
    className?: string
    nowrap?: boolean
    style?: CSSProperties
    type?: TTextType
    onLayout?: DOMAttributes<HTMLDivElement>['onLoad']
}
