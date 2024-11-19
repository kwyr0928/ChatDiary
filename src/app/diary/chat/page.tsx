import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G010 チャット画面</h1>
        <p>チャット形式で深掘り</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/delete/confirm"}>
          ⑤戻る（日記削除確認モーダル）
        </Link>
      </button>
        <Image
            src="/チャット画面 G010.png"
            alt="チャット画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/new"}>
          日記作成画面へ（本来は自動遷移）
        </Link>
      </button>
      
    </div>
  );
}