import { Chat, LeftSide, RightSide } from '@/widgets'

export default function Dashboard() {
    return (
        <div className='grid flex-1 grid-cols-[minmax(440px,640px)_minmax(576px,auto)_minmax(320px,480px)] gap-1'>
            <RightSide />
            <Chat />
            <LeftSide />
        </div>
    )
}
