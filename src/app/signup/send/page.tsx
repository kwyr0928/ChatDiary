import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 max-w-md mx-auto">
      <Link href={"/signup/confirm"} className="mr-auto">
      <IoChevronBackSharp color="red" size={"30px"}/>
      </Link>
      <p className="text-2xl font-bold">メールアドレス認証</p>
      <p className="text-center">nekoneko@gmail.comへ<br/>メールを送信しました。<br/>
      メールに記載されているURLを<br/>開いて登録を完了させてください。</p>
      <Link href={"/signup/send"}>メールを再送</Link>
      <Link href={"/signup/complete"}>
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          メール内URLをクリック
        </button>
      </Link>
      <Link href={"/signup/expired"}>
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          メール内URLをクリック（期限切れ）
        </button>
      </Link>
    </div>
  );
}
