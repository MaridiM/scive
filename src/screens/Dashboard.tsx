'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
    CalendarIcon,
    CheckCircle,
    Circle,
    CircleCheckBig,
    Clock4,
    PencilLine,
    Plus,
    PlusCircle,
    Star,
    Trash2,
    Wand2,
    X
} from 'lucide-react'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useKey } from 'react-use'
import { z } from 'zod'

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    Hint,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    SearchInput,
    Separator,
    Typography
} from '@/shared/components'
import { Calendar } from '@/shared/components/ui/Calendar'
import { useTextSize } from '@/shared/hooks'
import { cn, parseStringToList } from '@/shared/utils'

import { DIGESTS, DIGEST_TAGS, HIGHLIGHTS, MESSAGE_DETAILS, TODO_DASHBOARD, TODO_SUGGESTIONS } from '@/enitites/api'
import { THREADS } from '@/enitites/api/threads'
import { TextEditor, Toolbar } from '@/features'
import { Widget } from '@/widgets'

type TTodoSuggestionsFilterKey = 'new' | 'due' | 'favorite'

const addTodoFormSchema = z.object({
    content: z.string().min(1),
    sub_content: z.string().optional(),
    due: z.date().optional(),
    is_favorite: z.boolean()
})
const generateComposeFormSchema = z.object({
    prompt: z.string().min(1),
    max_words: z.number().default(50),
    tonality: z.string().default('FRIENDLY')
})

type TAddTodoFormSchema = z.infer<typeof addTodoFormSchema>
type TGenerateComposeFormSchema = z.infer<typeof generateComposeFormSchema>

