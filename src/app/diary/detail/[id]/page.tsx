"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
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

type ChatLogEntry = {
  message: string;
  response: string | null;
};

type DiaryData = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
};

type ApiResponse = {
  message: string;
  diaryData: DiaryData;
  tags: string[];
  tagList: string[];
  chatLog: ChatLogEntry[];
};

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [diaryDetail, setDiaryDetail] = useState<ApiResponse>();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const diary = use(params);
  const diaryId = diary.id;

  useEffect(() => {
    const fetchDiaryDetails = async () => {
      try {
        // userId書き変え
        const userId = "cm4ko75er0000eb00x6x4byn7"; // TODO セッション実装され次第変更
        const response = await fetch(`/api/diary/${diaryId}?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setDiaryDetail(responseData);
        } else {
          throw new Error(responseData);
        }
      } catch (error) {
        // 入力エラーメッセージ表示
        const errorMessage =
          error instanceof Error
            ? error.message
            : "予期しないエラーが発生しました";
        // エラーメッセージ表示　普通は出ないはず
        toast({
          variant: "destructive",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false); // ローディングを終了
      }
    };
    void fetchDiaryDetails();
  }, []);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        toast({
          description: "日記を削除しました。",
        });
        router.push("/home");
      } else {
        throw new Error(responseData);
      }
    } catch (error) {
      // 入力エラーメッセージ表示
      const errorMessage =
        error instanceof Error
          ? error.message
          : "予期しないエラーが発生しました";
      // エラーメッセージ表示　普通は出ないはず
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false); // ローディングを終了
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="fixed top-0 flex w-full max-w-md items-center justify-between bg-red-50 pb-3 pt-5 text-center">
        <Link href={"/home"} className="pl-4">
          <IoChevronBackSharp color="#f87171" size={"30px"} />
        </Link>
        <p className="text-lg text-gray-700">{diaryDetail?.diaryData.title}</p>
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
                    onClick={handleDelete}
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
        <div className="flex items-center justify-center">
          <p className="pr-2 text-center my-2 text-xl font-bold">日記本文</p>
          <Link href={`/diary/edit/${diaryId}`}>
            <GoPencil size={"23px"} color="gray" />
          </Link>
        </div>
        {/* カード */}
        <Card className="text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
            {diaryDetail?.tags && diaryDetail.tags.length > 0 && (
              <div className="pb-2 pt-1 text-red-400">
                {diaryDetail.tags.map((tag, index) => (
                  <span className="mr-4" key={index}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {diaryDetail?.diaryData.summary}
          </CardContent>
        </Card>
        <p className="mb-2 mt-8 text-lg">チャットログ</p>
      </div>
      <div className="mb-[120px]">
        {diaryDetail?.chatLog.map((chat, index) => (
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
