import Link from 'next/link'

import { paths } from '@/shared/config'

const Settings: React.FC = () => (
    <>
        <h1>SETTINGS</h1>
        <Link href={paths.auth}>AUTH</Link>
        <Link href={paths.dashboard}>DAHSBOARD</Link>
        <Link href={paths.mailbox()}>MAILBOX</Link>
    </>
)
export default Settings
