import Link from "next/link";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default async function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <IoDocumentTextSharp color="gray" size={"70px"} />
      <p className="text-3xl font-bold my-8">ログイン</p>
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
          <label className="text-sm">パスワード</label>
          <Input
            type="password"
            className="h-12 rounded-full border-gray-200 px-4"
            placeholder="パスワード"
          />
        </div>
        <Link href={"/home"}>
              {/* ボタンUI */}
              <div className="my-7">
                <Button className="bg-red-400 hover:bg-red-500 rounded-full　w-full text-xl">ログイン</Button>
            </div>
        </Link>
      </form>
      <Link href={"/signup"} className="border-b">新規登録へ</Link>
    </div>
  );
}
