export interface IMessages {
    messagesType: 'threads' | 'digests'
}
export interface IMessagePart {
    html: string | null
    parts: IMessagePart[]
    plain: string | null
    mime_type: string
}
export interface IMessageMetadata {
    cc: string[]
    id: string
    to: string[]
    bcc: string[]
    from_: string
    labels: string[]
    snippet: string | string[] | null
    subject: string
    user_id: string
    thread_id: string
    created_at: string | null
    in_reply_to: string | null
    references: string[]
    provider_message_id: string
    
}

export interface IMessage {
    metadata: IMessageMetadata
    html: string | null
    plain: string | null
    parts: IMessagePart[]
}
