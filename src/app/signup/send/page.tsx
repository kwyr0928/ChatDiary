import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G004 登録メール送信完了画面</h1>
        <p>メールアドレス認証</p>
        <Image
            src="/メール送信画面 G004.png"
            alt="メール送信画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/signup/send"}>
            ①メールを再送（今は何もない）
          </Link>
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/signup/complete"}>
            メール内URL（代用）（成功）
          </Link>
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/signup/expired"}>
            メール内URL（代用）（期限切れ）
          </Link>
        </button>
    </div>
  );
}
