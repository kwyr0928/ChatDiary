"use client";

import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useToast } from "~/hooks/use-toast";

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
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false); // 送信中かどうか
  const params = useSearchParams();
  const email = params.get("email");
  const userId = params.get("userId");
  
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
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "予期しないエラーが発生しました";
      // 入力エラーメッセージ表示　普通は出ないはず
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    } finally {
      setIsSending(false); // 送信完了
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
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
        <LoaderCircle className="w-[300px] animate-spin" />
      ) :
      <div className="border-b" onClick={handleRemail}>
      メールを再送
    </div>
      }
      </div>
      {/* 実装完了次第削除予定 */}
      {/* <div className="absolute bottom-0 flex flex-col">
        <Link href={`/signup/complete?email=${email}`}>
          <button type="button" className="bg-red-400 px-3 py-1 text-white">
            メール内URLをクリック
          </button>
        </Link>
        <Link href={`/signup/expired?email=${email}`}>
          <button type="button" className="bg-red-400 px-3 py-1 text-white">
            メール内URLをクリック（期限切れ）
          </button>
        </Link>
      </div> */}
    </div>
  );
}
