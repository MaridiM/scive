import { Content, Typography } from '@/shared/components'
import { cn } from '@/shared/utils'

import { HIGHLIGHTS } from '@/enitites/api'

export function Highlights() {
    return (
        <Content
            placeholder='Here you will see details of selected email chain'
            showPlaceholder={!HIGHLIGHTS['193922fe5724824d'].content.length}
            loadingText='Generate highlights'
            loading={false}
        >
            <ul className='mr-2 flex max-h-[236px] flex-col gap-1 overflow-y-auto pl-4 pr-2'>
                {HIGHLIGHTS['193922fe5724824d'].content.map((highlight: string, idx: number) => (
                    <li key={idx} className='mb-0.5'>
                        <Typography variant='body' className={cn('leading-7 !text-text-bold')}>
                            {idx + 1}. {highlight}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Content>
    )
}
