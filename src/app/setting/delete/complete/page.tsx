import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 max-w-md mx-auto">
      <Link href={"/signup/confirm"} className="mr-auto">
      <IoChevronBackSharp color="red" size={"30px"}/>
      </Link>
      <p className="text-2xl font-bold">退会完了</p>
      <p className="text-center">ご利用ありがとうございました。</p>
      <Link href={"/signin"}>
        <button type="button" className="bg-lime-400 px-3 py-1 text-white">
          ログイン画面へ
        </button>
      </Link>
    </div>
  );
}
