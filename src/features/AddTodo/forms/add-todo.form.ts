import { z } from 'zod'

export const addTodoFormSchema = z
    .object({
        content: z.string().optional(),
        sub_content: z.string().optional(),
        due: z.date().optional(),
        is_favorite: z.boolean().default(false)
    })
    .refine(data => (data.content?.trim().length ?? 0) > 0 || (data.sub_content?.trim().length ?? 0) > 0, {
        message: 'You must fill at least one field: Title or Description.',
        path: ['content']
        /*
        Если указать path: [] — будет глобальная ошибка (formState.errors._errors).
        Если указать path: ['content'] — ошибка «привяжется» к полю content.
        Можно выбрать любое поле — зависит от того, где удобнее её отображать.
      */
    })

export type TAddTodoFormSchema = z.infer<typeof addTodoFormSchema>
