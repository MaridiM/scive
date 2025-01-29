

export const paths = {
    home: '/',
    auth: '/auth',
    dashboard: '/dashboard',
    mailbox: (label: string = '', id: string = ''): string =>
        `/mailbox${(id || label) && '?'}${label && `label=${label}${id && '&'}`}${id && `id=${id}`}`,
    todos: (filter: string = '', id: string = ''): string =>
        `/todos${(id || filter) && '?'}${filter && `filter=${filter}${id && '&'}`}${id && `id=${id}`}`,
    settings: (path: 'plans' | 'billings' | 'notifications' |'' = '') => `/settings${path && '?path='}${path}`
}
export type TPaths = keyof typeof paths