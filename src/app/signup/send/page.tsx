"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

export default function Send() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <Page />
       </Suspense>
  )
}

function Page() {
  const { toast } = useToast()
  const [user, setUser] = useState({
      email: "xxxx@gmail.com",
  });
  const params = useSearchParams();
  const email = params.get('email');

  useEffect (() => {
    console.log(email);
    if(!email){
      return;
    }
    setUser({
      email: email,
    })
  },[]);

  const handleRemail = async () => {
    try {
      const response = await fetch('/api/user/remail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      })
      console.log(await response.json());
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Link href={"/signup/confirm"} className="absolute left-7 top-9">
        <IoChevronBackSharp color="#f87171" size={"30px"} />
      </Link>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="mb-8 mt-2 text-xl font-bold">メールアドレス認証</p>
        <p className="mb-10 text-center leading-8">
          <span className="text-xl">{user.email}</span>
          <br />
          へメールを送信しました。
          <br />
          メールに記載されているURLを
          <br />
          開いて登録を完了させてください。
        </p>
        <Button className="border-b bg-red-400 hover:bg-red-400" onClick={handleRemail}>
          メールを再送
        </Button>
      </div>
      {/* 実装完了次第削除予定 */}
      <div className="absolute bottom-0 flex flex-col">
        <Link href={`/signup/complete?email=${user.email}`}>
          <button type="button" className="bg-red-400 px-3 py-1 text-white">
            メール内URLをクリック
          </button>
        </Link>
        <Link href={`/signup/expired?email=${user.email}`}>
          <button type="button" className="bg-red-400 px-3 py-1 text-white">
            メール内URLをクリック（期限切れ）
          </button>
        </Link>
      </div>
    </div>
  );
}
