export enum EMessageGenerateLength {
    short = 0,
    medium = 1,
    extended = 2,
    long = 3
}

export enum EMessageGenerateStyle {
    friendly = 0,
    approachable = 1,
    polite = 2,
    professional = 3
}

export enum EThreadLabels {
    INBOX = 'INBOX',
    SPAM = 'SPAM',
    TRASH = 'TRASH',
    UNREAD = 'UNREAD',
    STARRED = 'STARRED',
    IMPORTANT = 'IMPORTANT',
    SENT = 'SENT',
    DRAFT = 'DRAFT',
    NEW = 'NEW'
}
export enum EFilterOptions {
    'all' = 'all',
    'read' = 'read',
    'unread' = 'unread',
    'important' = 'important',
    'not important' = 'not important',
    'spam' = 'spam',
    'all not spam' = 'all not spam',
    'not spam' = 'not spam'
}