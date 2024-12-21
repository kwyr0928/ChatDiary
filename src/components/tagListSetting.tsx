"use client";

import { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { Checkbox } from "~/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useThemeStore } from "~/store/themeStore";
import { Button } from "./ui/button";

export default function TagListSetting(props: { initialList: string[], onDeleteTags: (updatedTags: string[]) => void }) {
    const theme = useThemeStore((state) => state.theme);
    const { initialList, onDeleteTags } = props
    const [tagList, setTagList] = useState<string[]>(initialList) // タグリスト
    const [deleteTags, setDeleteTags] = useState<string[]>([]) // 削除するタグ
    const [isOpen, setIsOpen] = useState(false); // タグ削除確認ダイアログ
    const [error, setError] = useState("");

    const deleteTag = () => {
        setTagList(() =>
            tagList.filter((tag) => (!deleteTags.includes(tag))))
        onDeleteTags(deleteTags)
        setDeleteTags([])
        setIsOpen(false)
    }

    const listClassName = () => {
        const classes = ["mb-5 rounded-lg border w-full bg-white flex flex-col"]

        if(tagList.length <= 1) classes.push("h-23")
        if(tagList.length == 2) classes.push("h-30")
        if(tagList.length == 3) classes.push("h-44")
        if(tagList.length >= 4) classes.push("h-52")

        return classes.join(" ");
    }

    return (
        <div className={listClassName()}>
            <div className="flex items-center justify-between pr-3 py-2">
                <span className="text-lg font-bold pl-3 text-gray-600">タグ一覧</span>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <button
                        onClick={() => {
                            if (deleteTags.length !== 0) {
                                setIsOpen(true);
                                setError("");
                            } else {
                                setIsOpen(false);
                                setError("タグを選択してください"); // 条件が false のときに実行
                            }
                        }}
                        className="pl-5"
                    >
                        <IoTrashSharp color="#9ca3af" size="25px" />
                    </button>
                    {isOpen && (
                        <DialogContent className="w-[80%]">
                            <DialogHeader>
                                <DialogTitle className="mt-5">チェックしたタグを削除しますか？</DialogTitle>
                                <DialogDescription>
                                    日記からもそのタグが削除されます。
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-around">
                                <div className="my-2">
                                    <Button
                                        className={`w-[100px] rounded-full bg-white hover:bg-theme${theme}-primary text-theme${theme}-primary hover:text-white border border-theme${theme}-primary hover:border-transparent`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        いいえ
                                    </Button>
                                </div>
                                <div className="my-2">
                                    <Button
                                        className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
                                        onClick={deleteTag}
                                    >
                                        はい
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    )}
                </Dialog>
            </div>
            {error && <p className="text-red-500 text-sm mb-2 pl-2">{error}</p>}
            <ScrollArea className="flex-1 overflow-auto">
                {tagList.length !== 0 ?
                    (tagList.map((tag, tagIndex) => (
                        <div key={tagIndex}>
                            <Separator />
                            <div className="py-2 space-x-1 pl-3 flex items-center">
                                <Checkbox
                                    checked={deleteTags?.includes(tag)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                            ? setDeleteTags((prevDeleteTags) => [...prevDeleteTags, tag])
                                            : setDeleteTags(deleteTags.filter((deleteTag) => (deleteTag !== tag)))
                                    }}
                                    className={`border-theme${theme}-primary data-[state=checked]:bg-theme${theme}-primary data-[state=checked]:border-theme${theme}-primary`}
                                />
                                <label className="text-base text-gray-600 pl-1">{tag}</label>
                            </div>
                        </div>
                    )))
                    : (<div className="py-2 space-x-1 pl-3 flex items-center">
                        <label className="text-base text-gray-600 pl-1">タグがまだ登録されていません</label>
                    </div>
                    )
                }
            </ScrollArea>
        </div>
    )

}
