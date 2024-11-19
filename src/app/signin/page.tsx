import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
 <div>
       <h1>G001 ログイン画面</h1>
       <p>ユーザーID, パスワードを入力後、「ログイン」を押す</p>
       <p>ログインではなく新規登録なら、「新規登録へ」を押す</p>
       <Image
            src="/ログイン画面 G001.png"
            alt="ログイン画面"
            width={300}
            height={300}
          />
       <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
         <Link href={"/home"}>
           ④ログイン
         </Link>
       </button>
       <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
         <Link href={"/signup"}>
           ⑤新規登録へ
         </Link>
       </button>
 </div>
  );
}
