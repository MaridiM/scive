import { Suspense } from 'react'

import { MailboxScreen } from '@/screens'

export default function Mailbox() {
    return (
        <Suspense>
            <MailboxScreen />
        </Suspense>
    )
}
