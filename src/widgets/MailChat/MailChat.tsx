import { FC } from "react";
import { HeaderChat } from "./HeaderChat";
import {CHAT_MESSAGES} from '@/enitites/api/chat'
import { ChatContent } from "./ChatContent";



interface IMessage {
    name: string;
    email: string;
    subject: string;
    day: string
}

interface IProps {
    thread: IMessage[];
}
export const MailChat:FC<IProps> = ({thread})=>{

    const data = CHAT_MESSAGES.map((item) => {
        const subject= item.messages[0].metadata.subject;
        const day = item.messages[0].metadata.created_at
         const name = item.messages[0].metadata.from_;
         const titleEmail = name.replace(/^.*<([^>]+)>$/, '<$1>');
         const titleName = name.replace(/^"(.*?)".*$/, '$1')
         
         return { name: titleName, email: titleEmail, subject , day}
    });
        
    return(
        <div>
            <HeaderChat thread={data} />
            <ChatContent />

        </div>
    )
}