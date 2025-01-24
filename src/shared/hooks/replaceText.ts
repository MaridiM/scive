import React, { useState, useRef, useEffect } from 'react';

// import { LayoutChangeEvent } from 'react-native'
// import { useState } from 'react'

// export const useTextLayoutHandlers = (onTextOverflow?: (isOverflowed: boolean) => void) => {
//     const [containerWidth, setContainerWidth] = useState(0)
//     const [textWidth, setTextWidth] = useState(0)

//     const handleContainerLayout = (event: LayoutChangeEvent) => {
//         setContainerWidth(event.nativeEvent.layout.width)
        
//     }


//     const handleTextLayout = (event: LayoutChangeEvent) => {
//         const { width } = event.nativeEvent.layout
//         setTextWidth(width)
//         if (width > containerWidth && onTextOverflow) {
//             onTextOverflow(true)
//         } else if (onTextOverflow) {
//             onTextOverflow(false)
//         }
//     }

//     return { handleContainerLayout, handleTextLayout , containerWidth, textWidth }
// }



export function useTextLayoutHandlers(){
    const [containerWidth, setContainerWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)
}