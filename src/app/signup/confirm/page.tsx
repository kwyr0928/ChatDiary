"use client"

import Link from "next/link";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";


const user = {
  id: "nekoneko",
  mail: "nekoneko@gmail.com",
  password: "nekochan"
}

export default function Page() {
  const [signupResponse, setSignupResponse] = useState(null)

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.mail, password: user.password }),
      })

      setSignupResponse(await response.json())
      console.log(signupResponse);

    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Link href={"/signup"} className="absolute left-7 top-9">
        <IoChevronBackSharp color="#f87171" size={"30px"} />
      </Link>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="my-8 text-xl font-bold">確認</p>
        <div className="flex w-[80%] flex-col space-y-5 text-left">
          <div className="space-y-1">
            <label className="text-md">ユーザーID</label>
            <p className="text-xl">{user.id}</p>
          </div>
          <div className="space-y-1">
            <label className="text-md">メールアドレス</label>
            <p className="text-xl">{user.mail}</p>
          </div>
          <Link href={"/signup/send"}>
          {/* ボタンUI */}
          <div className="my-7">
            <Button className="rounded-full w-full bg-red-400 text-xl hover:bg-rose-500" onClick={handleSignup}>
              確定して登録
            </Button>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
