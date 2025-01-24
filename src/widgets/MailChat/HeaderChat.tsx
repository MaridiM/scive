import Image from 'next/image'
import { FC, useState } from 'react'
// import * as React from "react"
import Important from '@/shared/assets/icons/important.svg'
import { Typography } from '@/shared/components'
import { cn } from '@/shared/utils'
import { useTextLayoutHandlers } from '@/shared/hooks/replaceText'
import RelatedConversation from './RelativeConversation'



// import {
//     Table,

//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"

interface IMessage {
    name: string
    email: string
    subject: string
    day:string
}

interface IProps {
    thread: IMessage[]
}


// функция для даты
export const formattedDate = (date: string): string => {
    const dateObj = new Date(date)
    const today = new Date()

    // Проверяем, является ли дата сегодняшним днем
    const isToday =
        dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear()

    if (isToday) {
        // Форматируем как время, если это сегодняшний день
        const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
        return dateObj.toLocaleString('en-US', options)
    } else {
        // Форматируем как "день месяц", если это не сегодняшний день
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
        return dateObj.toLocaleString('en-US', options)
    }
}





export const HeaderChat: FC<IProps> = ({ thread }) => {
    const [isImportant, setIsImportant] = useState(false)

    const{containerRef, textRef} = useTextLayoutHandlers()
    // console.log('isimportant', isImportant)

   
    return (
        <div>
            
                
                <RelatedConversation/>
                        
                
                <table className={cn('flex-col  border-b pt-base-x1 table-fixed')}>
                {thread.map((item, index) => (
                    <tbody key={index} className='border-b border-divider-light' >
                        <tr className='h-[40px] '>
                            <td ref={containerRef} className=' p-0 mr-[8px]'>
                                <Typography ref={textRef} variant='button-default' className={cn('font-bold line-clamp-1')}>
                                    {item.name}
                                </Typography>
                            </td>
                            <td ref={containerRef} className=' w-full'>
                                <Typography ref={textRef} variant='calout' className='text-gray-500 line-clamp-1'>
                                    {item.email}
                                </Typography>
                            </td>
                            <td className='w-16 '></td>
                            <td className={cn(' w-[50px] overflow-hidden')}>
                                <Typography variant='label-date' className={cn('w-[50px] ')}>
                                     {formattedDate(item.day)}
                                </Typography>
                            </td>
                        </tr>
                    </tbody>
                ))}

                {thread.map((item, index) => (
                    <tbody key={index} className='border-b border-divider-light' >
                        <tr className='h-[40px] bg-white'>
                            <td   className='w-full pr-[8px] '>
                                <Typography ref={textRef} variant='h4' className='line-clamp-1 font-bold '>
                                    {item.subject}
                                </Typography>
                                
                            </td>
                            <td ref={containerRef} className=' w-[36px] p-0 mr-0 '>
                                <button onClick={() => setIsImportant(!isImportant)}>
                                    <Image src={Important} alt='Important Icon' className='w-[15px] h-[14px] flex' />
                                </button>
                            </td>
                            
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}
