"use client"

;import { useRouter } from 'next/navigation';
import { Button } from "~/components/ui/button";
import { useThemeStore } from "~/store/themeStore";

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
        <p className="my-7 text-xl font-bold">404 エラー</p>
        <div className="flex w-[80%] flex-col space-y-10 text-left">
          <p className=" text-center leading-10">
            このページは存在しません。
          </p>
            {/* ボタンUI */}
            <div className="mt-3">
              <Button onClick={() => router.back()} className="rounded-full　w-full bg-lime-500 text-xl hover:bg-lime-600">
                戻る
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
