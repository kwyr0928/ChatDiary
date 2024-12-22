"use client"

;import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useThemeStore } from "~/store/themeStore";

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="my-7 text-xl font-bold">期限切れURL</p>
        <div className="flex w-[80%] flex-col space-y-5 text-left">
          <p className=" text-center leading-8">
            このURLは有効期限が切れています。
            <br />
            お手数をお掛けしますが、
            <br />
            再度お手続きいただくよう
            <br />
            お願いいたします。
          </p>
          <Link href={"/signup"}>
            {/* ボタンUI */}
            <div className="my-3">
              <Button className="rounded-full　w-full bg-lime-500 text-xl hover:bg-lime-600">
                新規登録へ
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
