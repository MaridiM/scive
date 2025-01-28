export interface ITodo {
    id: number
    user_id: number
    // parent_id: number | null // TODO
    content: string
    sub_content: string // TODO
    is_done: boolean
    is_favorite: boolean // TODO
    due: string | null // TODO
    date?: string | null // * Custom
    created_at: string
    updated_at: string
    // subtasks: ITodo[] // TODO
}

export interface IUpdateTodo {
    // parent_id: number | null // TODO
    content: string
    // sub_content: string // TODO
    // due: string | null // TODO
    is_done: boolean
    is_favorite: boolean // TODO
}

export interface IAddTodoForm {
    content: string
    sub_content: string // TODO
    due: string | null // TODO
    is_favorite: boolean // TODO
    is_done: boolean
    // parent_id: number | null // TODO
}
export type TAddTodoFormValue = keyof IAddTodoForm

export interface ErrorResponse {
    message: string
}

export interface ITodoResponse {
    data: ITodo[] | ITodo | null
    error: ErrorResponse
    page_size?: number
    next_page_token?: string
}

export enum ETodoDropdownFilters {
    'all' = 'all',
    'none' = 'none',
    'expired' = 'expired',
    'important' = 'important',
    'not important' = 'not important',
}