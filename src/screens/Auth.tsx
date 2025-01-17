'use client'

import { ListTodo, MailQuestion, MessagesSquare, Rocket, Sparkles } from 'lucide-react'

import { LoginButton, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

const blocksInfo = [
    {
        title: 'Pick What to Focus On',
        icon: MailQuestion,
        text: 'Scan emails and instantly understand what matters '
    },
    {
        title: 'Get Details When You Need',
        icon: Rocket,
        text: 'See the key points first, and expand for more details when needed'
    },
    {
        title: 'Newer Overlook Anything',
        icon: MessagesSquare,
        text: 'See emails threads like chats, with key points highlighted'
    },
    {
        title: 'Reply Faster',
        icon: Sparkles,
        text: 'Get reply suggestion and send without switching screens'
    },
    {
        title: 'Spot Crucial Tasks',
        icon: ListTodo,
        text: 'Add suggested task from emails to your To-Do List'
    }
]

export default function Auth() {
    // const { loginSync } = useAuthMutations()
    function loginSync() {
        console.log('AUTH REQUEST')
    }

    return (
        <main className='h-screen w-full pt-12'>
            <div className='flex h-full w-full items-center justify-center overflow-hidden bg-white'>
                <div className='flex flex-col justify-center'>
                    <Typography variant='h2' className='p-base-x2 text-center font-medium text-gray-900'>
                        Your Email Productivity Center. Never Leaving one page
                    </Typography>
                    <div className='mb-[111px] mt-[111px] flex max-w-[1005px] flex-wrap justify-center gap-base-x8'>
                        {blocksInfo.map(block => (
                            <section key={block.title} className='flex max-w-[312px] gap-3 py-[24px]'>
                                <block.icon
                                    size={72}
                                    className='mr-base-x3 justify-center stroke-[0.5] text-gray-900'
                                />
                                <div className='flex max-w-[227px] flex-col'>
                                    <Typography variant='h4' className='text-sky-500'>
                                        {block.title}
                                    </Typography>
                                    <Typography variant='body' className={cn('pr-6 text-base-body2 text-gray-900')}>
                                        {block.text}
                                    </Typography>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className='flex flex-col items-center gap-y-4'>
                        <LoginButton onSubmit={() => loginSync()} />
                        <Typography variant='body' className='mb-[32px] text-base-body2 text-gray-500'>
                            Scive Pro for 30 days. No credit card needed.
                        </Typography>
                    </div>
                </div>
            </div>
        </main>
    )
}
