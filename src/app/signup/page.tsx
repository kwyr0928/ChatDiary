import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 px-4 py-8 max-w-[375px] mx-auto">
      <Link href={"/signin"} className="mr-auto">
      <IoChevronBackSharp color="red" size={"30px"}/>
      </Link>
      <p className="text-2xl font-bold">新規登録</p>
    <div className="flex flex-col">
        <label className="text-left">ユーザーID</label>
        <input type="text" />
        <label className="text-left">メールアドレス</label>
        <input type="text" />
        <label className="text-left">パスワード</label>
        <input type="password" />
        <label className="text-left">パスワード（再入力）</label>
        <input type="text" />
    </div>
      <Link href={"/signup/confirm"}>
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          確認
        </button>
      </Link>
    </div>
  );
}
