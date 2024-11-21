"use client";

import Link from "next/link";
import { useState } from "react";
import { IoBarChartSharp, IoCogSharp, IoHomeSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const user = {
  id: "nekoneko",
  mail: "nekoneko@gmail.com",
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto flex min-h-screen max-w-md w-full flex-col items-center bg-red-50 text-gray-600">
      <div className="mr-auto ml-8">
        <p className="mt-12 text-xl font-bold w-full text-left">アカウント情報</p>
        <p className="mt-4 text-md w-full text-left">ユーザーID：{user.id}</p>
        <p className="mt-2 text-md w-full text-left">メールアドレス：{user.mail}</p>
      </div>
      <Link href={"/signin"} className="mt-12 w-[60%]">
        <div className="w-full">
          <Button className="rounded-full bg-gray-400 hover:bg-gray-500 w-full">
            ログアウトする
          </Button>
        </div>
      </Link>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="mt-6 mb-auto w-[60%]">
          <Button
            className="rounded-full bg-red-400 hover:bg-rose-500 w-full"
            onClick={() => setIsOpen(true)}
          >
            アカウントを削除する
          </Button>
        </div>
        <DialogContent className="w-[80%]">
          <DialogHeader>
            <DialogTitle className="mt-3">本当に退会しますか？</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-gray-500">
            作成した日記はすべて削除されます
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
            <Link href={"/setting/delete/complete"}>
              <div className="my-2">
                <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                  はい
                </Button>
              </div>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="#f87171" />
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
