import Image from "next/image";
import Link from "next/link";
import Footer from "~/app/_components/Footer";

export default function Page() {
  return (
    <div>
        <h1>G015 日記編集画面</h1>
        <p>日記編集、削除</p>
        <p>未変更状態でも「戻る」押したら確認画面出るようになってる（今だけ）</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/edit/delete/confirm"}>
          ①戻る
        </Link>
      </button>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/detail"}>
          ②日記保存
        </Link>
      </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/delete/confirm"}>
          ③削除
        </Link>
      </button>
      <Image
            src="/日記編集画面 G015.png"
            alt="日記編集画面"
            width={300}
            height={300}
          />
        <Footer />
    </div>
  );
}
