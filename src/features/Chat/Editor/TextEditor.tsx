'use client'

import { RefObject, useEffect, useState } from 'react'

import { cn } from '@/shared/utils'

import './styles/editor.css'

// import { IComposeType, IMessageFormName } from '@/shared/store/types'

interface IProps {
    editorRef: RefObject<HTMLDivElement>
    value: string
    setValue: (value: string) => void
    // setValue: (name: string, value: string, type: string) => void
    // setValue: (name: IMessageFormName, value: string, type: IComposeType) => void
    // type: string
}

const TextEditor: React.FC<IProps> = ({ editorRef, value, setValue }) => {
    const [isBlank, setIsBlank] = useState(true)

    const saveCaretPosition = () => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return null

        const range = selection.getRangeAt(0)
        return {
            startContainer: range.startContainer,
            startOffset: range.startOffset
        }
    }

    const restoreCaretPosition = (caret: { startContainer: Node; startOffset: number } | null) => {
        if (!caret || !editorRef.current) return

        const selection = window.getSelection()
        const range = document.createRange()
        range.setStart(caret.startContainer, caret.startOffset)
        range.collapse(true)

        selection?.removeAllRanges()
        selection?.addRange(range)
    }

    const handleInput = () => {
        const caret = saveCaretPosition() // Сохраняем позицию каретки

        if (editorRef.current) {
            const htmlContent = editorRef.current.innerHTML.trim()
            // setValue('text', htmlContent, type) // Обновляем состояние value
            setValue(htmlContent) // Обновляем состояние value
            setIsBlank(htmlContent === '' || htmlContent === '<p><br></p>')
        }

        restoreCaretPosition(caret) // Восстанавливаем позицию каретки
    }

    const handleBlur = () => {
        if (editorRef.current) {
            const htmlContent = editorRef.current.innerHTML.trim()
            if (htmlContent === '' || htmlContent === '<p><br></p>') {
                setIsBlank(true)
                // setValue('text', '', type) // Сбрасываем содержимое
                setValue('') // Сбрасываем содержимое
                editorRef.current.innerHTML = '' // Очищаем содержимое
            }
        }
    }

    const handleFocus = () => {
        if (isBlank) {
            setIsBlank(false) // Убираем состояние пустоты при фокусе
        }
    }

    useEffect(() => {
        if (editorRef.current) {
            if (editorRef.current.innerHTML !== value) {
                const caret = saveCaretPosition() // Сохраняем позицию каретки
                editorRef.current.innerHTML = value // Обновляем содержимое редактора
                restoreCaretPosition(caret) // Восстанавливаем позицию каретки
            }
            setIsBlank(editorRef.current.innerHTML.trim() === '')
        }
    }, [value])

    return (
        <div
            ref={editorRef}
            className={cn('editor relative h-full min-h-[200px] w-full overflow-auto break-words text-[14px]', {
                'custom-blank': isBlank
            })}
            contentEditable
            onInput={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            data-placeholder='Or write by yourself...'
        />
    )
}

export { TextEditor }
