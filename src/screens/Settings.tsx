'use client'


import { paths } from '@/shared/config'
import { Navbar } from '@/features'
import { FC, ForwardRefExoticComponent,  RefAttributes, Suspense } from 'react'
import { Banknote, LucideProps, Plane, Trophy, User2 } from 'lucide-react'
import { Account } from '@/widgets'
import { Billing } from '@/widgets/Settings/Billing'
import { Header } from '@/enitites/ui/Setting/Header'
import { usePathname } from 'next/navigation'



interface IProps {
    title?: string
    navbar: INavbarItem[]
    path: string 
    href:string
    
    }
    interface INavbarItem {
        title: string
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
        path: string 
        isRedCounter?: boolean
        countUnread?: number
        disabled?: boolean
        href:string
        
    }


const Settings:FC<IProps> = ({path}) => {
    const pathname = usePathname();
    const navbar = [
		{ icon: User2, title: 'Account', path: paths.settings()},
		{ icon: Trophy, title: 'Plan', path: paths.settings('plans') },
		{ icon: Banknote, title: 'Billing', path:paths.settings('billings') },
		// {
		// 	icon: Bell,
		// 	title: 'Notifications',
		// 	path: 'notifications',
		// 	disabled: true
		// }
	]

    return (
        <div className='flex bg-yellow-300'>
            
            {/* <div className='  flex'> */}
            <Suspense>
                <Navbar  navbar={navbar}  title='Settings' />
            </Suspense>
            
            {/* </div> */}
            <div className='flex-1 border-l-[1px] ml-1'>
            <Header/>
            {/* <div className='flex'> */}
            
               {path === paths.settings() && <Account/> }
                {path ===  paths.settings('plans')  && <Plane/> }
                {path === paths.settings('billings') && <Billing/> }
                
                
                {/* </div> */}
                
            </div>
        </div>
        
    )
 
}
export default Settings


// <>
        {/* <h1>SETTINGS</h1> */}
        {/* <div className='flex-row flex-1'>
        <Navbar  navbar={navbar} title='Settings' />
			{path === undefined && <Account />} 
			 {path === 'plans' && <Plan />}
			{path === 'billings' && <Billing />}
        </div>
        <Link href={paths.auth}>AUTH</Link>
        <Link href={paths.dashboard}>DAHSBOARD</Link>
        <Link href={paths.mailbox()}>MAILBOX</Link>
    </> */}