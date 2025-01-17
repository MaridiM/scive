import Link from 'next/link'

import { paths } from '@/shared/config'

const Mailbox: React.FC = ({}) => (
    <>
        <h1>MAILBOX</h1>
        <Link href={paths.auth}>AUTH</Link>
        <Link href={paths.dashboard}>DAHSBOARD</Link>
        <Link href={paths.settings}>SETTINGS</Link>
    </>
)
export default Mailbox
