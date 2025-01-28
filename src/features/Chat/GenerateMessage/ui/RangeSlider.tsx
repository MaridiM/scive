import { Slider } from '@/shared/components'

interface IProps {
    labelFrom: string
    labelTo: string
    value: number[]
    onChange: (value: number[]) => void
}

export function RangeSlider({ labelFrom, labelTo, value, onChange, ...props }: IProps) {
    return (
        <div className='flex flex-col w-full gap-1'>
            <div className='flex w-full justify-between'>
                <span className='text-base-body5 font-medium text-text-ultra-light'>{labelFrom}</span>
                <span className='text-base-body5 font-medium text-text-ultra-light'>{labelTo}</span>
            </div>
            <div className='relative'>
                <Slider
                    {...props}
                    defaultValue={[0]}
                    max={3}
                    min={0}
                    step={1}
                    value={value}
                    onValueChange={(value: number[]) => onChange(value)}
                />
            </div>
        </div>
    )
}
