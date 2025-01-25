'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
    Bold,
    GraduationCap,
    Italic,
    List,
    ListOrdered,
    MessageSquareQuote,
    SmilePlus,
    SpellCheck2,
    Underline
} from 'lucide-react'
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react'

import { Hint } from '@/shared/components'
import { cn } from '@/shared/utils'

interface IProps {
    editorRef: RefObject<HTMLDivElement>
    // loadFile: (file: DocumentPicker.DocumentPickerAsset) => void
}

export function Toolbar({ editorRef /*loadFile*/ }: IProps) {
    const [visibleEmoji, setVisibleEmoji] = useState(false)
    const [textSize, setTextSize] = useState('normal') // Размер текста
    const [visibleFormattingOptions, setVisibleFormattingOptions] = useState(false)
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

    // const { tagManageClick } = useGoogleAnalytic()

    // Форматирование текста
    const applyFormat = (command: string, value: string | null = null) => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        const range = selection.getRangeAt(0)
        let parentElement: any =
            range.commonAncestorContainer.nodeType === 1
                ? range.commonAncestorContainer
                : range.commonAncestorContainer.parentNode

        if (command === 'formatBlock' && value === 'blockquote') {
            // Проверяем, находится ли выделение в blockquote
            while (parentElement && parentElement.nodeName !== 'BODY') {
                if (parentElement.nodeName === 'BLOCKQUOTE') {
                    // Если в blockquote, удаляем только blockquote, оставляя внутренние элементы
                    const content = document.createDocumentFragment()
                    while (parentElement.firstChild) {
                        content.appendChild(parentElement.firstChild)
                    }
                    parentElement.parentNode?.replaceChild(content, parentElement)
                    return
                }
                parentElement = parentElement.parentNode
            }

            // Если blockquote еще не применен, добавляем его
            document.execCommand(command, false, value)
            return
        }

        // Если изменяется тип списка (UL -> OL или наоборот)
        if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
            const currentList = parentElement?.closest('UL, OL')
            if (currentList) {
                // Меняем тип списка
                const newListType = command === 'insertUnorderedList' ? 'UL' : 'OL'
                if (currentList.nodeName !== newListType) {
                    const newList = document.createElement(newListType)
                    while (currentList.firstChild) {
                        newList.appendChild(currentList.firstChild)
                    }
                    currentList.parentNode.replaceChild(newList, currentList)
                } else {
                    // Убираем список, если уже активен
                    document.execCommand(command)
                }
            } else {
                // Если списка нет, добавляем
                document.execCommand(command)
            }
            return
        }

        // Обработка других команд форматирования
        const isActive = activeFormats.has(command)
        document.execCommand(command, false, value || '')

        setActiveFormats(prevFormats => {
            const updatedFormats = new Set(prevFormats)
            if (isActive) {
                updatedFormats.delete(command)
            } else {
                updatedFormats.add(command)
            }
            return updatedFormats
        })
    }

    const fontSizeMap = useMemo(
        () => ({
            small: '13px',
            normal: '16px',
            large: '20px',
            huge: '32px'
        }),
        []
    )

    // Изменение размера текста
    const detectTextSize = useCallback(() => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        const range = selection.getRangeAt(0)
        const parentElement =
            range.commonAncestorContainer.nodeType === 1
                ? range.commonAncestorContainer
                : range.commonAncestorContainer.parentNode

        if (parentElement instanceof HTMLElement) {
            const currentFontSize = window.getComputedStyle(parentElement).fontSize

            // Сравниваем текущий размер текста с предустановленными значениями
            const size = Object.keys(fontSizeMap).find(
                key => fontSizeMap[key as keyof typeof fontSizeMap] === currentFontSize
            ) as 'small' | 'normal' | 'large' | 'huge'

            if (size) {
                setTextSize(size) // Устанавливаем текущий размер текста
            }
        }
    }, [fontSizeMap])

    const handleTextSizeChange = (size: 'small' | 'normal' | 'large' | 'huge') => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) {
            // Если текста нет, сохраняем размер для последующего ввода
            setTextSize(size)
            return
        }

        const range = selection.getRangeAt(0)

        // Если есть выделение, оборачиваем его в <span> с новым размером
        const span = document.createElement('span')
        span.style.fontSize = fontSizeMap[size]

        const contents = range.extractContents()
        span.appendChild(contents)
        range.insertNode(span)

        // Перемещаем каретку в конец вставленного <span>
        const newRange = document.createRange()
        newRange.setStartAfter(span)
        newRange.collapse(true)
        selection.removeAllRanges()
        selection.addRange(newRange)

        setTextSize(size)
    }

    // Выбор и загрузка файла
    // const pickFile = async () => {
    //     tagManageClick('compose_toolbar_attachments')
    //     const result = await DocumentPicker.getDocumentAsync({
    //         type: '*/*'
    //     })

    //     if (result.assets) {
    //         console.log(result.assets[0]?.size)
    //         if (result.assets && result.assets[0] && result.assets[0].size) {
    //             if (result.assets[0].size / 1020 > 2097152) {
    //                 Toast.show({
    //                     type: 'error',
    //                     text1: 'Add a file up to 2GB'
    //                 })
    //             }
    //         }
    //         loadFile(result.assets[0])

    //         /*const file = new FormData()
    // 		file.append('file', result.assets)*/
    //     }
    // }

    // Emoji
    const handleEmojiClick = (emoji: any) => {
        if (editorRef.current) {
            // Устанавливаем фокус, если его нет
            if (document.activeElement !== editorRef.current) {
                editorRef.current.focus()
            }

            const selection = window.getSelection()
            if (!selection || selection.rangeCount === 0) {
                const range = document.createRange()
                range.selectNodeContents(editorRef.current)
                range.collapse(false)
                selection?.removeAllRanges()
                selection?.addRange(range)
            }

            const range = selection?.getRangeAt(0)
            const emojiNode = document.createTextNode(emoji)

            range?.deleteContents() // Удаляем выделенный текст, если есть
            range?.insertNode(emojiNode) // Вставляем эмодзи

            // Перемещаем каретку после вставленного эмодзи
            range?.setStartAfter(emojiNode)
            range?.setEndAfter(emojiNode)
            selection?.removeAllRanges()
            selection?.addRange(range!)
        }
    }

    const handleToggleEmoji = () => {
        setVisibleEmoji(!visibleEmoji)
        if (visibleFormattingOptions) {
            setVisibleFormattingOptions(false)
        }

        // tagManageClick('compose_toolbar_emoji')
    }

    const handleToggleFormattingOptions = () => {
        setVisibleFormattingOptions(!visibleFormattingOptions)
        if (visibleEmoji) {
            setVisibleEmoji(false)
        }

        // tagManageClick('compose_toolbar_formatting_options')
    }

    useEffect(() => {
        document.addEventListener('selectionchange', detectTextSize)
        return () => {
            document.removeEventListener('selectionchange', detectTextSize)
        }
    }, [detectTextSize])

    return (
        <div className='flex gap-2'>
            <Hint asChild side='top' label='Formatting options'>
                <button
                    className={cn(
                        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover',
                        {
                            'bg-surface-hover': visibleFormattingOptions
                        }
                    )}
                    onClick={handleToggleFormattingOptions}
                >
                    <SpellCheck2 size={20} color={'black'} />
                </button>
            </Hint>

            {visibleFormattingOptions && (
                <div
                    className={cn(
                        'absolute bottom-11 left-0 z-50 flex items-center gap-2 rounded-base-x2 border-[0.25px] border-gray-200 bg-white p-1 shadow'
                    )}
                >
                    <Hint asChild side='top' label='Text size'>
                        <select
                            value={textSize}
                            onChange={e =>
                                handleTextSizeChange(e.target.value as 'normal' | 'small' | 'large' | 'huge')
                            }
                            style={{
                                height: '40px',
                                padding: '5px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                cursor: 'pointer'
                            }}
                        >
                            <option value='small' className='text-[13px]'>
                                Small
                            </option>
                            <option value='normal' className='text-[16px]'>
                                Normal
                            </option>
                            <option value='large' className='text-[20px]'>
                                Large
                            </option>
                            <option value='huge' className='text-[32px]'>
                                Huge
                            </option>
                        </select>
                    </Hint>

                    <Hint asChild side='top' label='Bold'>
                        <button
                            className={cn(
                                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            )}
                            onClick={() => applyFormat('bold')}
                        >
                            <Bold size={20} color={'black'} />
                        </button>
                    </Hint>
                    <Hint asChild side='top' label='Italic'>
                        <button
                            className={cn(
                                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            )}
                            onClick={() => applyFormat('italic')}
                        >
                            <Italic size={20} color={'black'} />
                        </button>
                    </Hint>
                    <Hint asChild side='top' label='Underline'>
                        <button
                            className={cn(
                                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            )}
                            onClick={() => applyFormat('underline')}
                        >
                            <Underline size={20} color={'black'} />
                        </button>
                    </Hint>
                    <Hint asChild side='top' label='Blockquote'>
                        <button
                            className={cn(
                                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            )}
                            onClick={() => applyFormat('formatBlock', 'blockquote')}
                        >
                            <MessageSquareQuote size={20} color={'black'} />
                        </button>
                    </Hint>
                    <Hint asChild side='top' label='List'>
                        <button
                            className={cn(
                                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            )}
                            onClick={() => applyFormat('insertUnorderedList')}
                        >
                            <List size={20} color={'black'} />
                        </button>
                    </Hint>
                    <Hint asChild side='top' label='List Ordered'>
                        <button
                            className={cn(
                                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                            )}
                            onClick={() => applyFormat('insertOrderedList')}
                        >
                            <ListOrdered size={20} color={'black'} />
                        </button>
                    </Hint>
                </div>
            )}

            <Hint asChild side='top' label='Insert emoji'>
                <button
                    className={cn(
                        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover',
                        {
                            'bg-surface-hover': visibleEmoji
                        }
                    )}
                    onClick={handleToggleEmoji}
                >
                    <SmilePlus size={20} color={'black'} />
                </button>
            </Hint>

            {/* <Hint asChild side='top' label='Attach files'>
                <button className={cn('transition-all duration-300 ease-in-out flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none hover:bg-surface-hover')} onClick={pickFile}>
                    <Paperclip size={20} color='black' />
                </button>
            </Hint> */}

            <Hint asChild side='top' label='Spellchecking'>
                <button
                    className={cn(
                        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-base-x2 border-none bg-none outline-none transition-all duration-300 ease-in-out hover:bg-surface-hover'
                    )}
                >
                    <GraduationCap size={20} color='black' />
                </button>
            </Hint>

            {visibleEmoji && (
                <div className='absolute bottom-[50px] left-10'>
                    <Picker
                        data={data}
                        onEmojiSelect={(emoji: { native: any }) => handleEmojiClick(emoji.native)}
                        theme='light'
                        perLine={6}
                        previewEmoji='none'
                        previewPosition='none'
                        skinTonePosition='search'
                    />
                </div>
            )}
        </div>
    )
}
