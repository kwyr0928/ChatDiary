"use client";

import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type CreateUserResponse = {
  message: string;
  userId: string;
}

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); // パスワード強度
  const [rePasswordError, setRePasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const isError =
    emailError ||
    passwordError ||
    rePasswordError ||
    !email ||
    !password ||
    !rePassword; // ボタンが押せるかどうか
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const responseData = (await response.json()) as CreateUserResponse;
      console.log(responseData);
      if (response.ok) {
        router.push(`/signup/send?email=${email}&userId=${responseData.userId}`);
      } else { // 409 500
        let errorMessage = '';
      switch (response.status) {
        case 409:
            errorMessage = '登録エラー（509）：このメールアドレスは既に登録されています。';
            setIsLoading(false); // ローディングを終了
            break;
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            setIsLoading(false); // ローディングを終了
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          setIsLoading(false); // ローディングを終了
          break;
      }
      throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
        if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: "予期しないエラーが発生しました。",
        });
      }
    } finally {
    }
  };

  if (isLoading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme-background text-gray-600`}>
        <LoaderCircle className={`animate-spin text-theme${theme}-primary`} />
      </div>
    );
  }


  return (
    <div className={`relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme$-background text-gray-600`}>
      <Link href={"/signin"} className="absolute left-7 top-9">
        <IoChevronBackSharp className={`text-theme${theme}-primary`} size={"30px"} />
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
            autoComplete="email"
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
          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              className="h-12 rounded-full border-gray-200 px-4"
              placeholder="パスワード"
              value={password}
              autoComplete="new-password"
              onChange={(e) => validatePassword(e.target.value)}
            />
            <button
               type="button"
               onClick={()=>{setShowPassword(!showPassword)}}
               className="absolute inset-y-0 right-4 flex items-center text-gray-500"
             >
              {showPassword ? <Eye /> : <EyeClosed />}
             </button>
          </div>
          {passwordError && (
            <p className="text-xs text-red-500">{passwordError}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm">パスワード（再入力）</label>
        <div className="relative w-full">
            <Input
              type={showRePassword ? "text" : "password"}
              name="confirmPassword"
              className="h-12 rounded-full border-gray-200 px-4"
              placeholder="パスワード（再入力）"
              value={rePassword}
              autoComplete="new-password"
              onChange={(e) => validateRePassword(e.target.value)}
            />
            <button
                 type="button"
                 onClick={()=>{setShowRePassword(!showRePassword)}}
                 className="absolute inset-y-0 right-4 flex items-center text-gray-500"
               >
                {showRePassword ? <Eye /> : <EyeClosed />}
               </button>
        </div>
          {rePasswordError && (
            <p className="text-xs text-red-500">{rePasswordError}</p>
          )}
        </div>
        {/* ボタンUI */}
        <div>
          <Button
            type="submit"
            disabled={!!isError}
            className={`mt-6 w-full rounded-full bg-theme${theme}-primary text-xl hover:bg-theme${theme}-hover`}
          >
            登録
          </Button>
        </div>
      </form>
    </div>
  );
}
