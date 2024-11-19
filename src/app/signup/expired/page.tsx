import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
        <h1>G006 期限切れ画面</h1>
        <p>このURLは有効期限が切れているので、再度手続き、「新規登録へ」を押す</p>
        <Image
            src="/期限切れ画面 G006.png"
            alt="期限切れ画面"
            width={300}
            height={300}
          />
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <Link href={"/signup"}>
            ①新規登録へ
          </Link>
        </button>
    </div>
  );
}
