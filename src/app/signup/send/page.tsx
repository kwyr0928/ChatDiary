"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "~/hooks/use-toast";

export default function Send() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>();
  const params = useSearchParams();
  const paramsEmail = params.get("email");

  useEffect(() => {
    // 読み込み時
    if (!paramsEmail) {
      return;
    }
    setEmail(paramsEmail);
  }, []);

  const handleRemail = async () => {
    // メール再送
    try {
      const response = await fetch("/api/user/remail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        toast({
          description: "メールを再送しました！",
        });
      } else {
        throw new Error(responseData);
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
        <div className="border-b" onClick={handleRemail}>
          メールを再送
        </div>
      </div>
      {/* 実装完了次第削除予定 */}
      <div className="absolute bottom-0 flex flex-col">
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
      </div>
    </div>
  );
}
