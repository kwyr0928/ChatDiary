"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { postSignup } from "~/lib/schemas";
import { z } from "zod";
// 再入力パスワードはバリデーションしてない
export default function Page() {
  const [data, setData] = useState({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage: { email?: string; password?: string; confirmPassword?: string } = {};

    try {
      // 再入力パスワードが未入力かどうか
      if (data.confirmPassword === "") {
        errorMessage.confirmPassword = "パスワードを再入力してください。"
        throw new Error();
      }

      // パスワードと再入力パスワードが一致するかどうか
      if (data.confirmPassword !== data.password) {
        errorMessage.confirmPassword = "パスワードが一致しません。"
        throw new Error();
      }

      // バリデーション
      //postSignup.parse(data);

      // エラーがない場合ページ遷移
      router.push("/signup/confirm")

    } catch (error) {
      // バリデーションエラーがある場合
      if (error instanceof z.ZodError) {
        const errorMessage: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') errorMessage.email = err.message;
          if (err.path[0] === 'password') errorMessage.password = err.message;
        });
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Link href={"/signin"} className="absolute left-7 top-9">
        <IoChevronBackSharp color="#f87171" size={"30px"} />
      </Link>
      <p className="text-3xl font-bold my-8">新規登録</p>
      <form className="flex flex-col space-y-6 w-[70%]" onSubmit={onSubmit}>
        <div>
          <label className="text-sm">メールアドレス</label>
          <Input
            type="text"
            name="email"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="メールアドレス"
            onChange={onChange}
          />
          {error.email && <p className="text-red-500 text-sm mb-2">{error.email}</p>}
        </div>
        <div className="mb-4">
          <label className="text-sm">パスワード</label>
          <Input
            type="password"
            name="password"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード"
            onChange={onChange}
          />
          {error.password && <p className="text-red-500 text-sm mb-2">{error.password}</p>}
        </div>
        <div className="mb-4">
          <label className="text-sm">パスワード（再入力）</label>
          <Input
            type="Password"
            name="confirmPassword"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード（再入力）"
            onChange={onChange}
          />
          {error.confirmPassword && <p className="text-red-500 text-sm mb-2">{error.confirmPassword}</p>}
        </div>
        {/* ボタンUI */}
        <div>
          <Button type="submit" className="bg-red-400 hover:bg-rose-500 rounded-full w-full text-xl mt-6">登録</Button>
        </div>
      </form>
    </div>
  );
}
