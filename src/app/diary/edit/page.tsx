"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoAddCircleOutline,
  IoBarChartSharp,
  IoCheckmarkSharp,
  IoChevronBackSharp,
  IoCogSharp,
  IoHomeSharp,
  IoPersonCircleSharp,
  IoTrashSharp,
} from "react-icons/io5";
import Tag from "~/components/tag";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-red-50">
      <div className="flex w-full justify-around px-5 text-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          onClick={() => setIsOpen(true)}
        >
           <IoChevronBackSharp color="red" size={"30px"} />
        </DialogTrigger>
        <DialogContent className="w-[80%]">
          <DialogHeader>
            <DialogTitle>編集内容を取り消しますか？</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-gray-500">
            現在は保存していても表示されます　あらま
          </DialogDescription>
          <div className="flex justify-around">
            <button
              type="button"
              className="border border-red-400 px-3 py-1 text-red-400"
              onClick={() => setIsOpen(false)}
            >
              いいえ
            </button>
            <Link href={"/diary/detail"}>
              <button type="button" className="bg-red-400 px-3 py-1 text-white">
                はい
              </button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
        <p className="mb-2 w-[95%] text-gray-700">2024/10/2　22:10:32記録</p>
        <IoTrashSharp color="gray" size={"30px"} />
      </div>
      <ScrollArea className="ml-10 h-[600px] w-full">
        <div className="flex">
          <p className="mt-4">日記本文</p>
          <IoCheckmarkSharp size={"25px"} color="red" className="my-auto mt-4 ml-5"/>
        </div>
        <div className="h-[170px] w-[90%] rounded-md border bg-white p-5">
          栗が好きなAさんを誘い、パフェを食べに行った。私はさつまいものアイスが乗ったパフェで、Aさんは栗のパウンドケーキが乗ったパフェだった。私が見つけた店で喜んでくれて嬉しい。彼女が喜ぶ店をまた探したいと思った。
        </div>
        <p className="mt-5">タグ</p>
        <div className="flex gap-3">
          <Tag text="food" />
          <Tag text="Aちゃん" />
          <IoAddCircleOutline color="red" size={"30px"} className="mt-0.5" />
        </div>
        <p className="mt-5">公開範囲</p>
        <RadioGroup defaultValue="public" className="my-3">
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="public" id="public"/>
            <Label htmlFor="public">公開</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private">非公開</Label>
          </div>
        </RadioGroup>
        <p className="mt-5">チャットログ</p>
        <div className="h-[80px] w-[70%] ml-auto mr-10 my-2 rounded-md border bg-white p-4">
          Aさんとパフェを食べに行った。<br/>
          先週私が誘ったやつ。美味しかった
        </div>
       <div className="flex">
         <IoPersonCircleSharp size={"30px"} color="gray" className="my-auto mr-2"/>
         <div className="h-[60px] w-[60%] mr-auto rounded-md border bg-white p-4">
           なぜAさんを誘ったのですか？
         </div>
       </div>
       <div className="h-[80px] w-[70%] ml-auto mr-10 my-2 rounded-md border bg-white p-4">
          Aさんとパフェを食べに行った。<br/>
          先週私が誘ったやつ。美味しかった
        </div>
       <div className="flex">
         <IoPersonCircleSharp size={"30px"} color="gray" className="my-auto mr-2"/>
         <div className="h-[60px] w-[60%] mr-auto rounded-md border bg-white p-4">
           なぜAさんを誘ったのですか？
         </div>
       </div>
       <div className="h-[80px] w-[70%] ml-auto mr-10 my-2 rounded-md border bg-white p-4">
          Aさんとパフェを食べに行った。<br/>
          先週私が誘ったやつ。美味しかった
        </div>
       <div className="flex">
         <IoPersonCircleSharp size={"30px"} color="gray" className="my-auto mr-2"/>
         <div className="h-[60px] w-[60%] mr-auto rounded-md border bg-white p-4">
           なぜAさんを誘ったのですか？
         </div>
       </div>
      </ScrollArea>
      <div className="flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="red" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
