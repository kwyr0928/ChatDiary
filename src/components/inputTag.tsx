"use client";

//import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import Tag from "./tag";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export default function InputTag() {
    const tagList: string[] = ["タグ1", "タグ2"]
    const [tags, setTags] = useState<string[]>(tagList)
    const [text, setText] = useState<string>("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Enterキーのデフォルト動作（改行）を無効化
            addTags(text)
        }
    }

    const addTags = (newItem: string) => {
        setTags((prevItems) => [...prevItems, newItem]); // 新しい配列を作成
        setText("")
    };

    return (
        <div>
            <Card className="w-[350px] shadow-none">
                <CardContent className="p-2">
                    <div className="flex items-center mb-2">
                        {tags.map((tag, tagIndex) => (
                            <Tag key={tagIndex} text={tag} />
                        ))}
                        {/* <IoAddCircleOutline style={{ color: "#f87171", fontSize: '35px' }} /> */}
                    </div>
                    <div className="flex items-center mb-2">
                    <Input className="w-3/4 mr-4 border-red-400" placeholder="タグを追加" onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} value={text} />
                    <Button className="bg-red-400 hover:bg-rose-500" onClick={() => addTags(text)} >追加</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// TODO:
// タグが改行するようにする(カード幅が伸びる)
// 文字数上限を設ける
// 何も入力されていないときはタグ追加しない
// 同じタグを追加しない