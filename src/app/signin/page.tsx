"use client";

import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isError = emailError || passwordError || !email || !password; // ボタンが押せるかどうか
  const router = useRouter();

  const validateEmail = (value: string) => {
    // メールアドレス バリデーション
    setEmail(value);
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 形式が正しいかどうか
    if (!emailCheck.test(value)) {
      setEmailError("正しいメールアドレスを入力してください。");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    // パスワード バリデーション
    setPassword(value);
    const length8 = value.length >= 8;
    if (!length8) {
      setPasswordError("パスワードは8文字以上である必要があります。");
    } else {
      setPasswordError("");
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    // ログインボタン
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        router.push("/home");
      } else {
        throw new Error(responseData);
      }
    } catch (error) {
      // 入力エラーメッセージ表示
      toast({
        variant: "destructive",
        description: "メールアドレスかパスワードが間違っています",
      });
    } finally {
      setIsLoading(false); // ローディングを終了
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Image
        src="/logo.png"
        alt="logo"
        priority={true}
        width={120}
        height={120}
      />
      <p className="my-8 text-3xl font-bold">ログイン</p>
      <form className="flex w-[70%] flex-col space-y-7" onSubmit={handleSignin}>
        <div className="space-y-2">
          <label className="text-sm">メールアドレス </label>
          <Input
            name="email"
            type="text"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <div className="mb-2 space-y-2">
          <div className="flex items-center">
            <label className="text-sm">
              パスワード<span className="ml-2 text-xs">※8文字以上</span>
            </label>
          </div>
          <div className="relative w-full">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              className="h-12 w-full rounded-full border-gray-200 px-4 pr-12"
              placeholder="パスワード"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => { setShowPassword(!showPassword) }}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          {passwordError && (
            <p className="text-xs text-red-500">{passwordError}</p>
          )}
        </div>
        {/* ボタンUI */}
        <div>
          <Button
            type="submit"
            disabled={!!isError}
            className="rounded-full　w-full mb-2 mt-6 bg-red-400 text-xl hover:bg-rose-500"
          >
            ログイン
          </Button>
        </div>
      </form>
      <Link href={"/signup"} className="mt-2 border-b">
        新規登録へ
      </Link>
    </div>
  );
}
