"use client";

import { IoAddCircleOutline, IoSendSharp } from "react-icons/io5";
import DiaryCard from "~/components/diaryCard";
import Tag from "~/components/tag";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

const diary = {
    diary: [
        {
            tag: ["A", "お出かけ"],
            context:
                "Aさんと○○へ行き、xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            date: "2024-11-21",
        },
        {
            tag: ["B", "旅行"],
            context: "Bさんと△△へ行き、xxxxxxxxxxxxxxxxxxxxx",
            date: "2024-11-01",
        },
        {
            tag: ["C", "仕事"],
            context: "Cさんと□□へ行き、xxxx",
            date: "2024-10-10",
        },
        {
            tag: ["D", "ねむい"],
            context: "ねむいでござんす",
            date: "2024-10-9",
        },
    ],
};

/* UI表示テスト用ページ */
export default function Page() {
    const filteredDiary = diary.diary.filter((d) =>
        JSON.stringify(d).includes(""),
    );
    const tagList: string[] = ["タグ1", "タグ2"]

    return (
        // 背景: bg-red-50
        <div className="flex items-center justify-center bg-red-50">
            <div className="w-full max-w-md flex items-start flex-col">
                {/* ボタンUI */}
                <div className="mb-5">
                    <Label className="text-lg block">ボタン</Label>
                    <Button className="bg-red-400 hover:bg-rose-500">塗りつぶしボタン</Button>
                    <Button className="bg-white hover:bg-red-400 text-red-400 hover:text-white border border-red-400 hover:border-transparent">枠つきボタン</Button>
                </div>

                {/* インプット */}
                <div className="mb-5">
                    <Label className="text-lg block">入力欄</Label>
                    <Input />
                </div>

                {/* チャット欄 */}
                <div className="mb-5">
                    <Label className="text-lg block">チャット</Label>
                    <div className="flex space-x-2 mb-3 items-end">
                        <textarea rows={4} className="p-1 resize-none border rounded focus:outline-none" />
                        <IoSendSharp style={{ color: "#f87171", fontSize: '25px' }} />
                    </div>
                </div>

                {/* 可変テキストエリア */}
                {/* <div className="mb-5">
                    <Label className="text-lg block">高さが変わるテキストエリア</Label>
                    <ResizeTextarea className="resize-none border rounded focus:outline-none mb-3" defaultValue="初期値" />
                </div> */}

                {/* タグ(見た目のみ) */}
                <div className="mb-5">
                    <Label className="text-lg block">タグ</Label>
                    <div className="flex items-center mb-3">
                    {tagList.map((tag, tagIndex) => (
                            <Tag key={tagIndex} text={tag} />
                        ))}
                    <IoAddCircleOutline style={{ color: "#f87171", fontSize: '35px' }} />
                    </div>
                </div>

                {/* ラジオボタン */}
                <div className="mb-5">
                    <Label className="text-lg block">ラジオボタン</Label>
                    <RadioGroup defaultValue="private">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" className="border-red-400" />
                            <Label htmlFor="public">公開</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="private" className="border-red-400" />
                            <Label htmlFor="private">非公開</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* カード */}
                <div className="mb-5">
                    <Label className="text-lg block">カード</Label>
                    {/* wは仮 */}
                    <Card className="w-[350px] shadow-none">
                        <CardContent className="p-3">
                            出力された日記、チャット文、フィードバックなどを表示する際の白枠
                        </CardContent>
                    </Card>
                </div>

                {/* プルダウン */}
                <div className="mb-5">
                    <Label className="text-lg block">プルダウン</Label>
                    <div className="flex items-center space-x-2">
                        <Select>
                            <SelectTrigger className="px-3 focus-visible:ring-0">
                                <SelectValue placeholder="あなたの気持ちを" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="one">要素１</SelectItem>
                                    <SelectItem value="two">要素２</SelectItem>
                                    <SelectItem value="three">要素３</SelectItem>
                                    <SelectItem value="four">要素４</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <span className="whitespace-nowrap">深堀る！</span>
                    </div>
                </div>

                {/* 日記カード */}
                <div className="mb-5">
                    <Label className="text-lg block">日記カード</Label>
                    {
                        filteredDiary.length > 0 ? (
                            filteredDiary.map((d, index) => (
                                // 日記カード表示
                                <DiaryCard key={index} d={d} index={index} />
                            ))
                        ) : (
                            <p className="text-center text-gray-400">
                                該当する日記はありません。
                            </p>
                        )
                    }
                </div>
            </div>
        </div >
    )
}