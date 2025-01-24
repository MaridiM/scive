import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

export function RelatedConversation() {
    // const { text, color, bg, border: { deviderColor} } = useColors()

    // const {tagManageClick} = useGoogleAnalytic()
    // const { fetchDigestThread } = useApiGetThread()
    const [activeArrow, setActiveArrow] = useState<'prew' | 'next' | 'all' | ''>('')

    // const {
    //     currentThread,
    //     uniqueThreadIds,
    //     setChangeCurrentThread,
    //     clearSendMessageForm,
    //     clearComposePrompt,
    //     setCreateDraft
    // } = useStore()

    const checkCurrentConversation = (current: number, count: number) => {
        if (current === 0 && count === 0) return setActiveArrow('')
        if (current === 1 && count === 1) return setActiveArrow('')
        if (current === 1) return setActiveArrow('next')
        if (current === count) return setActiveArrow('prew')

        return setActiveArrow('all')
    }

    // useEffect(() => {
    //     checkCurrentConversation(currentThread, uniqueThreadIds.length)
    // }, [currentThread, uniqueThreadIds])

    // const handleChangeThreads = (arrowState: any) => {
    //     setChangeCurrentThread(arrowState)
    //     fetchDigestThread()

    //     clearSendMessageForm()
    //     clearComposePrompt()
    //     setCreateDraft(true)
    // }

    return (
        <div className={cn('max-h-[48px] flex flex-row justify-between  items-center border-b border-divider-light')}>
            <Typography variant='h3' className={cn('text-gray-400')}>
                Related Conversations
            </Typography>
            <div className='flex flex-row items-center' style={{ gap: 8 }}>
                <Typography variant='body' className={cn('px-4 text-xs')}></Typography>
                <div className='flex flex-row' style={{ gap: 8 }}>
                    <div>
                        <button className='flex'>
                            <ChevronLeft size={24} className='stroke-gray-400'/>
                        </button>
                    </div>

                    <div>
                        <button>
                            <ChevronRight size={24} className='stroke-gray-400'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedConversation
