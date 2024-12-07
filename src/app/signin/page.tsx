"use client"

import { useState } from "react";
import Link from "next/link";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Page() {
  const [signinResponse, setSigninResponse] = useState(null)
  const [ data, setData ] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })

      setSigninResponse(await response.json())
      console.log(signinResponse);

    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <IoDocumentTextSharp color="gray" size={"70px"} />
      <p className="text-3xl font-bold my-8">ログイン</p>
      <form className="flex flex-col space-y-4 w-[70%]" onSubmit={handleSignin}>
        <div className="space-y-2">
          <label className="text-sm">メールアドレス</label>
          <Input
            name="email"
            type="text"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="メールアドレス"
            onChange={onChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm">パスワード</label>
          <Input
            name="password"
            type="password"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード"
            onChange={onChange}
          />
        </div>
        {/* <Link href={"/home"}> */}
              {/* ボタンUI */}
              <div className="my-7">
                <Button type="submit" className="bg-red-400 hover:bg-rose-500 rounded-full　w-full text-xl">ログイン</Button>
            </div>
            {signinResponse && <p>{JSON.stringify(signinResponse)}</p>}
        {/* </Link> */}
      </form>
      <Link href={"/signup"} className="border-b">新規登録へ</Link>
    </div>
  );
}
