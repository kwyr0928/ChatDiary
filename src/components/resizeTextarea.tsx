"use client";

import { useEffect, useRef } from "react";

// 可変テキストエリア
export default function ResizeTextarea(props: { className: string, text: string, onChange?: (newValue: string) => void, isLimit?: boolean }) {
    const { className, text, onChange, isLimit } = props
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
        onChange(e.target.value)
    }
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`

            // 最大高さ
            if(isLimit) textareaRef.current.style.maxHeight = `${4 * 1.5}em`;
        }
    }, [])

    return (
        <textarea ref={textareaRef} rows={1} onChange={resize} className={className} style={{ resize: 'none', bottom: 0, overflow: "hidden" }} value={text} />
    )
}