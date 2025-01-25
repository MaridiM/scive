'use client'

import { RefObject, useRef, useState } from 'react'

import { Footer, TextEditor } from './ui'

export function Editor() {
    const editorRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState('')

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
        <>
            <section className='overflow-auto border-y border-divider'>
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
        </>
    )
}
