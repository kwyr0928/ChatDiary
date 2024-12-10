"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch(`/api/user/register`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        console.log(email);
        if (!response.ok) {
          throw new Error(`Failed to fetch diaries: ${response.status}`);
        }
        console.log(await response.json());
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };
  
    void fetchDiaries();
  }, [email]);
  
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
      <p className="my-8 text-xl font-bold">登録完了</p>
      <div className="flex w-[80%] flex-col space-y-5 text-left">
        <p className="text-center my-10">登録が完了しました。</p>
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




