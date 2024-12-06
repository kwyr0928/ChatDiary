"use client";

import Link from "next/link";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import {
  IoBarChartSharp,
  IoChevronBackSharp,
  IoCogSharp,
  IoHomeSharp,
  IoPersonCircleSharp,
  IoTrashSharp,
} from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { useToast } from "~/hooks/use-toast";

export default function Page() {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="fixed top-0 flex w-full max-w-md items-center justify-center pt-5 text-center pb-3 bg-red-50">
        <Link className="fixed left-3" href={"/home"}>
          <IoChevronBackSharp color="#f87171" size={"30px"} />
        </Link>
        <p className="text-lg text-gray-700">2024/10/2</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger onClick={() => setIsOpen(true)} className="fixed right-5">
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
                  onClick={() => setIsOpen(false)}
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
      <div className="mt-[60px] mb-[120px] w-[85%]">
        <div className="flex items-center justify-start space-x-5">
          <p className="my-2 text-lg">日記本文</p>
          <Link href={"/diary/edit"}>
            <GoPencil size={"23px"} color="gray" />
          </Link>
        </div>
        {/* カード */}
        <Card className="text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
            <p className="text-red-400 pt-1 pb-2">#A #お出かけ</p>
            栗が好きなAさんを誘い、パフェを食べに行った。私はさつまいものアイスが乗ったパフェで、Aさんは栗のパウンドケーキが乗ったパフェだった。私が見つけた店で喜んでくれて嬉しい。彼女が喜ぶ店をまた探したいと思った。
          </CardContent>
        </Card>
        <p className="mt-8 mb-2 text-lg">チャットログ</p>
        <div className="mb-auto">
          {/* カード */}
          <Card className="mb-5 ml-auto w-[70%] text-gray-600 shadow-none">
            <CardContent className="px-5 py-3">
              Aさんとパフェを食べに行った。 先週私が誘ったやつ。美味しかった
            </CardContent>
          </Card>
          <div className="mr-auto flex">
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
        </div>
      </div>
      <div className="fixed bottom-0 max-w-md flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
