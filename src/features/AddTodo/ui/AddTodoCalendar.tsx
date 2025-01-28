'use client'

import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { useState } from 'react'

import { Button, Calendar, FormControl, FormItem, Popover, PopoverContent, PopoverTrigger } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    value?: Date
    setValue: VoidFunction
    onSelect: (date?: Date) => void
}

export function AddTodoCalendar({ value, setValue, onSelect }: IProps) {
    const [showPopoverCalendar, setShowPopoverCalendar] = useState<boolean>(false)
    return (
        <FormItem className='flex flex-col'>
            <FormControl>
                <Popover open={showPopoverCalendar} onOpenChange={() => setShowPopoverCalendar(!showPopoverCalendar)}>
                    <div className='flex gap-2 pr-2'>
                        <PopoverTrigger asChild className='w-full'>
                            <div className='text-text-bold1 flex h-9 cursor-pointer items-center gap-4 pl-6 pr-2'>
                                <CalendarIcon size={24} className='stroke-black stroke-[1.5px]' />
                                <span
                                    className={cn('w-full pl-1 !text-base-body1 font-normal text-text-light', {
                                        'text-text-bold': value
                                    })}
                                >
                                    {value ? format(value, 'MM.dd.yyyy') : 'Pick a date'}
                                </span>
                            </div>
                        </PopoverTrigger>
                        {value && (
                            <Button
                                variant='clear'
                                size='clear'
                                className='flex min-h-9 min-w-9 max-w-9 items-center justify-center hover:bg-surface-hover'
                                onClick={setValue}
                            >
                                <X size={20} className='stroke-black' />
                            </Button>
                        )}
                    </div>
                    <PopoverContent align='start' className='w-auto p-0'>
                        <Calendar
                            mode='single'
                            selected={value}
                            onSelect={date => {
                                onSelect(date)
                                setShowPopoverCalendar(!showPopoverCalendar)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </FormControl>
        </FormItem>
    )
}
