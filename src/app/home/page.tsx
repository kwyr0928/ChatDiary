import Image from "next/image";
import Link from "next/link";
import Footer from "~/app/_components/Footer";

export default function Page() {
  return (
    <div>
        <h1>G007 ホーム画面</h1>
        <p>日記が表示されるよ</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/detail"}>
          ⑤日記詳細画面へ
        </Link>
      </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/chat"}>
          ⑥新規作成（＋）
        </Link>
      </button>
      <Image
            src="/ホーム画面 G007.png"
            alt="ホーム画面"
            width={300}
            height={300}
          />
        <Footer />
    </div>
  );
}
