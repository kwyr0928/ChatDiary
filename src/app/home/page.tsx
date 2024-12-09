"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoAddCircleSharp,
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp,
  IoSearchSharp,
} from "react-icons/io5";
import DiaryCard from "~/components/diaryCard";
import { Input } from "~/components/ui/input";

const diary = {
  diary: [
    {
      id: [1],
      tag: ["A", "お出かけ"],
      context:
        "Aさんと○○へ行き、xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      date: "2024-11-21",
    },
    {
      id: [2],
      tag: ["B", "旅行"],
      context: "Bさんと△△へ行き、xxxxxxxxxxxxxxxxxxxxx",
      date: "2024-11-01",
    },
    {
      id: [3],
      tag: ["C", "仕事"],
      context: "Cさんと□□へ行き、xxxx",
      date: "2024-10-10",
    },
    {
      id: [4],
      tag: ["D", "ねむい"],
      context: "ねむいでござんす",
      date: "2024-10-9",
    },
    {
      id: [5],
      tag: ["E", "スイーツ"],
      context: "栗が好きなAさんを誘い、パフェを食べに行った。私はさつまいものアイスが乗ったパフェで、Aさんは栗のパウンドケーキが乗ったパフェだった。",
      date: "2024-10-14",
    },
  ],
};

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const filteredDiary = diary.diary.filter((d) =>
    JSON.stringify(d).includes(keyword),
  );



  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="mx-auto mt-[80px] mb-[140px] w-[85%]">
        {/* <ScrollArea> */}
        {
          filteredDiary.length > 0 ? (
            filteredDiary.map((d, index) => (
              // 日記カード表示
              <Link href={`/diary/detail`} className="focus-visible:outline-none focus-visible:ring-0 focus:outline-none">
                <DiaryCard key={index} d={d} index={index} />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400">
              該当する日記はありません。
            </p>
          )
        }
        {/* </ScrollArea> */}
      </div>
      <div className="fixed top-0 pt-5 pb-5 flex items-center max-w-sm w-[85%] space-x-3 bg-red-50">
        <IoSearchSharp size={"25px"} />
        <Input
          placeholder="日記を検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <Link href={"/diary/chat"} className="max-w-md fixed bottom-24 flex w-full justify-end pr-4">
        <IoAddCircleSharp size={"70px"} color="#f87171" />
      </Link>
      <div className="max-w-md fixed bottom-0 flex w-full justify-around bg-white py-5">
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