export default function Dashboard() {
    const [showAddTaskPopover, setShowAddTaskPopover] = useState<boolean>(false)
    const [showPopoverCalendar, setShowPopoverCalendar] = useState<boolean>(false)

    const [isNoValidAddTaskField, setIsNoValidAddTaskField] = useState<boolean>(false)
    const [isEmptyAddTaskContentField, setIsEmptyAddTaskContentField] = useState<boolean>(false)
    const [isEmptyAddTaskSubContentField, setIsEmptyAddTaskSubContentField] = useState<boolean>(false)

    const addTodoForm = useForm<z.infer<typeof TAddTodoFormSchema>>({
        resolver: zodResolver(addTodoFormSchema),
        defaultValues: {
            content: '',
            sub_content: '',
            is_favorite: false,
            due: undefined
        }
    })
    const generateComposeForm = useForm<z.infer<typeof TGenerateComposeFormSchema>>({
        resolver: zodResolver(generateComposeFormSchema),
        defaultValues: {
            prompt: '',
            max_words: 50,
            tonality: 'FRIENDLY'
        }
    })

    const [filterTodoSuggestion, setFilterTodoSuggestion] = useState<TTodoSuggestionsFilterKey>('new')
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const [readDigestItems] = useState<Array<string>>(['9555', '19548'])
    const [readDigestItemIds, setReadDigestItemIds] = useState<Array<number>>([])
    const [selectedDigestId, setSelectedDigestId] = useState<number | null>(null)

    const { textSize } = useTextSize()

    const [isHoveredId, setIsHoveredId] = useState<string | null>(null)

    const [refreshTimeout] = useState<number>(0)
    const [selectedDigestTag, setSelectedDigestTag] = useState('all')

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    const selectedDigestItem = (id: number) => {
        console.log('selecteDigestItem', id)

        setReadDigestItemIds(prew => [...prew, id])
        setSelectedDigestId(id)

        // if (!selectMessage) return

        // selectMessage(id)
        // setChatType('chat_dashboard')
        // fetchFirstDigestThread(id)
        // setReadDigestItemIds(id)
        // ()

        // clearSendMessageForm()
        // clearComposePrompt()
        // setCreateDraft(true)
    }

    function markAllAsDoneHandler() {
        // tagManageClick('mark_all_as_done_dashboard')
        // readAll(allDigestThreadIds)}
        console.log('mark_all_as_done_dashboard')
    }

    function digestItemHandler(id: number) {
        selectedDigestItem(id)
        // tagManageClick('digest_item')
        console.log(id)
    }

    function digestItemDoneHandler(id: number) {
        // tagManageClick('digest_item_done')
        // readDigestItem(id, allDigestThreadIds)
        // markDigestItemAsRead(id)
        console.log('digest_item_done', id)
    }

    function digestTagsHandler(key: string) {
        setSelectedDigestTag(key)
    }

    function refreshSubmit() {
        console.log(refreshSubmit)
    }

    function addTodoSuggestionItemHandler() {
        console.log('todo_add_dashboard')
        // tagManageClick('todo_add_dashboard')
        //     addTask?.({
        //         id: todoSuggestions?.id,
        //         content,
        //         due: getDate(),
        //         is_favorite: isFavorite
        //     } as unknown as IUpdateTodo)
    }

    function isFavoriteTodoSuggestionItemHandler() {
        console.log('todo_add_dashboard')
        setIsFavorite(!isFavorite)
        // tagManageClick('todo_favorite_dashboard')
    }

    function isFavoriteAddTodoFormHandler() {
        addTodoForm.setValue('is_favorite', !isFavorite)
        setIsFavorite(!isFavorite)
    }

    function todoListFilterHandler(key: TTodoSuggestionsFilterKey) {
        console.log('Filter by: ', key)
        setFilterTodoSuggestion(key)
        // filterTodos(key)}
        // tagManageClick('todo_filter_new_dashboard')
        // tagManageClick('todo_filter_by_date_dashboard')
        // tagManageClick('todo_filter_favorite_dashboard')
    }

    function isFavoriteTodoItemHandler(id: number) {
        console.log('todo_favorite_dashboard', id)
        // updateTask &&
        //     updateTask(id, {
        //         ...todo,
        //         is_favorite: !is_favorite
        //     })
    }

    function isDoneTodoItemHandler(id: number) {
        console.log('todo_complete_dashboard', id)
        // tagManageClick('todo_complete_dashboard')
        // updateTask &&
        //     updateTask(id as number, {
        //         ...todo,
        //         is_done: !is_done
        //     })
    }

    function showAddTaskPopoverHandler() {
        setShowAddTaskPopover(!showAddTaskPopover)
        if (showAddTaskPopover) {
            setIsNoValidAddTaskField(false)
            setIsEmptyAddTaskContentField(false)
            setIsEmptyAddTaskSubContentField(false)
            addTodoForm.reset()
        }
    }

    useEffect(() => {
        const { dirtyFields } = addTodoForm.formState

        const isContentValid = dirtyFields.content
        const isSubContentValid = dirtyFields.sub_content

        if ((isContentValid || isSubContentValid) && isNoValidAddTaskField) {
            setIsNoValidAddTaskField(false)
            setIsEmptyAddTaskContentField(false)
            setIsEmptyAddTaskSubContentField(false)
        }
    }, [addTodoForm.formState, isNoValidAddTaskField])

    function createNewTask(event: globalThis.KeyboardEvent) {
        event.preventDefault()
        const { dirtyFields } = addTodoForm.formState

        const isContentValid = dirtyFields.content
        const isSubContentValid = dirtyFields.sub_content

        if (isContentValid || isSubContentValid) {
            console.log(addTodoForm.getValues())

            setShowAddTaskPopover(false)
            setIsNoValidAddTaskField(false)
            setIsEmptyAddTaskContentField(false)
            setIsEmptyAddTaskSubContentField(false)
            addTodoForm.reset()
        } else {
            setIsNoValidAddTaskField(true)
            setIsEmptyAddTaskContentField(!isContentValid)
            setIsEmptyAddTaskSubContentField(!isSubContentValid)
        }
    }

    function cancelCreateTask() {
        setShowAddTaskPopover(false)
        setIsNoValidAddTaskField(false)
        setIsEmptyAddTaskContentField(false)
        setIsEmptyAddTaskSubContentField(false)
        addTodoForm.reset()
    }

    useKey('Escape', cancelCreateTask)
    useKey('Enter', event => createNewTask(event))

    // content: THREADS[5].messages[0].html

    function clearForwardMessageHandler() {
        console.log('clearForwardMessageHandler')
        // setIsForwardAll(false)
        // setShowCompose()
        // tagManageClick('compose_delete_forward_context')
    }
    function sendMessageHandler() {
        console.log('sendMessageHandler')
    }

    const editorRef = useRef<HTMLDivElement>(null)
    // const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([])
    // const loadFile = (file: DocumentPicker.DocumentPickerAsset) => {
    //     setFiles([...files, file])
    // }
    const [composeValue, setComposeValue] = useState('')

    function generateComposeMessage() {
        console.log(generateComposeForm.getValues())
    }
    return (
        <div className='grid flex-1 grid-cols-[minmax(440px,640px)_minmax(576px,auto)_minmax(320px,480px)] gap-1'>
            <aside className='border-devider grid grid-rows-[1fr_auto] gap-2 border-r-[1px] bg-surface-inactive'>
                <Widget
                    className='max-h-[567px] min-h-[512px]'
                    title='Scive Digest AI'
                    counter={{ count: 2, subject: 'new' }}
                >
                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        <ul className='flex flex-wrap gap-1.5'>
                            {DIGEST_TAGS.map(tag => {
                                const selected = selectedDigestTag === tag.key
                                return (
                                    <li
                                        key={tag.key}
                                        onClick={() => digestTagsHandler(tag.key)}
                                        className={cn(
                                            'flex h-8 cursor-pointer items-center justify-center rounded-lg bg-white px-2',
                                            {
                                                'bg-black': selected
                                            }
                                        )}
                                    >
                                        <Typography
                                            variant='body'
                                            className={cn('!text-base-body font-normal leading-7', {
                                                'text-white': selected
                                            })}
                                        >
                                            {tag.title}
                                        </Typography>
                                    </li>
                                )
                            })}
                        </ul>

                        <section className='flex flex-1 flex-col overflow-hidden'>
                            {/* <Typography variant='body' className='!text-text-ultra-light'>
                                Hello! Here you will see an Executive Summary of your new emails. Click on the number to
                                view the message each part refers to.
                            </Typography> */}

                            <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                                {DIGESTS.map((item, idx) => {
                                    const part1 = DIGESTS.slice(0, Math.floor(DIGESTS.length / 3))
                                    const part2 = DIGESTS.slice(
                                        Math.floor(DIGESTS.length / 3),
                                        Math.floor((2 * DIGESTS.length) / 3)
                                    )
                                    const part3 = DIGESTS.slice(Math.floor((2 * DIGESTS.length) / 3))

                                    const isReadDigest =
                                        readDigestItemIds.includes(item.id) && selectedDigestId !== item.id
                                    const isActiveDigest = item.id === selectedDigestId
                                    const isHoverDigest = isHoveredId === String(item.id)
                                    const isHoverReadDigest = isReadDigest && isHoveredId === String(item.id)

                                    if (readDigestItems.includes(String(item.id))) return

                                    return (
                                        <li
                                            key={idx}
                                            className='relative flex min-h-fit flex-row overflow-hidden'
                                            onMouseLeave={() => setIsHoveredId(null)}
                                            onMouseEnter={() => setIsHoveredId(String(item.id))}
                                            onClick={() => digestItemHandler(item.id)}
                                        >
                                            <Typography
                                                variant='body'
                                                className={cn(
                                                    'relative mb-2 flex w-fit cursor-default flex-row overflow-hidden rounded-lg bg-white px-2 py-1 font-semibold transition-all duration-150 ease-in-out',
                                                    isHoverDigest && `bg-white !text-text-ultra-light`,
                                                    isReadDigest && 'bg-gray-200 font-normal !text-gray-400',
                                                    isHoverReadDigest && 'bg-gray-200 font-semibold !text-gray-400',
                                                    isActiveDigest && 'bg-black !text-white',

                                                    part3.includes(item) &&
                                                        `min-h-fit text-base-body2 leading-5 ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-body'
                                                                : 'desktop:text-base-body2'
                                                        }`,
                                                    part2.includes(item) &&
                                                        `min-h-fit text-base-body-digest leading-7 ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-body-digest1'
                                                                : 'desktop:text-base-body-digest'
                                                        }`,
                                                    part1.includes(item) &&
                                                        `min-h-fit text-base-body-digest1 leading-[30px] ${
                                                            textSize === 'large'
                                                                ? 'desktop:text-base-h3'
                                                                : 'desktop:text-base-body-digest1'
                                                        }`
                                                )}
                                            >
                                                {item.content}
                                                {isHoverDigest && (
                                                    <Button
                                                        variant='clear'
                                                        className={cn(
                                                            'absolute left-0 top-0 flex h-full w-[32px] rounded-none bg-button px-0'
                                                        )}
                                                        onClick={() => digestItemDoneHandler(item.id)}
                                                    >
                                                        <svg
                                                            width='28px'
                                                            height='28px'
                                                            viewBox='0 0 36 36'
                                                            fill='none'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                        >
                                                            <path
                                                                d='M11.25 17.25L16.25 22.25L24.75 13.75'
                                                                stroke='#ffff'
                                                                strokeWidth='5'
                                                            />
                                                        </svg>
                                                    </Button>
                                                )}
                                            </Typography>
                                        </li>
                                    )
                                })}
                            </ul>

                            {/* <Typography variant='body' className='!text-text-bold'>
                                Oops, the number of detailed report generation is over. <br /> Need more?
                                <Link
                                    href={paths.settings('plans')}
                                    className={cn('pl-2 text-black underline underline-offset-4')}
                                >
                                    Check out our plans.
                                </Link>
                            </Typography> */}
                        </section>
                    </section>

                    <footer className='flex justify-center gap-x-base-x4 pt-base-x4'>
                        <Button
                            variant='clear'
                            className='h-[36px] gap-1 border-2 border-button px-base-x2 !text-base-body2 font-semibold leading-[19px] tracking-tight text-button hover:border-button-hover hover:text-button-hover laptop:min-w-[160px] desktop:min-w-[180px]'
                            onClick={markAllAsDoneHandler}
                        >
                            <CircleCheckBig size={20} className='mr-1 stroke-black' />
                            Mark all as done
                        </Button>
                        <Button
                            className={cn(
                                'flex h-[36px] gap-2 bg-button px-base-x2 !text-base-body2 font-semibold tracking-tight hover:bg-button-hover laptop:min-w-[160px] desktop:min-w-[180px]',
                                {
                                    'bg-sky-400': refreshTimeout !== 0
                                }
                            )}
                            onClick={refreshSubmit}
                        >
                            <Wand2 size={20} className='stroke-black' />
                            {refreshTimeout !== 0 ? `Timeout ${formatTime(refreshTimeout || 0)}` : `Generate new`}
                        </Button>
                    </footer>
                </Widget>
                <Widget
                    className='max-h-[334px] min-h-[334px]'
                    title='Message Summary'
                    counter={{ count: 2, subject: 'pro' }}
                >
                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                                Here you will see the AI-generated details of the selected email
                            </Typography> */}

                        <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                            {parseStringToList(MESSAGE_DETAILS).length > 1
                                ? parseStringToList(MESSAGE_DETAILS).map((item: string, idx: number) => (
                                      <li key={idx} className='mb-0.5'>
                                          <Typography variant='body'>{item}</Typography>
                                      </li>
                                  ))
                                : MESSAGE_DETAILS}
                        </ul>
                    </section>
                </Widget>
            </aside>

            <section className='border-devider grid grid-rows-[auto_minmax(100px,420px)] gap-base-x2 border-x-[1px] bg-white'>
                <section className='flex flex-col bg-green-900'>CHAT</section>
                <section className='grid grid-rows-[auto_264px_40px] flex-col gap-1 p-4'>
                    <Form {...generateComposeForm}>
                        <form className='flex flex-col gap-1'>
                            <div className='h-9 w-full bg-orange-400'></div>
                            {/* <View className={cn('w-full flex-row items-center border-b mb-base-x1 pb-base-x1', border.divider)}>
                                    <View>
                                        <Button
                                            onPress={onGenerate}
                                            colorIcon={color.black}
                                            styleColorIconOnHover='sky'
                                            className='p-base-x2 rounded-base-x3'
                                        />
                                    </View>
                            </View> */}
                            <FormField
                                control={generateComposeForm.control}
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='flex w-full flex-col items-center'>
                                        <FormControl className='w-full'>
                                            <div className='flex h-[36] w-full items-center justify-start gap-4 border-none text-base-body'>
                                                <Input
                                                    className={cn(
                                                        'h-9 w-full rounded-[4px] border-[2px] border-transparent bg-transparent px-3 text-base-body text-text-bold outline-none placeholder:text-text-disabled',
                                                        {
                                                            // 'border-error bg-error-light': noValidPrompt
                                                        }
                                                    )}
                                                    autoCapitalize='none'
                                                    autoFocus={true}
                                                    placeholder='Ask AI to write answer...'
                                                    {...field}
                                                />
                                                <Hint label='Generate' side='top' asChild>
                                                    <Button
                                                        variant='clear'
                                                        size='clear'
                                                        onClick={generateComposeMessage}
                                                        className='group h-9 w-9 items-center justify-center rounded-none'
                                                    >
                                                        <Wand2
                                                            size={24}
                                                            className='stroke-black stroke-2 transition-all duration-300 ease-in-out group-hover:stroke-button'
                                                        />
                                                    </Button>
                                                </Hint>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    <section className='overflow-auto border-t border-divider'>
                        <TextEditor
                            editorRef={editorRef as RefObject<HTMLDivElement>}
                            value={composeValue}
                            setValue={setComposeValue} /*type={type}*/
                        />
                    </section>

                    <footer className='relative flex items-center justify-between'>
                        <Toolbar editorRef={editorRef as RefObject<HTMLDivElement>} /*loadFile={loadFile}*/ />
                        <div className='flex gap-2'>
                            <Hint label='Discard draft' side='top' asChild>
                                <Button
                                    variant='clear'
                                    size='clear'
                                    className='group h-10 w-10 rounded-base-x2 transition-all duration-300 ease-in-out hover:bg-gray-200'
                                    onClick={clearForwardMessageHandler}
                                >
                                    <Trash2
                                        size={20}
                                        className='stroke-black stroke-[1.5px] transition-all duration-300 ease-in-out group-hover:stroke-2'
                                    />
                                </Button>
                            </Hint>
                            <div className='flex'>
                                <Hint label='Send Message' side='top' asChild>
                                    <Button
                                        className='rounded-r-none bg-button pb-base-x2 pl-base-x8 pr-base-x12 pt-base-x2 hover:bg-button-hover'
                                        onClick={sendMessageHandler}
                                    >
                                        <Typography variant='body' className=''>
                                            Send
                                        </Typography>
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
                </section>
            </section>

            <aside className='border-devider grid grid-rows-[minmax(463px,463px)_auto_auto] gap-2 border-l-[1px] bg-white'>
                {/* <Widget className='flex flex-col bg-red-300' title='To-Do list'> */}
                <Widget className='flex flex-col'>
                    <section className={cn('flex items-center justify-between py-2')}>
                        <Typography variant='h3' className='text-base-h3 font-normal !text-text-light'>
                            To-Do List
                        </Typography>

                        <ul className='flex items-center justify-between gap-1'>
                            <li
                                className={cn('cursor-pointer px-base-x3 py-base-x1 !text-base-body1 text-text-light', {
                                    'font-semibold text-black': filterTodoSuggestion === 'new'
                                })}
                                onClick={() => todoListFilterHandler('new')}
                            >
                                New
                            </li>
                            <li
                                className={cn('cursor-pointer px-base-x3 py-base-x1 !text-base-body1 text-text-light', {
                                    'font-semibold text-black': filterTodoSuggestion === 'due'
                                })}
                                onClick={() => todoListFilterHandler('due')}
                            >
                                By date
                            </li>
                            <li
                                className={cn('cursor-pointer px-base-x3 py-base-x1')}
                                onClick={() => todoListFilterHandler('favorite')}
                            >
                                <Star
                                    size={20}
                                    className={cn('stroke-star', {
                                        'fill-star': filterTodoSuggestion === 'favorite'
                                    })}
                                />
                            </li>
                        </ul>
                    </section>

                    <SearchInput />

                    <section className='flex flex-col pr-1'>
                        <Button
                            variant='clear'
                            size='clear'
                            className={cn(
                                'rounded-y-lg flex items-center justify-start gap-4 px-2 py-4 font-normal text-black hover:bg-icon-surface',
                                {
                                    'rounded-b-none bg-icon-surface hover:bg-icon-surface': showAddTaskPopover
                                }
                            )}
                            onClick={showAddTaskPopoverHandler}
                        >
                            <PlusCircle size={24} className={cn('stroke-primary')} />
                            Add a task
                        </Button>
                        {showAddTaskPopover && (
                            <Form {...addTodoForm}>
                                <form className='flex flex-col gap-2 rounded-bl-lg rounded-br-lg bg-icon-surface pb-4 pl-4'>
                                    <FormField
                                        control={addTodoForm.control}
                                        name='content'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormControl>
                                                    <div className='flex h-[36] w-full items-center justify-start gap-4 border-none px-2'>
                                                        <Circle size={20} />
                                                        <Input
                                                            placeholder='Title'
                                                            autoFocus={true}
                                                            className={cn(
                                                                'rounded-[4px] border-[2px] border-transparent bg-transparent pl-2 !text-base-body1 font-normal text-text-bold placeholder:text-text-light',
                                                                {
                                                                    'border-error bg-error-light':
                                                                        isEmptyAddTaskContentField &&
                                                                        isNoValidAddTaskField
                                                                }
                                                            )}
                                                            {...field}
                                                        />
                                                        <Button
                                                            variant='clear'
                                                            size='clear'
                                                            type='button'
                                                            className='min-h-9 min-w-9 max-w-9'
                                                            onClick={isFavoriteAddTodoFormHandler}
                                                        >
                                                            <Star
                                                                size={20}
                                                                className={cn('stroke-star', {
                                                                    'fill-star': isFavorite
                                                                })}
                                                            />
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={addTodoForm.control}
                                        name='sub_content'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormControl>
                                                    <div className='flex h-[36] w-full items-center justify-start gap-4 border-none pl-6 pr-2'>
                                                        <PencilLine size={20} />
                                                        <Input
                                                            placeholder='Description'
                                                            className={cn(
                                                                'rounded-[4px] bg-transparent pl-2 !text-base-body1 font-normal text-text-bold placeholder:text-text-light',
                                                                {
                                                                    'border-error bg-error-light':
                                                                        !isEmptyAddTaskContentField &&
                                                                        isEmptyAddTaskSubContentField &&
                                                                        isNoValidAddTaskField
                                                                }
                                                            )}
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={addTodoForm.control}
                                        name='due'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-col'>
                                                <FormControl>
                                                    <Popover
                                                        open={showPopoverCalendar}
                                                        onOpenChange={() =>
                                                            setShowPopoverCalendar(!showPopoverCalendar)
                                                        }
                                                    >
                                                        <div className='flex gap-2 pr-2'>
                                                            <PopoverTrigger asChild className='w-full'>
                                                                <div className='text-text-bold1 flex h-9 cursor-pointer items-center gap-4 pl-6 pr-2'>
                                                                    <CalendarIcon
                                                                        size={24}
                                                                        className='stroke-black stroke-[1.5px]'
                                                                    />
                                                                    <span
                                                                        className={cn(
                                                                            'w-full pl-1 !text-base-body1 font-normal text-text-light',
                                                                            { 'text-text-bold': field.value }
                                                                        )}
                                                                    >
                                                                        {field.value
                                                                            ? format(field.value, 'MM.dd.yyyy')
                                                                            : 'Pick a date'}
                                                                    </span>
                                                                </div>
                                                            </PopoverTrigger>
                                                            {field.value && (
                                                                <Button
                                                                    variant='clear'
                                                                    size='clear'
                                                                    className='flex min-h-9 min-w-9 max-w-9 items-center justify-center hover:bg-gray-100'
                                                                    onClick={() =>
                                                                        addTodoForm.setValue('due', undefined)
                                                                    }
                                                                >
                                                                    <X size={20} className='stroke-black' />
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <PopoverContent align='start' className='w-auto p-0'>
                                                            <Calendar
                                                                mode='single'
                                                                selected={field.value}
                                                                onSelect={date => {
                                                                    field.onChange(date)
                                                                    setShowPopoverCalendar(!showPopoverCalendar)
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        )}
                    </section>

                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                            This is our little daily tasks section. You can add tasks here from selected emails or
                            create them yourself.
                        </Typography> */}

                        <ul className='flex flex-1 flex-col gap-2 overflow-y-auto pr-1'>
                            {TODO_DASHBOARD.map(item => (
                                <li key={item.id} className='bg flex w-full flex-col items-center gap-2'>
                                    <div className='flex w-full items-center'>
                                        <Hint label='Mark completed' side='right' asChild>
                                            <Button
                                                variant='clear'
                                                size='clear'
                                                className='min-h-9 min-w-9 max-w-9'
                                                onClick={() => isDoneTodoItemHandler(item.id)}
                                            >
                                                {item.is_done ? (
                                                    <CheckCircle size={16} className='stroke-tooltip' />
                                                ) : (
                                                    <Circle size={16} className='stroke-black' />
                                                )}
                                            </Button>
                                        </Hint>

                                        <Typography
                                            variant='body-list'
                                            className={cn('w-full text-wrap leading-6 !text-text-bold', {
                                                'text-red': item.date === 'Yesterday'
                                            })}
                                        >
                                            {item.content}
                                        </Typography>

                                        <Button
                                            variant='clear'
                                            size='clear'
                                            className='min-h-9 min-w-9 max-w-9'
                                            onClick={() => isFavoriteTodoItemHandler(item.id)}
                                        >
                                            <Star
                                                size={20}
                                                className={cn('stroke-star', {
                                                    'fill-star': item.is_favorite
                                                })}
                                            />
                                        </Button>
                                    </div>
                                    {item.date && (
                                        <div
                                            className={cn('w-fit rounded-full bg-surface-inactive px-base-x2 pb-[2px]')}
                                        >
                                            <Typography
                                                variant='button-plain'
                                                className={cn('text-center !text-base-body5 text-text-light')}
                                            >
                                                {item.date}
                                            </Typography>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </Widget>

                <Widget className='max-h-[96px] min-h-[96px] py-1'>
                    <section className='flex flex-1 flex-col gap-4 overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                            Here you can add important things from executive summary to your tasks
                        </Typography> */}

                        <ul className='flex flex-1 flex-col gap-1 overflow-y-auto pr-1'>
                            {TODO_SUGGESTIONS.content.map((item: string, idx: number) => (
                                <li key={idx} className='flex items-center'>
                                    <Hint side='right' label='Add to To-Do list' asChild>
                                        <Button
                                            variant='clear'
                                            className='p-base-x2'
                                            onClick={addTodoSuggestionItemHandler}
                                        >
                                            <Plus size={32} className='stroke-sky-400' />
                                        </Button>
                                    </Hint>
                                    <Typography variant='body-list' className={cn('flex-grow !text-sky-400')}>
                                        {item}
                                    </Typography>
                                    <Button variant='clear' onClick={isFavoriteTodoSuggestionItemHandler}>
                                        <Star
                                            size={20}
                                            className={cn('stroke-star', {
                                                'fill-star': isFavorite
                                            })}
                                        />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </Widget>

                <Widget className='max-h-[334px] min-h-[334px]' title='Highlights'>
                    <section className='flex flex-col overflow-hidden'>
                        {/* <Typography variant='body' className='!text-text-ultra-light'>
                            Here you will see the AI-generated details of the selected email
                        </Typography> */}

                        <ul className='mr-2 flex max-h-[236px] flex-col gap-1 overflow-y-auto pl-4 pr-2'>
                            {HIGHLIGHTS['193922fe5724824d'].content.map((highlight: string, idx: number) => (
                                <li key={idx} className='mb-0.5'>
                                    <Typography variant='body' className={cn('leading-7 !text-text-bold')}>
                                        {idx + 1}. {highlight}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </section>
                </Widget>
            </aside>
        </div>
    )
}
