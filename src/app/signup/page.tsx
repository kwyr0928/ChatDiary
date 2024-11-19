import Image from "next/image";
import Link from "next/link";
import Backbutton from "~/app/_components/Backbutton";

export default function Page() {
  return (
    <div>
        <h1>G002 ユーザー登録画面</h1>
        <p>ユーザーID, メールアドレス, パスワード, パスワード(再入力)を入力後、「確認」を押す</p>
        <Backbutton text="⑥戻る" />
        <Image
            src="/ユーザー登録画面 G002.png"
            alt="ユーザー登録画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/signup/confirm"}>
            ⑤確認
          </Link>
        </button>
    </div>
  );
}
