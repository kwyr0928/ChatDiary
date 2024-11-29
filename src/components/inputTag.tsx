"use client";

//import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import Tag from "./tag";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

// タグ編集フォームUI
export default function InputTag(props: { initialTags: string[], onChangeTags: (updatedTags: string[]) => void }) {
    const maxTagLength: number = 12
    const { initialTags, onChangeTags = () => { } } = props
    const [tags, setTags] = useState<string[]>(initialTags)
    const [text, setText] = useState<string>("")
    const [error, setError] = useState("")

    // 入力されている状態でenterキーが押されたとき実行
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Enterキーのデフォルト動作（改行）を無効化
            addTags(text)
        }
    }

    // エラー確認
    const errorCheck = (tag: string) => {
        if(tag.trim() === ""){
            return '作成するタグの名前を入力してください'
        }else if (tag.length > maxTagLength){
            return `${maxTagLength}文字以内で入力してください`
        }
        return ""
    }

    // 文字列をタグに追加し、入力欄を空にする
    const addTags = (newItem: string) => {
        const errorMes = errorCheck(newItem) // エラー確認
        setError(errorMes)
        if (errorMes.length === 0) {
            setTags((prevItems) => [...prevItems, newItem]); // 新しい配列を作成
            onChangeTags(tags)
            setText("")
        }
    };

    return (
        <div>
            <Card className="w-[350px] shadow-none">
                <CardContent className="p-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {tags.map((tag, tagIndex) => (
                            <Tag key={tagIndex} text={tag} />
                        ))}
                        {/* <IoAddCircleOutline style={{ color: "#f87171", fontSize: '35px' }} /> */}
                    </div>
                    <div className="flex items-center mb-2">
                        <Input className="w-3/4 mr-4 border-red-400" placeholder={`タグを追加（最大${maxTagLength}文字） `} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} value={text} />
                        <Button className="bg-red-400 hover:bg-rose-500" onClick={() => addTags(text)} >追加</Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                </CardContent>
            </Card>
        </div>
    )
}

// TODO:
// 同じタグを追加しない