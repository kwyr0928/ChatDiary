"use client"

import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";
import { useToast } from "~/hooks/use-toast";

const user = {
  id: "nekoneko",
  mail: "nekoneko@gmail.com",
};

export default function Page() {
  const { toast } = useToast()
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Link href={"/signup/confirm"} className="absolute left-7 top-9">
        <IoChevronBackSharp color="#f87171" size={"30px"} />
      </Link>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="mb-8 mt-2 text-xl font-bold">メールアドレス認証</p>
        <p className="mb-10 text-center leading-8">
          <span className="text-xl">{user.mail}</span>
          <br />
          へメールを送信しました。
          <br />
          メールに記載されているURLを
          <br />
          開いて登録を完了させてください。
        </p>
        <Link href={"/signup/send"} className="border-b" onClick={() => {
        toast({
          title: "メールを再送しました。",
        })
      }}>
          メールを再送
        </Link>
      </div>
      {/* 実装完了次第削除予定 */}
      <div className="absolute bottom-0 flex flex-col">
        <Link href={"/signup/complete"}>
          <button type="button" className="bg-red-400 px-3 py-1 text-white">
            メール内URLをクリック
          </button>
        </Link>
        <Link href={"/signup/expired"}>
          <button type="button" className="bg-red-400 px-3 py-1 text-white">
            メール内URLをクリック（期限切れ）
          </button>
        </Link>
      </div>
    </div>
  );
}
