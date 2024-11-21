import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="flex h-[350px] w-[80%] flex-col items-center justify-center rounded-md bg-white">
      <p className="my-8 text-xl font-bold">退会完了</p>
      <div className="flex w-[80%] flex-col space-y-5 text-left">
        <p className="text-center my-10">ご利用ありがとうございました。</p>
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
