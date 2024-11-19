import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G005 ユーザー登録完了画面</h1>
        <p>登録が完了したので、「ログイン画面へ」を押す</p>
        <Image
            src="/ユーザー登録完了画面 G005.png"
            alt="ユーザー登録完了画面"
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
