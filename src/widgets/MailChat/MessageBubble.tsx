// export function MessageBubble: FC<IMessageBubble> = ({ message, showAvatar, showDate, iAmSender }) => {
//     const { bg, text: textColor } = useColors()
//     const { metadata, html, plain } = message
    

//     export interface IMessages {
//         messagesType: 'threads' | 'digests'
//         courseCompleted?: boolean
//     }
//     export interface IMessageBubble {
//         message: IMessage
//         showAvatar: boolean
//         showDate: boolean
//         iAmSender: boolean
       
        
//     }
//     const sanitizedHtml = sanitizeHtml(html || '', {
//         allowedTags: [
//             'div',
//             'p',
//             'span',
//             'strong',
//             'a',
//             'h1',
//             'h2',
//             'h3',
//             'ul',
//             'li',
//             'table',
//             'tr',
//             'td',
//             'br',
//             'img'
//         ],
//         allowedAttributes: {
//             '*': ['style', 'align', 'href', 'src', 'alt', 'class'],
//             a: ['href', 'target'],
//             img: ['src', 'width', 'height', 'alt']
//         },
//         transformTags: {
//             '*': (tagName, attribs) => {
//                 if (attribs.style) {
//                     delete attribs.style
//                 }
//                 return {
//                     tagName,
//                     attribs
//                 }
//             }
//         }
//     })
    

//     return (
//         <View className={cn('flex-col items-start', iAmSender && 'ml-auto flex-col')} style={{ gap: 8 }}>
//             {showAvatar && (
//                 <View
//                     className={cn(
//                         'rounded-base-x16 bg-gray-400 items-center justify-center w-[44px] h-[44px]',
//                         iAmSender && 'ml-auto'
//                     )}>
//                     <Typography variant='h2' className='text-white'>
//                         A
//                     </Typography>
//                 </View>
//             )}
//             <View className={cn('flex-col overflow-hidden max-w-[724px]', iAmSender && 'items-end')}>
//                 <Typography
//                     variant='body'
//                     className={cn(
//                         'p-base-x2 rounded-base-x4 max-w-full',
//                         textColor.boldText,
//                         iAmSender ? bg.outcomingMessage : bg.inactiveSurface
//                     )}>
//                     {
//                         Platform.OS === 'web' && <div dangerouslySetInnerHTML={{ __html: html || '' }} />
//                     }
//                     {/* {html && (
//                         // <RenderHTML
//                         //     source={{
//                         //         html: DOMPurify.sanitize(html, {
//                         //             ALLOWED_TAGS: ['p', 'img', 'b', 'i', 'u', 'a', 'span', 'div'], // Разрешенные теги
//                         //             ALLOWED_ATTR: ['src', 'alt', 'href', 'style'], // Разрешенные атрибуты
//                         //             ADD_ATTR: ["style"], // Сохраняем стили
//                         //             ADD_TAGS: ["img"],   // Сохраняем теги img
//                         //         })
//                         //     }}
//                         //     // source={{ html: sanitizedHtml }}
//                         //     contentWidth={660}
//                         //     ignoredDomTags={['meta', 'link', 'style', 'script']}
//                         //     tagsStyles={{
//                         //         div: {
//                         //             maxWidth: 660
//                         //         }
//                         //     }}
//                         // />
//                     )} */}
//                     {!html && plain && plain}
//                     {!html && !plain && metadata.snippet}
//                 </Typography>

//                 {showDate && (
//                     <Typography
//                         variant='body'
//                         className={cn('pl-base-x2 pr-base-x2', textColor.disabledText)}>
//                         {metadata.created_at && formattedDate(metadata.created_at)}
//                     </Typography>
//                 )}
//             </View>
//         </View>
//     )
// }
// export default MessageBubble
