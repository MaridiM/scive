'use client'

import { Button, Hint, Typography } from '@/shared/components'
import { useTextSize } from '@/shared/hooks'
import { cn } from '@/shared/utils'

export function ChangeTextSize() {
    const { textSize, large, small } = useTextSize()

    function changeTextSise(textSize: 'large' | 'small') {
        textSize === 'large' && large()
        textSize === 'small' && small()
        // tagManageClick(`compose_text_size_${textSize}`)
    }

    return (
        <div className='flex gap-2'>
            <Hint side='top' label='Small' asChild>
                <Button
                    variant='clear'
                    size='clear'
                    onClick={() => changeTextSise('small')}
                    className={cn(
                        'flex h-[36px] w-[36px] items-center justify-center rounded-base-x2 transition-all duration-300 ease-in-out',
                        { 'bg-surface-hover': textSize === 'small' }
                    )}
                >
                    <Typography variant='body' className='!text-base-body2 font-normal text-black'>
                        Aa
                    </Typography>
                </Button>
            </Hint>
            <Hint side='top' label='Large' asChild>
                <Button
                    variant='clear'
                    size='clear'
                    onClick={() => changeTextSise('large')}
                    className={cn(
                        'flex h-[36px] w-[36px] items-center justify-center rounded-base-x2 transition-all duration-300 ease-in-out',
                        { 'bg-surface-hover': textSize === 'large' }
                    )}
                >
                    <Typography variant='h4' className='font-normal !text-black'>
                        Aa
                    </Typography>
                </Button>
            </Hint>
        </div>
    )
}
