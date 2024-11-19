import Image from "next/image";
import Link from "next/link";
import Backbutton from "~/app/_components/Backbutton";
import Footer from "~/app/_components/Footer";

export default function Page() {
  return (
    <div>
        <h1>G014 日記詳細画面</h1>
        <p>日記詳細、削除、編集</p>
        <Backbutton text="①戻る" />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/edit"}>
          ②編集
        </Link>
      </button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <Link href={"/diary/delete/confirm"}>
          ③削除
        </Link>
      </button>
        <Image
            src="/日記詳細画面 G014.png"
            alt="日記詳細画面"
            width={300}
            height={300}
          />
        <Footer />
    </div>
  );
}
