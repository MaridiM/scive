'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { cn } from '@/shared/utils'

const Slider = forwardRef<
    ComponentRef<typeof SliderPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn('relative flex w-full touch-none select-none items-center', className)}
            {...props}
        >
            <SliderPrimitive.Track className='relative mx-0.5 h-[3px] w-full grow rounded-full bg-slider'>
                <SliderPrimitive.Range className='absolute h-full bg-slider-mark-fill' />
            </SliderPrimitive.Track>
            {props.max && (
                <ul className='absolute left-0 top-1/2 z-0 flex w-full -translate-y-1/2 justify-between bg-transparent px-[2px]'>
                    {Array.from(Array(props.max! + 1).keys()).map((_, idx) => (
                        <li
                            key={idx}
                            className={cn('h-2 w-2 rounded-full bg-slider', {
                                'bg-slider-mark-fill': props.value && props.value[0] >= idx
                            })}
                        />
                    ))}
                </ul>
            )}
            <SliderPrimitive.Thumb className='z-20 block h-3.5 w-3.5 rounded-full border-2 border-slider-thumb-outline bg-slider-mark-fill focus-visible:!border-2 focus-visible:!border-slider-thumb-outline' />
        </SliderPrimitive.Root>
    )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
