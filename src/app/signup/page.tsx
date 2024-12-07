import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default async function Page() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Link href={"/signin"} className="absolute left-7 top-9">
        <IoChevronBackSharp color="#f87171" size={"30px"} />
      </Link>
      <p className="text-3xl font-bold my-8">新規登録</p>
      <form className="flex flex-col space-y-4 w-[70%]">
        <div className="space-y-2">
          <label className="text-sm">ユーザーID</label>
          <Input
            type="text"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="ユーザーID"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">メールアドレス</label>
          <Input
            type="text"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="メールアドレス"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">パスワード</label>
          <Input
            type="password"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">パスワード（再入力）</label>
          <Input
            type="password"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード（再入力）"
          />
        </div>
        {/* TODO: 入力データのバリデーション */}
      <Link href={"/signup/confirm"}>
        {/* ボタンUI */}
        <div className="my-7">
                <Button className="bg-red-400 hover:bg-rose-500 rounded-full w-full text-xl">登録</Button>
            </div>
      </Link>
      </form>
    </div>
  );
}
