"use client";

import Link from "next/link";
import { GoPencil } from "react-icons/go";
import {
  IoBarChartSharp,
  IoChevronBackSharp,
  IoCogSharp,
  IoHomeSharp,
  IoPersonCircleSharp,
  IoTrashSharp,
} from "react-icons/io5";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-red-50">
      <div className="flex w-full justify-around px-5 text-center">
        <Link href={"/home"}>
          <IoChevronBackSharp color="red" size={"30px"} />
        </Link>
        <p className="mb-2 w-[95%] text-gray-700">2024/10/2　22:10:32記録</p>
        <IoTrashSharp color="gray" size={"30px"} />
      </div>
      <ScrollArea className="ml-10 h-[600px] w-full">
        <div className="flex">
          <p className="mt-4">日記本文</p>
          <Link href={"/diary/edit"}>
            <GoPencil
              size={"25px"}
              color="gray"
              className="my-auto ml-5 mt-4"
            />
          </Link>
        </div>
        <p className="py-2 pl-5 text-red-400">#A　#パフェ　#お出かけ</p>
        <div className="h-[120px] w-[90%] px-5 text-gray-700">
          栗が好きなAさんを誘い、パフェを食べに行った。私はさつまいものアイスが乗ったパフェで、Aさんは栗のパウンドケーキが乗ったパフェだった。私が見つけた店で喜んでくれて嬉しい。彼女が喜ぶ店をまた探したいと思った。
        </div>

        <p className="mt-5">チャットログ</p>
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
