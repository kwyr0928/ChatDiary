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
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

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
    {
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
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="fixed top-0 pt-5 pb-5 flex items-center w-[85%] space-x-3 bg-red-50">
        <IoSearchSharp size={"25px"} />
        <Input
          placeholder="日記を検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="mx-auto mt-[80px] mb-[130px] w-[85%]">
        {filteredDiary.length > 0 ? (
          filteredDiary.map((d, index) => (
            <Link key={index} href={`/diary/detail`}>
              <div className="mb-5">
                <Card className="text-gray-600 shadow-none">
                  <CardContent className="px-5 py-3">
                    <p className="break-words leading-6">
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
          ))
        ) : (
          <p className="text-center text-gray-400">
            該当する日記はありません。
          </p>
        )}
      </div>
        <Link href={"/diary/chat"} className="fixed bottom-24 right-5">
          <IoAddCircleSharp size={"70px"} color="#f87171" />
        </Link>
        <div className="fixed bottom-0 flex w-full justify-around bg-white py-5">
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
