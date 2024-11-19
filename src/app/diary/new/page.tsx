import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G012 日記作成画面</h1>
        <p>出力された日記、タグ、公開範囲を確認・設定して「作成する！」を押す</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/delete/confirm"}>
          ①戻る（日記削除確認モーダル）
        </Link>
      </button>
      <Image
            src="/日記作成画面 G012.png"
            alt="日記作成画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/share"}>
          ⑤作成する！
        </Link>
      </button>
    </div>
  );
}