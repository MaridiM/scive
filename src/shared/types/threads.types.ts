import { IMessage, IMessageMetadata } from "./messages.types"

// * Threads
export interface IThread {
    length?: number
    user_id?: string
    id: string
    messages: IMessage[]
    draft_id?: string | null
    isDraft?: boolean
    isCompose?: boolean
}
export interface IDraft {
    id: string
    message: IMessage
}


export type TThreadLabels = 'INBOX' | 'SPAM' | 'TRASH' | 'UNREAD' | 'STARRED' | 'IMPORTANT' | 'SENT' | 'DRAFT' | 'NEW'
export interface IUpdateLabelsData {
    message_ids: string[]
    thread_ids: string[]
    add: string[]
    remove: string[]
}
export interface IGetThreadResponse {
    data: IThread | IThread[] | IDraft | IDraft[] | null
    error: {
        message: string
    }
    page_size: number
    next_page_token: string
}

// * Send message

export interface ISendMessage {
    to: string[]
    from: string
    cc: string[]
    bcc: string[]
    in_reply_to: string | null
    subject: string
    html: string
    thread_id: string
}
export interface IThreadMessageData {
    metadata: IMessageMetadata
    raw: string
    html: string
    plain: string
    parts: [
        {
            mime_type: string
            raw: string
            plain: string
            html: string
            parts: string[]
        }
    ]
}
export interface ISendMessageResponse {
    data: IMessage
    error: {
        message: string
    }
}
export interface IDraftResponse {
    data: IDraft
    error: {
        message: string
    }
}


// * Generate Message
export interface ISendGenerateMessage {
    prompt: string
    length: EMessageGenerateLength | string
    style: EMessageGenerateStyle | string
    msgs_ids?: number[]
}
export interface ISendGenerateMessageResponse {
    text: string
}