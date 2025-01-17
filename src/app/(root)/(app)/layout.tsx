import { ReactNode } from 'react'

import { PageWrapper } from '@/shared/components'

import { Sidebar } from '@/features'

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <main className='flex h-screen w-full pt-9'>
            <Sidebar />
            <PageWrapper>{children}</PageWrapper>
        </main>
    )
}
