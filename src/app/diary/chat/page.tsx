"use client";

import Link from "next/link";
import {
  IoBarChartSharp,
  IoChevronBackSharp,
  IoCogSharp,
  IoHomeSharp,
  IoPersonCircleSharp,
  IoSendSharp,
} from "react-icons/io5";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-red-50">
      <div className="flex w-full justify-around px-5 text-center bg-white">
        <Link href={"/home"}>
          <IoChevronBackSharp color="red" size={"30px"} />
        </Link>
        <p className="mb-2 mr-8 w-[95%] text-gray-700">2024/10/2</p>
      </div>
  <div className="flex justify-center items-center gap-2 w-full py-3 bg-white mb-5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="何を？" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">あなたの気持ちを</SelectItem>
            <SelectItem value="2">あなたの気持ちを</SelectItem>
            <SelectItem value="3">あなたの気持ちを</SelectItem>
          </SelectContent>
        </Select>
        <p>深掘る！</p>
  </div>
      <ScrollArea className="ml-10 h-[600px] w-full">
        <div className="my-2 ml-auto mr-10 h-[80px] w-[70%] rounded-md border bg-white p-4">
          Aさんとパフェを食べに行った。
          <br />
          先週私が誘ったやつ。美味しかった
        </div>
        <div className="flex">
          <IoPersonCircleSharp
            size={"30px"}
            color="gray"
            className="my-auto mr-2"
          />
          <div className="mr-auto h-[60px] w-[60%] rounded-md border bg-white p-4">
            なぜAさんを誘ったのですか？
          </div>
        </div>
        <div className="my-2 ml-auto mr-10 h-[80px] w-[70%] rounded-md border bg-white p-4">
          Aさんとパフェを食べに行った。
          <br />
          先週私が誘ったやつ。美味しかった
        </div>
        <div className="flex">
          <IoPersonCircleSharp
            size={"30px"}
            color="gray"
            className="my-auto mr-2"
          />
          <div className="mr-auto h-[60px] w-[60%] rounded-md border bg-white p-4">
            なぜAさんを誘ったのですか？
          </div>
        </div>
        <div className="my-2 ml-auto mr-10 h-[80px] w-[70%] rounded-md border bg-white p-4">
          Aさんとパフェを食べに行った。
          <br />
          先週私が誘ったやつ。美味しかった
        </div>
        <div className="flex">
          <IoPersonCircleSharp
            size={"30px"}
            color="gray"
            className="my-auto mr-2"
          />
          <div className="mr-auto h-[60px] w-[60%] rounded-md border bg-white p-4">
            なぜAさんを誘ったのですか？
          </div>
        </div>
       <div className="flex items-center gap-2 mt-10">
         <textarea name="" id="" className="w-[80%] border rounded-lg"></textarea>
         <IoSendSharp size={"30px"} color="red"/>
       </div>
       <Link href={"/diary/new"}>
        <button type="button" className="bg-red-400 px-3 py-1 text-white">
          日記作成へ（本来は自動遷移）
        </button>
      </Link>
      </ScrollArea>
      <div className="flex w-full justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="red" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
