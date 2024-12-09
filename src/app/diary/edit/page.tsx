"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoAddCircleOutline,
  IoCheckmarkSharp,
  IoChevronBackSharp,
  IoPersonCircleSharp,
  IoTrashSharp
} from "react-icons/io5";
import ResizeTextarea from "~/components/resizeTextarea";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/hooks/use-toast";
import ChatCard from "~/components/chatCard";
import InputTag from "~/components/inputTag";

export default function Page() {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [text, setText] = useState(
    "栗が好きなAさんを誘い、パフェを食べに行った。私はさつまいものアイスが乗ったパフェで、Aさんは栗のパウンドケーキが乗ったパフェだった。私が見つけた店で喜んでくれて嬉しい。彼女が喜ぶ店をまた探したいと思った。"
  );
  const initialTags: string[] = ["タグ1", "タグ2"]
  const [nowTags, setTags] = useState<String[]>(initialTags)

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="fixed top-0 max-w-md flex w-full items-center justify-between pt-5 text-center bg-red-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger onClick={() => setIsOpen(true)} className="pl-3">
            <IoChevronBackSharp color="#f87171" size={"30px"} />
          </DialogTrigger>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle className="mt-5">編集内容を削除して戻りますか？</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-gray-500">
              編集内容は反映されません
            </DialogDescription>
            <div className="flex justify-around">
              <div className="my-2">
                <Button
                  className="w-[100px] rounded-full bg-white hover:bg-red-400 text-red-400 hover:text-white border border-red-400 hover:border-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  いいえ
                </Button>
              </div>
              <Link href={"/diary/detail"}>
                <div className="my-2">
                  <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                    はい
                  </Button>
                </div>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
        <p className="text-lg text-gray-700">2024/10/2</p>
        <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
          <DialogTrigger onClick={() => setIsOpen2(true)} className="pr-5">
            <IoTrashSharp color="gray" size={"35px"} />
          </DialogTrigger>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle className="mt-5">日記を削除しますか？</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-gray-500">
              この操作は元に戻せません
            </DialogDescription>
            <div className="flex justify-around">
              <div className="my-2">
                <Button
                  className="w-[100px] rounded-full bg-white hover:bg-red-400 text-red-400 hover:text-white border border-red-400 hover:border-transparent"
                  onClick={() => setIsOpen2(false)}
                >
                  いいえ
                </Button>
              </div>
              <Link href={"/home"}>
                <div className="my-2">
                  <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500" onClick={() => {
                    toast({
                      title: "日記を削除しました。",
                    })
                  }}>
                    はい
                  </Button>
                </div>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-[60px] mb-auto w-[85%]">
        <div className="flex items-center justify-start space-x-5">
          <p className="my-2 text-lg">日記本文</p>
          <Link href={"/diary/detail"}>
            <IoCheckmarkSharp size={"23px"} color="#f87171" onClick={() => {
              toast({
                title: "保存しました。",
              })
            }} />
          </Link>
        </div>
        <ResizeTextarea className="resize-none focus:outline-none w-full text-gray-600  h-36 px-5 py-3 rounded border border-gray-300 p-2" text={text} onChange={setText} />
        <p className="mb-2 mt-5 text-left text-lg">タグ</p>
        <div className="flex gap-3">
          <InputTag initialTags={initialTags} onChangeTags={setTags} />
          {/* <Tag text="food" />
          <Tag text="Aちゃん" />
          <IoAddCircleOutline
            color="#f87171"
            size={"30px"}
            className="mt-0.5"
          /> */}
        </div>
        <p className="mb-2 mt-5 text-left text-lg">公開範囲</p>
        {/* ラジオボタン */}
        <div className="mb-8">
          <RadioGroup defaultValue="private" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="public"
                id="public"
                className="border-red-400"
              />
              <Label htmlFor="public">公開</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="private"
                id="private"
                className="border-red-400"
              />
              <Label htmlFor="private">非公開</Label>
            </div>
          </RadioGroup>
        </div>
        <p className="my-2 text-lg">チャットログ</p>
      </div>
      <div className="mb-auto">
        <ChatCard isAI={false}>
          Aさんとパフェを食べに行った。 先週私が誘ったやつ。美味しかった
        </ChatCard>
        <ChatCard isAI={true}>
          なぜAさんを誘ったのですか？
        </ChatCard>
      </div>
    </div>
  );
}
