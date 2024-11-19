"use client";

import { useEffect, useRef, useState } from "react";

// 可変テキストエリア
export default function ResizeTextarea(props: {className: string}) {
    const { className } = props
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
        if(textareaRef.current){
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [])

    return(
        <textarea ref={textareaRef} rows={1} onChange={resize} className={className} style={{resize: 'none', bottom: 0, overflow: "hidden" }} value={text} />
    )
}