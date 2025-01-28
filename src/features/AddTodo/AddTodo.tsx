'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Circle, PencilLine } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useKey } from 'react-use'
import { toast } from 'sonner'

import { Form, FormField } from '@/shared/components'

import { TAddTodoFormSchema, addTodoFormSchema } from './forms'
import { AddTodoButton, AddTodoCalendar, AddTodoInput } from './ui'

export function AddTodo() {
    // Инициализация react-hook-form + zodResolver
    const form = useForm<TAddTodoFormSchema>({
        resolver: zodResolver(addTodoFormSchema),
        defaultValues: {
            content: '',
            sub_content: '',
            is_favorite: false,
            due: undefined
        }
    })

    // Локальные стейты
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [showAddTaskPopover, setShowAddTaskPopover] = useState<boolean>(false)

    // Тогглим важность задачи
    function isFavoriteAddTodoFormHandler() {
        form.setValue('is_favorite', !isFavorite)
        setIsFavorite(!isFavorite)
    }

    // Тогглим поповер
    function showAddTaskPopoverHandler() {
        setShowAddTaskPopover(!showAddTaskPopover)

        // Если закрываем поповер — сброс формы
        if (showAddTaskPopover) {
            form.reset()
        }
    }

    // Закрываем поповер и сбрасываем форму
    function cancelCreateTask() {
        setShowAddTaskPopover(false)
        form.reset()
    }

    // Сохраняем задачу (обёртка над handleSubmit)
    function createNewTask(event: globalThis.KeyboardEvent) {
        event.preventDefault()
        // handleSubmit автоматически проверит схему (Zod) и заполненность полей
        form.handleSubmit(
            data => {
                console.log('Форма валидна. Данные:', data)
                setShowAddTaskPopover(false)
                form.reset()
            },
            errors => {
                toast.error(errors.content?.message)
            }
        )()
    }

    // Закрываем по Esc
    useKey('Escape', cancelCreateTask)

    // Вызываем submit по Enter
    useKey('Enter', event => createNewTask(event))

    return (
        <section className='flex flex-col pr-1'>
            {/* Кнопка для показа/скрытия формы добавления */}
            <AddTodoButton showPopover={showAddTaskPopover} showPopoverHandler={showAddTaskPopoverHandler} />

            {showAddTaskPopover && (
                <Form {...form}>
                    <form className='flex flex-col gap-2 rounded-bl-lg rounded-br-lg bg-icon-surface pb-4 pl-4'>
                        {/* Поле Title (content) */}
                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => (
                                <AddTodoInput
                                    icon={Circle}
                                    placeholder='Title'
                                    autoFocus={true}
                                    isFavoriteHandler={isFavoriteAddTodoFormHandler}
                                    isFavorite={isFavorite}
                                    // Если у поля есть ошибка — передаём это как признак "невалидности"
                                    isNoValidField={!!form.formState.errors.content}
                                    {...field}
                                />
                            )}
                        />

                        {/* Поле Description (sub_content) */}
                        <FormField
                            control={form.control}
                            name='sub_content'
                            render={({ field }) => (
                                <AddTodoInput
                                    icon={PencilLine}
                                    placeholder='Description'
                                    className='pl-6'
                                    isNoValidField={!!form.formState.errors.sub_content}
                                    {...field}
                                />
                            )}
                        />

                        {/* Календарь (due) */}
                        <FormField
                            control={form.control}
                            name='due'
                            render={({ field }) => (
                                <AddTodoCalendar
                                    value={field.value}
                                    setValue={() => form.setValue('due', undefined)}
                                    onSelect={field.onChange}
                                />
                            )}
                        />
                    </form>
                </Form>
            )}
        </section>
    )
}
