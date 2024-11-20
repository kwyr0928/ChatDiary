import Link from "next/link";
import { IoChevronBackSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 max-w-md mx-auto">
      <Link href={"/signup"} className="mr-auto">
      <IoChevronBackSharp color="red" size={"30px"}/>
      </Link>
      <p className="text-2xl font-bold">期限切れURL</p>
      <p className="text-center">このURLは有効期限が切れています。<br/>
      お手数をお掛けしますが、<br/>
      再度お手続きいただくよう<br/>
      お願いいたします。</p>
      <Link href={"/signup"}>
        <button type="button" className="bg-lime-400 px-3 py-1 text-white">
          新規登録へ
        </button>
      </Link>
    </div>
  );
}
