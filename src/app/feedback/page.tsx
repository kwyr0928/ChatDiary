import Link from "next/link";
import {
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp
} from "react-icons/io5";

export default async function Page() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-red-50">
      <p className="mb-2 w-[95%] text-xl text-gray-700">2024年10月の継続状況</p>
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 28 }).map((_, index) => {
          const bgColor = Math.random() > 0.5 ? "bg-lime-400" : "bg-gray-300";
          return (
            <div
              key={index}
              className={`rounded-xl px-4 py-4 ${bgColor}`}
            ></div>
          );
        })}
      </div>
      <p className="mt-10 w-[95%] text-xl text-gray-700">先月のまとめ</p>
      <div className="bg-white w-[95%] h-[120px] rounded-md my-3 p-3">
        あなたは...
      </div>
      <p className="w-[95%] text-xl text-gray-700">あなたの分析</p>
      <div className="bg-white w-[95%] h-[120px] rounded-md mt-3 mb-10 p-3">
        あなたは積極的に友人を誘ったり手助けできる人ですね。一方で自分から人に頼れない場面が多く、弱みを見せたくないというプライドの高さを感じます。
      </div>
      <div className="flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="red" />
        </Link>
      </div>
    </div>
  );
}
