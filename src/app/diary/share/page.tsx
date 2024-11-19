import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G013 他ユーザー日記モーダル</h1>
        <p>他ユーザーの日記が見られる</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/home"}>
          ①×（確認後にモーダルを消す、ホームに戻る）
        </Link>
      </button>
        <Image
            src="/他ユーザー日記モーダル G013.png"
            alt="他ユーザー日記モーダル"
            width={300}
            height={300}
          />
    </div>
  );
}