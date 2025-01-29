'use client'

import { Banknote, Bell, Trophy, User2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { FC, Suspense, useMemo } from 'react'
import { Billing } from '@/widgets/Settings/Billing'
import { paths } from '@/shared/config'
import { SettingsHeader } from '@/enitites/ui/Setting/SettingsHeader'
import { Navbar } from '@/features'
import { Account, Plane } from '@/widgets'




const Settings: FC = () => {
    const searchParams = useSearchParams()

    const navbar = useMemo(
        () => [
            { icon: User2, title: 'Account', path: paths.settings() },
            { icon: Trophy, title: 'Plan', path: paths.settings('plans') },
            { icon: Banknote, title: 'Billing', path: paths.settings('billings') },
            {
                icon: Bell,
                title: 'Notifications',
                path: paths.settings('notifications'),
                disabled: true
            }
        ],
        []
    )

    return (
        <div className='grid w-full grid-cols-[220px_auto] gap-1 overflow-hidden'>
            <Suspense>
                <Navbar navbar={navbar} title='Settings' path={searchParams.get('path')} />
            </Suspense>
             <section className='flex flex-col gap-2 overflow-hidden border-l border-divider px-1 pb-6 pt-3'>
                <SettingsHeader  />
                {searchParams.get('path') === 'account' && <Account />}
                {searchParams.get('path') === 'plans' && <Plane/>}
                {searchParams.get('path') === 'billings' && <Billing />}
            </section>
        </div>
    )
}
export default Settings
