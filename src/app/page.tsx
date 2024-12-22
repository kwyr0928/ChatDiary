"use client"

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeStore } from "~/store/themeStore";

type GetUserResponse = {
  message: string;
  email: string;
  theme: number;
}

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetUserResponse;
        console.log(responseData);
        if (response.ok) {
          setTheme(responseData.theme);
          router.replace("/home")
        } else {
          let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          break;
      }
      throw new Error(errorMessage);
        }
      } catch (error) {
        console.log(error);
        router.replace("/signin");
      } finally {
        setIsLoading(false); // ローディング状態を解除
      }
    }

    void start();
  }, [router, setTheme])
  

  if (isLoading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
        <Image
          src="/logo.png"
          alt="logo"
          priority={true}
          width={250}
          height={250}
        />
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
      <Image
        src="/logo.png"
        alt="logo"
        priority={true}
        width={250}
        height={250}
      />
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
