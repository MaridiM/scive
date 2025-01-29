'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

interface IProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    checkState: 'all' | 'some' | null
}

const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, IProps>(
    ({ className, checkState, ...props }, ref) => (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'peer flex h-9 w-9 shrink-0 items-center justify-center rounded-lg p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        >
            <div className={cn('flex h-4 w-4 items-center justify-center rounded-[4px] border-2 border-gray-500')}>
                <CheckboxPrimitive.Indicator>
                    {checkState === 'all' && <Check className='h-3.5 w-3.5' />}
                    {checkState === 'some' && <Minus className='h-4 w-4' />}
                </CheckboxPrimitive.Indicator>
            </div>
        </CheckboxPrimitive.Root>
    )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
