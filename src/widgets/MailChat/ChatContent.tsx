import React, { useState, useRef, useLayoutEffect} from 'react';
// import {  Messages} from './Messages';



export function ChatContent(){

    const scrollViewRef = useRef<HTMLDivElement | null>(null)
	const [count, setCount] = useState(6)
	const [visibleScrollDown, setVisibleScrollDown] = useState(false)

	const scrollDown = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            top: scrollViewRef.current.scrollHeight,  
            behavior: 'smooth', 
          });
          setCount(0);
        }
      };

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const currentScrollY = event.currentTarget.scrollTop;
		const scrollViewHeight = event.currentTarget.clientHeight;
		const contentHeight = event.currentTarget.scrollHeight;
		const isAtBottom = currentScrollY >= contentHeight - scrollViewHeight

		if (isAtBottom) {
			setVisibleScrollDown(false)
		} else {
			setVisibleScrollDown(true)
		}
	}

	useLayoutEffect(() => {
		if (scrollViewRef.current) {
			// Прокрутка ScrollView в самый низ
			scrollViewRef.current.scrollTo({ top: scrollViewRef.current.scrollHeight,  
                behavior: 'smooth', })
		}
	}, [])

    return (
        <div 
        ref={scrollViewRef}
        onScroll={handleScroll}
		className='pl-base-x4 relative flex-1 mr-base-x2'
        >
          <p>Chat content </p>
		   
		  {/* <Messages /> */}
       </div>
    )
}