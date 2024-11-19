import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G017 FB画面</h1>
        <p>継続状況、先月のまとめ、あなたの分析</p>
        <Image
            src="/FB画面 G017.png"
            alt="FB画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/setting"}>
           設定（歯車）
          </Link>
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/home"}>
           ホーム（家）
          </Link>
        </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/feedback"}>
           フィードバック（グラフ）
          </Link>
        </button>
    </div>
  );
}
