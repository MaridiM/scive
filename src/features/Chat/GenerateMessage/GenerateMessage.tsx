'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MoveDown, MoveUp, Wand2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWindowSize } from 'react-use'
import { z } from 'zod'

import { Button, Form, FormControl, FormField, FormItem, Hint, Input, Slider, Typography } from '@/shared/components'
import { useTextSize } from '@/shared/hooks'
import { useStore } from '@/shared/libs'
import { cn } from '@/shared/utils'

export const generateComposeFormSchema = z.object({
    prompt: z.string().min(1),
    max_words: z.number().default(0),
    tonality: z.number().default(0)
})

export type TGenerateComposeFormSchema = z.infer<typeof generateComposeFormSchema>

const tonality = ['FRIENDLY', 'NEUTRAL', 'PROFESSIONAL', 'FORMAL']
const maxWords = [50, 150, 300, 500]

export function GenerateMessage() {
    const generateComposeForm = useForm<TGenerateComposeFormSchema>({
        resolver: zodResolver(generateComposeFormSchema),
        defaultValues: {
            prompt: '',
            max_words: 0,
            tonality: 0
        }
    })

    const { showChatCompose, setShowChatCompose } = useStore()

    const { width } = useWindowSize()
    const { textSize, large, small } = useTextSize()
    const [isEmptyGeneratePromptField, setIsEmptyGeneratePromptField] = useState<boolean>(false)

    function changeTextSise(textSize: 'large' | 'small') {
        textSize === 'large' && large()
        textSize === 'small' && small()
        // tagManageClick(`compose_text_size_${textSize}`)
    }

    useEffect(() => {
        const { dirtyFields } = generateComposeForm.formState

        const isPromptValid = dirtyFields.prompt

        isPromptValid && setIsEmptyGeneratePromptField(false)

        isEmptyGeneratePromptField && setTimeout(() => setIsEmptyGeneratePromptField(false), 3000)
    }, [generateComposeForm.formState, isEmptyGeneratePromptField])

    function generateComposeMessage() {
        const { dirtyFields } = generateComposeForm.formState
        const values = generateComposeForm.getValues()

        const isPromptValid = dirtyFields.prompt

        if (isPromptValid) {
            const prompt = {
                ...values,
                max_words: maxWords[values.max_words],
                tonality: tonality[values.tonality]
            }
            console.log('prompt', prompt)
            setIsEmptyGeneratePromptField(false)
        } else {
            setIsEmptyGeneratePromptField(!isPromptValid)
        }
    }

    function showChatComposeHandler() {
        setShowChatCompose(showChatCompose === 'max' ? 'min' : 'max')
        // tagManageClick('compose_move_up_down')
        // setChatType(type)
    }
    return (
        <Form {...generateComposeForm}>
            <form className='flex flex-col gap-1'>
                <div className='flex h-9 w-full items-center justify-between'>
                    <div className='flex h-9 gap-4'>
                        <FormField
                            control={generateComposeForm.control}
                            name='max_words'
                            render={({ field }) => (
                                <FormItem className='flex w-full min-w-[132px] max-w-[132px] flex-col items-center'>
                                    <FormControl className='m-auto w-full'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex w-full justify-between'>
                                                <span className='text-base-body5 font-medium text-text-ultra-light'>
                                                    Short
                                                </span>
                                                <span className='text-base-body5 font-medium text-text-ultra-light'>
                                                    Long
                                                </span>
                                            </div>
                                            <div className='relative'>
                                                <Slider
                                                    {...field}
                                                    defaultValue={[0]}
                                                    max={3}
                                                    min={0}
                                                    step={1}
                                                    value={[field.value]}
                                                    onValueChange={(value: number[]) => (
                                                        field.onChange(value), console.log(value)
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={generateComposeForm.control}
                            name='tonality'
                            render={({ field }) => (
                                <FormItem className='flex w-full min-w-[132px] max-w-[132px] flex-col items-center'>
                                    <FormControl className='m-auto w-full'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex w-full justify-between'>
                                                <span className='text-base-body5 font-medium text-text-ultra-light'>
                                                    Friendly
                                                </span>
                                                <span className='text-base-body5 font-medium text-text-ultra-light'>
                                                    Professional
                                                </span>
                                            </div>
                                            <div className='relative'>
                                                <Slider
                                                    {...field}
                                                    defaultValue={[0]}
                                                    max={3}
                                                    min={0}
                                                    step={1}
                                                    value={[field.value]}
                                                    onValueChange={(value: number[]) => (
                                                        field.onChange(value), console.log(value)
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='flex gap-4'>
                        {width > 1440 && (
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
                        )}
                        <Hint side='top' label={showChatCompose === 'max' ? 'Minimize' : 'Expand'} asChild>
                            <Button
                                variant='clear'
                                size='clear'
                                className='flex h-base-x9 w-base-x9 items-center justify-center rounded-base-x2 transition-all duration-300 ease-in-out hover:bg-surface-hover'
                                onClick={showChatComposeHandler}
                            >
                                {showChatCompose === 'max' ? (
                                    <MoveDown size={20} className='stroke-black' />
                                ) : (
                                    <MoveUp size={20} className='stroke-black' />
                                )}
                            </Button>
                        </Hint>
                    </div>
                </div>

                <FormField
                    control={generateComposeForm.control}
                    name='prompt'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col items-center'>
                            <FormControl className='w-full'>
                                <div className='flex h-[36] w-full items-center justify-start gap-4 border-none text-base-body'>
                                    <Input
                                        className={cn(
                                            'h-9 w-full rounded-[4px] border-[2px] border-transparent bg-transparent px-3 text-base-body text-text-bold outline-none placeholder:text-text-disabled',
                                            {
                                                'border-error bg-error-light text-error placeholder:text-error':
                                                    isEmptyGeneratePromptField
                                            }
                                        )}
                                        autoCapitalize='none'
                                        autoFocus={true}
                                        placeholder='Ask AI to write answer...'
                                        {...field}
                                    />
                                    <Hint label='Generate' side='top' asChild>
                                        <Button
                                            variant='clear'
                                            size='clear'
                                            onClick={generateComposeMessage}
                                            className='group h-9 w-9 items-center justify-center rounded-none'
                                        >
                                            <Wand2
                                                size={24}
                                                className='stroke-black stroke-2 transition-all duration-300 ease-in-out group-hover:stroke-button'
                                            />
                                        </Button>
                                    </Hint>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
