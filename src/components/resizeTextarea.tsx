"use client";

import { useEffect, useRef, useState } from "react";

// 可変テキストエリア
export default function ResizeTextarea(props: { className: string, text: string, onChange?: (newValue: string) => void, onKeyDown?: (newValue: string) => void }) {
    const { className, text, onChange = () => { }, onKeyDown = () => { } } = props
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        onChange(e.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const returnValue = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onKeyDown(value)
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [])

    return (
        <textarea ref={textareaRef} rows={1} onChange={resize} onKeyDown={returnValue} className={className} style={{ resize: 'none', bottom: 0, overflow: "hidden" }} value={text} />
    )
}