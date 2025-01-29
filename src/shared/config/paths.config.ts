export const paths = {
    home: '/',
    auth: '/auth',
    dashboard: '/dashboard',
    mailbox: (label: TMailboxPaths = 'new', id: string = ''): string =>
        `/mailbox${(id || label) && '?'}${label && `label=${label}${id && '&'}`}${id && `id=${id}`}`,
    todos: (filter: string = '', id: string = ''): string =>
        `/todos${(id || filter) && '?'}${filter && `filter=${filter}${id && '&'}`}${id && `id=${id}`}`,
    settings: (path: TSettingsPaths = 'account') => `/settings${path && '?path='}${path}`
}

export type TMailboxPaths = 'new' | 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash' | ''
export type TSettingsPaths = 'account' | 'plans' | 'billings' | 'notifications' | ''
