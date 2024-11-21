import Link from "next/link";
import {
  IoAddCircleSharp,
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp,
} from "react-icons/io5";
import { Card, CardContent } from "~/components/ui/card";
import { Command, CommandInput } from "~/components/ui/command";

const diary = {
  diary: [
    {
      tag: ["A", "お出かけ"],
      context:
        "Aさんと○○へ行き、xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      date: "2024-11-21",
    },
    {
      tag: ["B", "旅行"],
      context: "Bさんと△△へ行き、xxxxxxxxxxxxxxxxxxxxx",
      date: "2024-11-01",
    },
    {
      tag: ["C", "仕事"],
      context: "Cさんと□□へ行き、xxxx",
      date: "2024-10-10",
    },
    {
      tag: ["D", "ねむい"],
      context: "ねむいでござんす",
      date: "2024-10-9",
    },
  ],
};

export default function Page() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="absolute top-5 w-[85%]">
        <Command className="rounded-full">
          <CommandInput placeholder="日記を検索" />
        </Command>
      </div>
      <div className="absolute top-20 mx-auto w-[85%]">
        {diary.diary.map((d, index) => (
          <Link key={index} href={`/diary/detail`}>
              {/* カード */}
              <div className="mb-5">
                <Card className="shadow-none text-gray-600">
                  <CardContent className="px-5 py-3">
                    <p className="leading-6 break-words">
                      {d.date}
                      <span className="ml-12 space-x-4 text-red-400">
                        {d.tag.map((tag, tagIndex) => (
                          <span key={tagIndex}>#{tag}</span>
                        ))}
                      </span>
                      <br />
                      {d.context}
                    </p>
                  </CardContent>
                </Card>
              </div>
          </Link>
        ))}
      </div>
      <Link href={"/diary/chat"} className="absolute bottom-28 right-5">
        <IoAddCircleSharp size={"70px"} color="#f87171" />
      </Link>
      <div className="absolute bottom-0 flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="#f87171" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
