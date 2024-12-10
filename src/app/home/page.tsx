"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IoAddCircleSharp,
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp,
  IoSearchSharp,
} from "react-icons/io5";
import DiaryCard from "~/components/diaryCard";
import { Input } from "~/components/ui/input";


export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [diaryList, setDiaryList] = useState(null);
  const filteredDiary = diaryList
  ? diaryList.diaries.filter((d) =>
      JSON.stringify(d).toLowerCase().includes(keyword.toLowerCase())
    )
  : [];

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        // userId書き変え
        const userId = "cm4i0r0dr000014cn72v3t7j0"
        const response = await fetch(`/api/diary?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch diaries: ${response.status}`);
        }
        setDiaryList(await response.json());
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };
  
    void fetchDiaries();
  }, []);



  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="mx-auto mt-[80px] mb-[140px] w-[85%]">
        {/* <ScrollArea> */}
        {
          filteredDiary.length > 0 ? (
            filteredDiary.map((d, index) => (
              // 日記カード表示
              <Link
                key={index}
                href={`/diary/detail/${d.id}`}
                className="focus-visible:outline-none focus-visible:ring-0 focus:outline-none">
                <DiaryCard key={index} title={d.title} summary={d.summary} />
              </Link>
            ))
          ) : keyword == "" ? (
            <p className="text-center text-gray-400">
              今日はどんなことがありましたか？
            </p>
          ) : (
            <p className="text-center text-gray-400">
              該当する日記がありませんでした。
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
