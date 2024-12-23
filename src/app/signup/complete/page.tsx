"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type CertificationResponse = {
  message: string;
}

type ErrorResponse = {
  error: string;
}

export default function Complete() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const theme = useThemeStore((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    // 認証
    const fetchCertification = async () => {
      try {
        const response = await fetch(`/api/user/register`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "authorization": `JWT ${token}`,
          }
        });
        if (response.ok) {
          setIsSession(true);
        const responseData = (await response.json()) as CertificationResponse;
        console.log(responseData);
        } else { // 401 404 500
          let errorMessage = '';
      switch (response.status) {
        case 401:
          const errorData = (await response.json()) as ErrorResponse;
      if (errorData.error === "Token expired") {
          errorMessage = '期限切れ（401）: トークンの有効期限が切れています。';
          router.push("/signup/expired");
      } else if  (errorData.error === "Already authenticated") {
        errorMessage = '認証済み（401）: 既に認証が完了しております。ログインをお試しください。';
        router.push("/signin");
      }
          break;
          case 404:
          errorMessage = 'Not Found（404）: ユーザーが見つかりません';
          router.push("/signin");
          break;
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            router.push("/signin");
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          break;
      }
      throw new Error(errorMessage);
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          if (error.message == "Already authenticated") {
            toast({
              description: error.message,
            });
          } else {
            toast({
              variant: "destructive",
              description: error.message,
            });
          }
      } else {
        toast({
          variant: "destructive",
          description: "予期しないエラーが発生しました。",
        });
      }
      } finally {
        if(isSession){
          setIsLoading(false); // ローディングを終了
        }
      }
    };
    void fetchCertification();
  }, []);

  useEffect(() => {
    if(isSession){
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  if (isLoading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="my-8 text-xl font-bold">登録完了</p>
        <div className="flex w-[80%] flex-col space-y-5 text-left">
          <p className="my-10 text-center">登録が完了しました。</p>
          <Link href={"/signin"}>
            {/* ボタンUI */}
            <div className="my-6">
              <Button className="rounded-full　w-full bg-lime-500 text-xl hover:bg-lime-600">
                ログイン画面へ
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
