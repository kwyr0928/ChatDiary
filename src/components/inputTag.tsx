"use client";

import { useState } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import Tag from "./tag";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "./ui/popover";

// タグ編集フォームUI
export default function InputTag(props: { initialTags: string[], onChangeTags: (updatedTags: string[]) => void }) {
    const maxTagLength: number = 12
    const { initialTags, onChangeTags = () => { } } = props
    const [tags, setTags] = useState<string[]>(initialTags)
    const [text, setText] = useState<string>("")
    const [error, setError] = useState("")
    const tagList: string[] = ["タグ1", "タグ2"]
    const [open, setOpen] = useState(false)
    // 入力されている状態でenterキーが押されたとき実行
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Enterキーのデフォルト動作（改行）を無効化
            addTags(text)
        }
    }

    // エラー確認
    const errorCheck = (tag: string) => {
        if (tag === "") {
            return '作成するタグの名前を入力してください'
        } else if (tag.length > maxTagLength) {
            return `${maxTagLength}文字以内で入力してください`
        } else if (tags.includes(tag)) {
            return "このタグはすでに追加されています"
        }
        return ""
    }

    // 文字列をタグに追加し、入力欄を空にする
    const addTags = (newItem: string) => {
        const errorMes = errorCheck(newItem.trim()) // エラー確認
        setError(errorMes)
        if (errorMes.length === 0) {
            setTags((prevItems) => [...prevItems, newItem.trim()]); // 新しい配列を作成
            onChangeTags(tags)
            setText("")
        }
    };

    // タグを削除
    const removeTag = (removeItem: string) => {
        setTags((prevItems) => prevItems.filter((item) => item !== removeItem))
        onChangeTags(tags)
    }

    return (
        <div className="w-full flex flex-col items-start justify-center">
            <Card className="shadow-none">
                <CardContent className="p-3">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {tags.map((tag, tagIndex) => (
                            <Tag key={tagIndex} text={tag} onRemoveTag={(removeItem) => removeTag(removeItem)} />
                        ))}
                        {/* <IoAddCircleOutline style={{ color: "#f87171", fontSize: '35px' }} /> */}
                    </div>
                    <div className="flex items-center mb-2">
                        <Input className="w-3/4 mr-3 border-red-400" placeholder={`タグを追加（最大${maxTagLength}文字） `} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} value={text} />
                        <Button className="bg-red-400 hover:bg-rose-500" onClick={() => addTags(text)} >追加</Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    {/* タグ一覧リスト */}
                    <div className="flex items-center mb-1">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="border border-red-400 focus-visible:ring-0 focus-visible:ring-offset-0 font-normal text-base text-muted-foreground w-3/4 hover:bg-rose-50"
                                >
                                    <div className="flex items-center w-full justify-between">
                                        <span>タグ履歴から選ぶ</span>
                                        <LuChevronsUpDown />
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="検索" />
                                    <CommandList>
                                        <CommandEmpty>該当するタグがありません</CommandEmpty>
                                        <CommandGroup>
                                            {tagList.map((tagItem, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={tagItem}
                                                // onSelect={(currentValue) => {
                                                //     setValue(currentValue === value ? "" : currentValue)
                                                //     setOpen(false)
                                                // }}
                                                >
                                                    {tagItem}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
// TODO: タグ一覧を閲覧、選択できるようにする