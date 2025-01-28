import { IMessage, IMessageMetadata, IMessagePart } from './messages.types'
import { IThread } from './threads.types'

export const tonality = ['FRIENDLY', 'NEUTRAL', 'PROFESSIONAL', 'FORMAL']
export const maxWords = [50, 150, 300, 500]

export interface IDigest {
    id: number
    user_id: number
    digest_id: number
    content: string
    messages: IMessageMetadata[]
    // messages: IDigestMessage[]
    created_at: string
    tags: string[] // !TODO
}

//* Digest Message
export interface IDigestMessage {
    metadata: IMessageMetadata
    html: string | null
    plain: string | null
    parts: IMessagePart[]
}

//* API Digest
export interface IDigestData {
    id: number
    user_id: number
    items: IDigest[]
    message_ids: string[]
    created_at: string
}

export interface IError {
    message: string
}

export interface IDigestResponse {
    data: IDigestData[] | IDigestData | null
    error: IError | null
    page_size: number
    next_page_token: string | null
}
export interface ITodoSuggestionsResponse {
    data: IDigestTodoSuggestions[]
    error: IError | null
    page_size: number
    next_page_token: string | null
}
export interface IDigestHighlightsResponse {
    data: IDigestHighlightItem[]
    error: IError | null
    page_size: number
    next_page_token: string | null
}

//* Generate Digest
export interface IGenerateDigest {
    id: number
    name: string
    status: 'PENDING' | 'SUCCESS' | 'ERROR'
    created_at: string
    updated_at: string
    parameters: {
        user_id: number
    }
    failure: string | null
    error: string | null
    result: IGenerateDigestResult | IGenerateDigestItemResult | IGenerateComposeResult
    user_id: number
}

export interface IGenerateDigestResult {
    id: number
    items: IDigest[]
    user_id: number
    created_at: string
    message_ids: string[]
}
export interface IGenerateDigestItem {
    id: number
    user_id: number
    content: string
    created_at: string
    digest_item_id: number
    messages: IMessage[]
}
export interface IGenerateThreadItemResult {
    id: number
    highlights: IThreadHightlighContent
    thread_id: string
    message_digest: IGenerateDigestItem | null
    todo_suggestions: IThreadTodoContent
    created_at: string
    user_id: number
}
export interface IGenerateDigestItemResult {
    highlights: IDigestHighlights
    digest_item_id: number
    todo_suggestions: IDigestTodoSuggestions
    digest_item_details: IGenerateDigestItem
    created_at: string
}
export interface IGenerateComposeResult {
    content: string
    created_at: string
    id: number
    prompt: string
    user_id: number
}
export interface IIGenerateDigestResponse {
    data: IGenerateDigest | null
    error: IError | null
}

export interface IDigestTodoSuggestions {
    id: number
    content: string[]
    created_at: string
    digest_item_id: number
    user_id: number
}
export interface IThreadTodoContent {
    id: string[]
    content: string[]
}
export interface IThreadHightlighContent {
    content: string[]
}
export interface IDigestHighlightsValue {
    id?: number
    thread: IThread
    content?: string[]
    user_id?: number
    created_at?: string
}

export interface IDigestHighlightItem {
    id: number
    content: string[]
    created_at: string
    thread: {
        id: string
        messages: IMessage[]
        user_id: string
    }
    user_id: string
}

export interface IDigestHighlights {
    [key: string]: IDigestHighlightsValue
}

export type TCounter = { count?: number; subject?: string }
