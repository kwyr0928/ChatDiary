"use client";

import Link from "next/link";
import { useState } from "react";
import { IoBarChartSharp, IoCogSharp, IoHomeSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-red-50">
      <p className="mr-auto">アカウント情報</p>
      <p className="mr-auto">ID 22fi000@ms.dendai.ac.jp</p>
      <Link href={"/signin"}>
        <button type="button" className="bg-gray-400 px-3 py-1 text-white">
          ログアウトする
        </button>
      </Link>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          className="bg-red-400 px-3 py-1 text-white"
          onClick={() => setIsOpen(true)}
        >
          アカウントを削除する
        </DialogTrigger>
        <DialogContent className="w-[80%]">
          <DialogHeader>
            <DialogTitle>本当に退会しますか？</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-gray-500">
            作成した日記はすべて削除されます
          </DialogDescription>
          <div className="flex justify-around">
            <button
              type="button"
              className="border border-red-400 px-3 py-1 text-red-400"
              onClick={() => setIsOpen(false)}
            >
              いいえ
            </button>
            <Link href={"/setting/delete/complete"}>
              <button type="button" className="bg-red-400 px-3 py-1 text-white">
                はい
              </button>
            </Link>
            {/* トーストありver */}
            {/* <Link href={"/signin"}>
              <button
                type="button"
                className="bg-red-400 px-3 py-1 text-white"
                onClick={() => {
                  toast({
                    title: "退会しました。",
                  });
                }}
              >
                はい
              </button>
            </Link> */}
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="red" />
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
