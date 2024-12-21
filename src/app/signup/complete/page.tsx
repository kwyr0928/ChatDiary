"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";

type CertificationResponse = {
  message: string;
}

export default function Complete() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

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
        const responseData = (await response.json()) as CertificationResponse;
        console.log(responseData);
        if (response.ok) {
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        // 入力エラーメッセージ表示
        toast({
          description: (
            <div style={{ whiteSpace: "pre-line" }}>
              既に認証が完了しております。
              {"\n"}ログイン画面からログインをお試しください。
            </div>
          ),
        });
      } finally {
        setIsLoading(false); // ローディング完了
      }
    };
    void fetchCertification();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
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
