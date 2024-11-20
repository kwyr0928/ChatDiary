import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 max-w-md mx-auto">
      <Link href={"/signup"} className="mr-auto">
      <IoChevronBackSharp color="red" size={"30px"}/>
      </Link>
      <p className="text-2xl font-bold">確認</p>
    <div className="flex flex-col">
        <label className="text-left">ユーザーID</label>
        <p>nekoneko</p>
        <label className="text-left">メールアドレス</label>
        <p>nekoneko@gmail.com</p>
    </div>
      <Link href={"/signup/send"}>
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          確定して登録
        </button>
      </Link>
    </div>
  );
}
