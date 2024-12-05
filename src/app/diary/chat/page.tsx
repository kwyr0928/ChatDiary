"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoChevronBackSharp,
  IoPersonCircleSharp,
  IoSendSharp,
} from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="fixed top-0 mb-5 flex w-full flex-col justify-center bg-white pt-5 text-center">
        <div className="mb-3 flex">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className="pl-5">
              <IoChevronBackSharp color="#f87171" size={"30px"} />
            </DialogTrigger>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="mt-5">編集内容を削除して戻りますか？</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-center text-gray-500">
                作成した日記は削除されます
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
                <Link href={"/home"}>
                  <div className="my-2">
                    <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                      はい
                    </Button>
                  </div>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
          <p className="my-auto mr-12 w-[95%] text-lg text-gray-700">
            2024/10/2
          </p>
        </div>
        {/* プルダウン */}
        <div className="mx-auto mb-3 w-fit">
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="px-3 focus-visible:ring-0">
                <SelectValue placeholder="あなたの気持ちを" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="one">要素１を</SelectItem>
                  <SelectItem value="two">要素２を</SelectItem>
                  <SelectItem value="three">要素３を</SelectItem>
                  <SelectItem value="four">要素４を</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap">深堀る！</span>
          </div>
        </div>
      </div>
      <div className="mt-[130px] mb-[60px]">
        {/* カード */}
        <Card className="mb-5 ml-auto mr-3 w-[70%] text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
            Aさんとパフェを食べに行った。 先週私が誘ったやつ。美味しかった
          </CardContent>
        </Card>
        <div className="ml-3 mr-auto flex">
          <IoPersonCircleSharp
            size={"35px"}
            color="gray"
            className="mr-2 mt-2"
          />
          {/* カード */}
          <Card className="mb-5 w-[70%] text-gray-600 shadow-none">
            <CardContent className="px-5 py-3">
              なぜAさんを誘ったのですか？
            </CardContent>
          </Card>
        </div>
        {/* カード */}
        <Card className="mb-5 ml-auto mr-3 w-[70%] text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
            Aさんとパフェを食べに行った。 先週私が誘ったやつ。美味しかった
          </CardContent>
        </Card>
      </div>
      {/* チャット欄 */}
      <div className="fixed bottom-0 w-full flex items-center justify-center space-x-2 pt-3 pb-5 bg-red-50">
        <textarea
          rows={1}
          className="w-[300px] resize-none rounded border p-1 focus:outline-none"
        />
        <IoSendSharp color="#f87171" size={"25px"} />
      </div>
      <Link href={"/diary/new"} className="absolute bottom-36">
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          日記作成へ（本来は自動遷移）
        </button>
      </Link>
    </div>
  );
}
