'use client'

import { RefObject, useRef, useState } from 'react'

import { Footer, TextEditor } from './ui'

export function Editor() {
    const editorRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState('')
    // const [value, setValue] = useState(THREADS[5].messages[0].html ?? '')

    // const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([])
    // const loadFile = (file: DocumentPicker.DocumentPickerAsset) => {
    //     setFiles([...files, file])
    // }

    function clearForwardMessageHandler() {
        console.log('clearForwardMessageHandler')
        // setIsForwardAll(false)
        // setShowCompose()
        // tagManageClick('compose_delete_forward_context')
    }

    function sendMessageHandler() {
        console.log('sendMessageHandler')
    }

    return (
        <section className='grid h-full grid-rows-[auto_40px] flex-col gap-1'>
            <section className='overflow-hidden border-y border-divider'>
                <TextEditor
                    editorRef={editorRef as RefObject<HTMLDivElement>}
                    value={value ?? ''}
                    setValue={setValue}
                    // type={type}
                />
            </section>
            <Footer
                editorRef={editorRef as RefObject<HTMLDivElement>}
                isForvard={false}
                clearForwardMessageHandler={clearForwardMessageHandler}
                sendMessageHandler={sendMessageHandler}
            />
        </section>
    )
}
