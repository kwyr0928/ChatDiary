"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import {
    IoBarChartSharp,
    IoChevronBackSharp,
    IoCogSharp,
    IoHomeSharp,
    IoTrashSharp,
} from "react-icons/io5";
import ChatCard from "~/components/chatCard";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/hooks/use-toast";

export default function Page({ params }: { params: { id: number } }) {
  const [diaryDetail, setDiaryDetail] = useState({
    message: "get diary successfully",
    diaryData: {
      id: "cm4gxss8m0001foh9fxoz0d8v",
      userId: "cm4gtat1h0000rrm4ibketejy",
      title: "2024/12/9 20:16",
      summary: "修正した要約",
      isPublic: true,
      created_at: "2024-12-09T11:16:08.566Z",
    },
    tags: ["food", "donuts"],
    tagList: ["food", "donuts", "fi"],
    chatLog: [
      {
        message: "ドーナツ食べた",
        response: "ドーナツ食べたんだね~。\n",
      },
      {
        message: "おいしかった",
        response: "おいしかったんだね~。\n",
      },
      {
        message: "にいろとなずなとたべた",
        response: "三人で食べたんだね~。\n",
      },
      {
        message: "ぴょんすけにもらった",
        response: "ぴょんすけにもらったんだね~。\n",
      },
      {
        message: "楽しかった！",
        response: null,
      },
    ],
  });

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        // userId書き変え
        const userId = "cm4i0r0dr000014cn72v3t7j0";
        const response = await fetch(
          `/api/diary/${params.id}?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch diaries: ${response.status}`);
        }
        setDiaryDetail(await response.json());
        console.log(diaryDetail)
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    void fetchDiaries();
  }, []);

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="fixed top-0 flex w-full max-w-md items-center justify-between bg-red-50 pb-3 pt-5 text-center">
        <Link href={"/home"} className="pl-4">
          <IoChevronBackSharp color="#f87171" size={"30px"} />
        </Link>
        <p className="text-lg text-gray-700">{diaryDetail.diaryData.title}</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger onClick={() => setIsOpen(true)} className="pr-4">
            <IoTrashSharp color="gray" size={"35px"} />
          </DialogTrigger>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle className="mt-5">日記を削除しますか？</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-gray-500">
              この操作は元に戻せません
            </DialogDescription>
            <div className="flex justify-around">
              <div className="my-2">
                <Button
                  className="w-[100px] rounded-full border border-red-400 bg-white text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  いいえ
                </Button>
              </div>
              <Link href={"/home"}>
                <div className="my-2">
                  <Button
                    className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500"
                    onClick={() => {
                      toast({
                        title: "日記を削除しました。",
                      });
                    }}
                  >
                    はい
                  </Button>
                </div>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-[60px] w-[85%]">
        <div className="flex items-center justify-start space-x-5">
          <p className="my-2 text-lg">日記本文</p>
          <Link href={`/diary/edit/${params.id}`}>
            <GoPencil size={"23px"} color="gray" />
          </Link>
        </div>
        {/* カード */}
        <Card className="text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
            <p className="pb-2 pt-1 text-red-400">
              {diaryDetail.tagList.map((tag, index) => (
                <div key={index}>{tag}</div>
              ))}
            </p>
            {diaryDetail.diaryData.summary}
          </CardContent>
        </Card>
        <p className="mb-2 mt-8 text-lg">チャットログ</p>
      </div>
      <div className="mb-[120px]">
        {diaryDetail.chatLog.map((chat, index) => (
          <div key={index}>
            <ChatCard isAI={false}>{chat.message}</ChatCard>
            {chat.response && <ChatCard isAI={true}>{chat.response}</ChatCard>}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
