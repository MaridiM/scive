import  { useState, useRef, useEffect } from 'react';


type OnTextOverflow = (isOverflowed: boolean) => void;



export function useTextLayoutHandlers(onTextOverflow?:OnTextOverflow ) {
    const [containerWidth, setContainerWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);
  
    const containerRef = useRef<HTMLTableCellElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const container = containerRef.current;
      const text = textRef.current;
  
      if (!container || !text) return;
  
      const resizeObserver = new ResizeObserver(() => {
        setContainerWidth(container.offsetWidth);
        setTextWidth(text.offsetWidth);
  
        if (onTextOverflow) {
          onTextOverflow(text.offsetWidth > container.offsetWidth);
        }
      });
  
      resizeObserver.observe(container);
      resizeObserver.observe(text);
  
      return () => {
        resizeObserver.disconnect();
      };
    }, [onTextOverflow]);
  
    return { containerRef, textRef, containerWidth, textWidth };
  }