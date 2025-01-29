import { Widget } from './Widget'
import { DigestItems, MessageDetail } from '@/enitites/ui'
import { DigestFooter, DigestTags } from '@/features'

export function RightSide() {
    return (
        <aside className='border-devider grid grid-rows-[1fr_auto] gap-2 border-r-[1px] bg-surface-inactive'>
            <Widget
                className='max-h-[567px] min-h-[512px]'
                title='Scive Digest AI'
                counter={{ count: 2, subject: 'new' }}
            >
                <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                    <DigestTags />
                    <DigestItems />
                </section>
                <DigestFooter />
            </Widget>

            <Widget
                className='max-h-[334px] min-h-[334px]'
                title='Message Summary'
                counter={{ count: 2, subject: 'pro' }}
            >
                <MessageDetail />
            </Widget>
        </aside>
    )
}
