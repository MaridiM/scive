'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MoveDown, MoveUp, Wand2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWindowSize } from 'react-use'

import { Button, ChangeTextSize, Form, FormControl, FormField, FormItem, Hint, Input } from '@/shared/components'
import { useStore } from '@/shared/libs'
import { cn } from '@/shared/utils'

import { TGenerateComposeFormSchema, generateComposeFormSchema, maxWords, tonality } from './forms'
import { RangeSlider } from './ui'

export function GenerateMessage() {
    const form = useForm<TGenerateComposeFormSchema>({
        resolver: zodResolver(generateComposeFormSchema),
        defaultValues: {
            prompt: '',
            max_words: 0,
            tonality: 0
        }
    })

    const { width } = useWindowSize()
    const [isEmptyGeneratePromptField, setIsEmptyGeneratePromptField] = useState<boolean>(false)

    const { showChatCompose, setShowChatCompose } = useStore()

    useEffect(() => {
        const { dirtyFields } = form.formState

        const isPromptValid = dirtyFields.prompt

        isPromptValid && setIsEmptyGeneratePromptField(false)

        isEmptyGeneratePromptField && setTimeout(() => setIsEmptyGeneratePromptField(false), 3000)
    }, [form.formState, isEmptyGeneratePromptField])

    function generateComposeMessage() {
        const { dirtyFields } = form.formState
        const values = form.getValues()

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
        <Form {...form}>
            <form className='flex flex-col gap-1'>
                <div className='flex h-9 w-full items-center justify-between'>
                    <div className='flex h-9 gap-4'>
                        <FormField
                            control={form.control}
                            name='max_words'
                            render={({ field }) => (
                                <FormItem className='flex w-full min-w-[132px] max-w-[132px] flex-col items-center'>
                                    <FormControl className='m-auto w-full'>
                                        <RangeSlider
                                            {...field}
                                            labelFrom='Short'
                                            labelTo='Long'
                                            value={[field.value]}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='tonality'
                            render={({ field }) => (
                                <FormItem className='flex w-full min-w-[132px] max-w-[132px] flex-col items-center'>
                                    <FormControl className='m-auto w-full'>
                                        <RangeSlider
                                            {...field}
                                            labelFrom='Friendly'
                                            labelTo='Professional'
                                            value={[field.value]}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='flex gap-4'>
                        {width > 1440 && <ChangeTextSize />}
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
                    control={form.control}
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
