import { Content, Typography } from '@/shared/components'
import { parseStringToList } from '@/shared/utils'

import { MESSAGE_DETAILS } from '@/enitites/api'

export function MessageDetail() {
    return (
        <Content
            placeholder='Here you will see the AI-generated details of the selected email'
            showPlaceholder={!MESSAGE_DETAILS.length}
            loadingText='Generate message summary'
            loading={false}
        >
            <ul className='flex flex-1 flex-col overflow-y-auto pr-1'>
                {parseStringToList(MESSAGE_DETAILS).length > 1
                    ? parseStringToList(MESSAGE_DETAILS).map((item: string, idx: number) => (
                          <li key={idx} className='mb-0.5'>
                              <Typography variant='body'>{item}</Typography>
                          </li>
                      ))
                    : MESSAGE_DETAILS}
            </ul>
        </Content>
    )
}
