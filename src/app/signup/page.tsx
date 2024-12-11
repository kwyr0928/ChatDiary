"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); // パスワード強度
  const [rePasswordError, setRePasswordError] = useState("");
  const isError =
    emailError ||
    passwordError ||
    rePasswordError ||
    !email ||
    !password ||
    !rePassword; // ボタンが押せるかどうか
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
    const length8 = value.length >= 8; // 8文字以上
    const length15 = value.length >= 15; // 15文字以上
    const strengthCheck =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
        value,
      ); // 英数字記号が入っているかどうか
    const strength = !length8 ? "弱" : strengthCheck || length15 ? "強" : "中";
    setPasswordStrength(strength);
    // 8文字未満＝弱　英数字記号含むまたは15文字以上＝強　その他＝中
    if (!length8) {
      setPasswordError("パスワードは8文字以上である必要があります。");
    } else {
      setPasswordError("");
    }
    if (rePassword != value) {
      // 再入力パスワードと一致するかどうか
      setRePasswordError("パスワードが一致しません。");
    } else {
      setRePasswordError("");
    }
  };

  const validateRePassword = (value: string) => {
    // 再入力パスワード バリデーション
    setRePassword(value);
    if (password != value) {
      setRePasswordError("パスワードが一致しません。");
    } else {
      setRePasswordError("");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    // 登録ボタン
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        router.push(`/signup/send?email=${email}&password=${password}`);
      } else {
        throw new Error(responseData);
      }
    } catch (error) {
      // 入力エラーメッセージ表示
      toast({
        variant: "destructive",
        description: "このメールアドレスは既に登録されています",
      });
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Link href={"/signin"} className="absolute left-7 top-9">
        <IoChevronBackSharp color="#f87171" size={"30px"} />
      </Link>
      <p className="my-8 text-3xl font-bold">新規登録</p>
      <form className="flex w-[70%] flex-col space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm">メールアドレス</label>
          <Input
            type="text"
            name="email"
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
            {passwordStrength && (
              <div className="mt-1 flex items-center">
                <div
                  className={`ml-4 h-2 w-4 rounded-full ${
                    passwordStrength === "強"
                      ? "bg-green-500"
                      : passwordStrength === "中"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`ml-1 text-xs ${
                    passwordStrength === "強"
                      ? "text-green-500"
                      : passwordStrength === "中"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {passwordStrength}
                </p>
              </div>
            )}
          </div>
          <Input
            type="password"
            name="password"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-xs text-red-500">{passwordError}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm">パスワード（再入力）</label>
          <Input
            type="Password"
            name="confirmPassword"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード（再入力）"
            value={rePassword}
            onChange={(e) => validateRePassword(e.target.value)}
          />
          {rePasswordError && (
            <p className="text-xs text-red-500">{rePasswordError}</p>
          )}
        </div>
        {/* ボタンUI */}
        <div>
          <Button
            type="submit"
            disabled={!!isError}
            className="mt-6 w-full rounded-full bg-red-400 text-xl hover:bg-rose-500"
          >
            登録
          </Button>
        </div>
      </form>
    </div>
  );
}
