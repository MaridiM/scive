import { Clock4, Trash2 } from 'lucide-react'
import { RefObject } from 'react'

import { Button, Hint, Typography } from '@/shared/components'

import { Toolbar } from './Toolbar'

interface IProps {
    editorRef: RefObject<HTMLDivElement>
    isForvard?: boolean
    clearForwardMessageHandler: () => void
    sendMessageHandler: () => void
}
export function Footer({ editorRef, isForvard, clearForwardMessageHandler, sendMessageHandler }: IProps) {
    return (
        <footer className='relative flex items-center justify-between'>
            <Toolbar editorRef={editorRef as RefObject<HTMLDivElement>} /*loadFile={loadFile}*/ />
            <div className='flex gap-2'>
                {isForvard && (
                    <Hint label='Discard draft' side='top' asChild>
                        <Button
                            variant='clear'
                            size='clear'
                            className='group h-10 w-10 rounded-base-x2 transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            onClick={clearForwardMessageHandler}
                        >
                            <Trash2
                                size={20}
                                className='stroke-black stroke-[1.5px] transition-all duration-300 ease-in-out group-hover:stroke-2'
                            />
                        </Button>
                    </Hint>
                )}
                <div className='flex'>
                    <Hint label='Send Message' side='top' asChild>
                        <Button
                            className='rounded-r-none bg-button pb-base-x2 pl-base-x8 pr-base-x12 pt-base-x2 hover:bg-button-hover'
                            onClick={sendMessageHandler}
                        >
                            <Typography variant='body'>Send</Typography>
                        </Button>
                    </Hint>
                    <Hint label='Schedule send' side='top' asChild>
                        <Button
                            className='rounded-l-none border-l border-gray-500 bg-button px-base-x3 hover:bg-button-hover'
                            onClick={() => console.log('Shedule send message')}
                        >
                            <Clock4 size={20} className='stroke-white' />
                        </Button>
                    </Hint>
                </div>
            </div>
        </footer>
    )
}
