import Image from "next/image";
import Link from "next/link";
import Footer from "~/app/_components/Footer";

export default function Page() {
  return (
    <div>
        <h1>G008 設定画面</h1>
        <p>ログアウト、退会</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/signin"}>
          ①ログアウトする
        </Link>
      </button>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/setting/delete/confirm"}>
          ②アカウントを削除する
        </Link>
      </button>
        <Image
            src="/設定画面 G008.png"
            alt="設定画面"
            width={300}
            height={300}
          />
        <Footer />
    </div>
  );
}
