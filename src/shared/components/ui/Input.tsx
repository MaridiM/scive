import { type ComponentProps, forwardRef } from 'react'

import { cn } from '@/shared/utils'

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(({ className, type, ...props }, ref) => (
    <input
        type={type}
        className={cn(
            'flex h-10 w-full rounded-full outline-none placeholder:text-gray-400 focus-visible:border-none',
            className
        )}
        ref={ref}
        {...props}
    />
))
Input.displayName = 'Input'

export { Input }
