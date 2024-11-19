import Link from "next/link";
import { IoDocumentTextSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 px-4 py-8 max-w-[375px] mx-auto">
      <IoDocumentTextSharp color="gray" size={"80px"}/>
      <p className="text-2xl font-bold">ログイン</p>
    <div className="flex flex-col">
        <label className="text-left">ユーザーID</label>
        <input type="text" />
        <label className="text-left">パスワード</label>
        <input type="password" />
    </div>
      <Link href={"/home"}>
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          ログイン
        </button>
      </Link>
      <Link href={"/signup"}>新規登録へ</Link>
    </div>
  );
}
