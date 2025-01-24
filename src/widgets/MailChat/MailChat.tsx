import { FC } from "react";
import { HeaderChat } from "./HeaderChat";
import {CHAT_MESSAGES} from '@/enitites/api/chat'

// interface IMessageMetadata {
//     cc: never[];
//     id: string;
//     to: string[];
//     bcc: never[];
//     from_: string;
//     labels: string[];
//     snippet: string;
//     subject: string;
//     user_id: string;
//     thread_id: string;
//     created_at: string;
//     references: never[];
//     in_reply_to: null | string;
//     provider_message_id: string;
// }

interface IMessage {
    name: string;
    email: string;
    subject: string;
}
interface IProps {
    thread: IMessage[];
}
export const MailChat:FC<IProps> = ({thread})=>{

    const data = CHAT_MESSAGES.map((item) => {
        const subject= item.messages[0].metadata.subject;
         const name = item.messages[0].metadata.from_;
         const titleEmail = name.replace(/^.*<([^>]+)>$/, '<$1>');
         const titleName = name.replace(/^"(.*?)".*$/, '$1')
         
         return { name: titleName, email: titleEmail, subject }
    });
        
    return(
        <div>
            <HeaderChat thread={data} />
        </div>
    )
}