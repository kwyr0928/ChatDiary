import Image from "next/image";
import Link from "next/link";
import Backbutton from "~/app/_components/Backbutton";

export default function Page() {
  return (
    <div>
        <h1>G016 編集キャンセル確認モーダル</h1>
        <p>編集内容を取り消しますか？</p>
        <Image
            src="/編集キャンセル確認モーダル G016.png"
            alt="編集キャンセル確認モーダル"
            width={300}
            height={300}
          />
        <Backbutton text="②いいえ" />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/detail"}>
          ①はい
        </Link>
      </button>
    </div>
  );
}