"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type ReMailResponse = {
  message: string;
}

export default function Send() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSession, setIsSession] = useState(false);
  const [isSending, setIsSending] = useState(false); // 送信中かどうか
  const params = useSearchParams();
  const email = params.get("email");
  const userId = params.get("userId");

  useEffect(() => {
    setIsLoading(true);
    try {
    if (email == undefined || userId == undefined) {
      router.push("/signup");
      throw new Error("処理に失敗しました。もう一度やり直してください。");
    } else {
      setIsSession(true);
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
    if(isSession){
      setIsLoading(false); // ローディングを終了
    }
  }
  }, []);
  
  const handleRemail = async () => {
    if (isSending) return;
    setIsSending(true); // 送信中に設定
    // メール再送
    try {
      const response = await fetch("/api/user/remail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: userId,
          email: email
         }),
      });
      const responseData = (await response.json()) as ReMailResponse;
      console.log(responseData);
      if (response.ok) {
        toast({
          description: "メールを再送しました！",
        });
      } else { // 500
        let errorMessage = '';
      switch (response.status) {
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
      setIsSending(false); // 送信完了
    }
  };

  useEffect(() => {
    if(isSession){
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  if (isLoading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme0-background text-gray-600`}>
        <LoaderCircle className={`animate-spin text-theme${theme}-primary`} />
      </div>
    );
  }


  return (
    <div className={`relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme0-background text-gray-600`}>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="mb-8 mt-2 text-xl font-bold">メールアドレス認証</p>
        <p className="mb-10 text-center leading-8">
          <span className="text-xl">{email}</span>
          <br />
          へメールを送信しました。
          <br />
          メールに記載されているURLを
          <br />
          開いて登録を完了させてください。
        </p>
        {isSending ? (
        <LoaderCircle className={`w-[300px] animate-spin text-theme${theme}-primary`} />
      ) :
      <div className="border-b" onClick={handleRemail}>
      メールを再送
    </div>
      }
      </div>
    </div>
  );
}
