import Link from "next/link";
import { IoBarChartSharp, IoCogSharp, IoHomeSharp } from "react-icons/io5";
import { Card, CardContent } from "~/components/ui/card";

const keep = {
  keep: [
    {
      date: "2024-11-1",
      keep: true
    },
    {
      date: "2024-11-2",
      keep: false
    },
    {
      date: "2024-11-3",
      keep: true
    },
    {
      date: "2024-11-4",
      keep: true
    },
    {
      date: "2024-11-5",
      keep: true
    },
    {
      date: "2024-11-6",
      keep: false
    }
  ]
}


export default async function Page() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="mb-[110px] mx-auto w-[85%]">
        <p className="mt-5 mb-3 w-full text-left text-xl font-bold">
          2024年11月の継続状況
        </p>
        <div className="grid grid-cols-7 gap-1 aspect-[3/2] place-items-center">
          {Array.from({ length: 31 }).map((_, index) => {
            const date = `2024-11-${index + 1}`;
            const keepData = keep.keep.find((k) => k.date === date);
            const isToday = today === date;
            const bgColor = keepData
              ? keepData.keep
                ? "bg-lime-400"
                : "bg-gray-300"
              : "bg-gray-300";

            return (
              <div
                key={index}
                className={`rounded-xl px-4 py-4 ${bgColor} ${isToday ? "bg-blue-300" : ""
                  }`}
              ></div>
            );
          })}
        </div>
        <p className="mt-5 mb-3 w-full text-left text-xl font-bold">
          先月のまとめ
        </p>
        {/* カード */}
        <Card className=" shadow-none">
          <CardContent className="px-5 py-3">あなたは...</CardContent>
        </Card>
        <p className="mt-5 mb-3 w-full text-left text-xl font-bold">
          あなたの分析
        </p>
        {/* カード */}
        <Card className="mb-auto shadow-none">
          <CardContent className="px-5 py-3">あなたは積極的に友人を誘ったり手助けできる人ですね。一方で自分から人に頼れない場面が多く、弱みを見せたくないというプライドの高さを感じます。</CardContent>
        </Card>
      </div>
      <div className="fixed bottom-0 max-w-md flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="#f87171" />
        </Link>
      </div>
    </div>
  );
}
