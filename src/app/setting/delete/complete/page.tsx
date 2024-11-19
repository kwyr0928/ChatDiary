import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G018 退会完了画面</h1>
        <p>退会完了</p>
        <Image
            src="/退会完了メッセージ G018.png"
            alt="退会完了画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/signin"}>
          ①ログイン画面へ
        </Link>
      </button>
    </div>
  );
}