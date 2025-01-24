import { Typography } from "@/shared/components"
import {CHAT_MESSAGES} from '@/enitites/api/chat'

    interface IMessageMetadata {
        cc: never[];
        id: string;
        to: string[];
        bcc: never[];
        from_: string;
        labels: string[];
        snippet: string;
        subject: string;
        user_id: string;
        thread_id: string;
        created_at: string;
        references: never[];
        in_reply_to: null | string;
        provider_message_id: string;
    }
    
 export function Messages ()  {
    


    const data = CHAT_MESSAGES.map((item) => {
        const messageData = item.messages[0]
        
         console.log('messageData',messageData)
         return messageData
    });


    // const renderMessages = (messages: IMessageMetadata[]) => {
    //     return CHAT_MESSAGES.map((message: any, index: number) => {
    //         const isSameSenderAsPrevious =
    //             index > 0 && message.metadata.from_ === messages[index - 1].metadata.from_
    //         const isSameSenderAsNext =
    //             index < messages.length - 1 && message.metadata.from_ === messages[index + 1].metadata.from_

            // const formatMessageGroup =
            //     index > 0 &&
            //     formatDateToDayMonth(message.metadata.created_at) ===
            //         formatDateToDayMonth(messages[index - 1].metadata.created_at || '')



            // return (
                // <div key={index}>
                //     <Typography
                //         variant='h4'
                //         className={cn(
                //             'font-bold text-black-700 text-center mt-base-x2 mb-base-x4',
                //             text.boldText
                //         )}>
                //         {/* {!formatMessageGroup && formatDateToDayMonth(message.metadata.created_at)} */}
                //     </Typography>

                //     {/* <MessageBubble
                //         message={message}
                //         showAvatar={!isSameSenderAsPrevious}
                //         showDate={!isSameSenderAsNext}
                //         iAmSender={message.metadata.from_.includes(me)}
                //     /> */}
                // </div>
            // )
        // })
    // }

    return (
        <div
            // className={cn(
            //     // 'flex-col mr-base-x2 max-w-[600px]',
            //     'flex-col mr-base-x2',
            //     size === 'small' && 'max-w-full',
            //     size === 'large' && 'm-auto'
            // )}
            style={{ gap: 8 }}>
            {/* {!courseCompleted && courseCompleted !== undefined
                ? renderMessages(fakeChatApi[0].messages)
                : (messagesType === 'digests' &&
                  !!digestThreads.length &&
                  renderMessages(digestThreads[0].messages))}
            {messagesType === 'threads' && !!thread && renderMessages(thread.messages)} */}
        </div>
    )
}

export default Messages
