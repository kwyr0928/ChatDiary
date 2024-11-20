import Link from "next/link";
import {
  IoAddCircleSharp,
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp,
} from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Command, CommandInput } from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";

export default async function Page() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-red-50">
      <Command className="my-4 w-[90%] rounded-full">
        <CommandInput placeholder="" />
      </Command>
      <ScrollArea className="ml-10 h-[600px] w-full">
        <p className="mb-2 w-[95%] text-gray-700">2024年</p>
        <p className="mb-2 w-[95%] text-gray-700">10月</p>
        <Link href={"/diary/detail"}>
          <Button className="mb-5 flex h-fit w-[90%] flex-col bg-white text-left text-gray-500 hover:bg-white">
            <p className="w-[95%]">
              5日<span className="ml-12 text-red-400">#A #お出かけ</span>
              <br />
              Aさんと○○へ行き、...
              <br />
              ...
              <br />
              ...
            </p>
          </Button>
        </Link>
        <Button className="mb-5 flex h-fit w-[90%] flex-col bg-white text-left text-gray-500 hover:bg-white">
          <p className="w-[95%]">
            5日<span className="ml-12 text-red-400">#A #お出かけ</span>
            <br />
            Aさんと○○へ行き、...
            <br />
            ...
            <br />
            ...
          </p>
        </Button>
        <p className="mb-2 w-[95%] text-gray-700">9月</p>
        <Button className="mb-5 flex h-fit w-[90%] flex-col bg-white text-left text-gray-500 hover:bg-white">
          <p className="w-[95%]">
            5日<span className="ml-12 text-red-400">#A #お出かけ</span>
            <br />
            Aさんと○○へ行き、...
            <br />
            ...
            <br />
            ...
          </p>
        </Button>
        <Button className="mb-5 flex h-fit w-[90%] flex-col bg-white text-left text-gray-500 hover:bg-white">
          <p className="w-[95%]">
            5日<span className="ml-12 text-red-400">#A #お出かけ</span>
            <br />
            Aさんと○○へ行き、...
            <br />
            ...
            <br />
            ...
          </p>
        </Button>
        <p className="mb-2 w-[95%] text-gray-700">8月</p>
        <Button className="mb-5 flex h-fit w-[90%] flex-col bg-white text-left text-gray-500 hover:bg-white">
          <p className="w-[95%]">
            5日<span className="ml-12 text-red-400">#A #お出かけ</span>
            <br />
            Aさんと○○へ行き、...
            <br />
            ...
            <br />
            ...
          </p>
        </Button>
        <Button className="mb-5 flex h-fit w-[90%] flex-col bg-white text-left text-gray-500 hover:bg-white">
          <p className="w-[95%]">
            5日<span className="ml-12 text-red-400">#A #お出かけ</span>
            <br />
            Aさんと○○へ行き、...
            <br />
            ...
            <br />
            ...
          </p>
        </Button>
      </ScrollArea>
      <Link href={"/diary/chat"} className="ml-auto">
        <IoAddCircleSharp size={"70px"} color="red"/>
      </Link>
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
