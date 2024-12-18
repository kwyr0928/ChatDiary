"use client";

import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import Tag from "./tag";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "./ui/command";
import { Input } from "./ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "./ui/popover";
import { Separator } from "./ui/separator";

// タグ編集フォームUI
export default function InputTag(props: { initialTags: string[], initialTagList: string[], onChangeTags: (updatedTags: string[]) => void }) {
    const maxTagLength: number = 12
    const { initialTags, initialTagList, onChangeTags = () => { } } = props
    const [tags, setTags] = useState<string[]>(initialTags)
    const [text, setText] = useState<string>("")
    const [error, setError] = useState("")
    const [tagList, setTagList] = useState(initialTagList)
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
            setTags((prevItems) => {
                const updatedTags = [...prevItems, newItem.trim()];
                return updatedTags;
            }); // 新しい配列を作成
            setText("")
            if (!tagList.includes(newItem)) {
                setTagList((prevItems) => [...prevItems, newItem.trim()])
            }
        }
    };

    useEffect(() => {
        onChangeTags(tags); // レンダリング完了後に状態を親に通知
    }, [tags, onChangeTags]);

    // タグを削除
    const removeTag = (removeItem: string) => {
        setTags((prevItems) => prevItems.filter((item) => item !== removeItem))
    }

    return (
        <div className="w-full flex flex-col items-start justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {tags.length !== 0 ? (
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        {tags.map((tag, tagIndex) => (
                            <Tag key={tagIndex} text={tag} onRemoveTag={(removeItem) => removeTag(removeItem)} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center"></div>
                )}
                {/* タグ一覧リスト */}
                <div className="flex items-center w-full mb-2">
                    <div className="flex h-10 rounded-md border border-input bg-background text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none md:text-sm w-4/5 mr-3 border-red-400">
                        <Input
                            type="text"
                            className="bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                            placeholder={`タグを追加（最大${maxTagLength}文字） `}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={text}
                        />
                        <Separator orientation="vertical" />
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="bg-transparent acitve:bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                                >
                                    <IoChevronDownSharp />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="検索" />
                                    <CommandList>
                                        <CommandEmpty>タグがありません</CommandEmpty>
                                        <CommandGroup>
                                            {tagList.map((tagItem, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={tagItem}
                                                    onSelect={(currentValue) => {
                                                        setText(currentValue)
                                                        //setOpen(false)
                                                    }}
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
                    <Button
                        className="bg-red-400 hover:bg-rose-500"
                        onClick={() => addTags(text)} >追加
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            </div>
        </div>
    )
}
// TODO: タグ一覧を閲覧、選択できるようにする