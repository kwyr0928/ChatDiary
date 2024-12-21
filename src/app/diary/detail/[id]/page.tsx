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
} from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { PiLockKeyFill } from "react-icons/pi";
import ChatCard from "~/components/chatCard";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type DiaryData = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
}

type ChatLogEntry = {
  message: string;
  response: string | null;
}

type GetDiaryResponse = {
  message: string;
  diaryData: DiaryData;
  tags: string[];
  tagList: string[];
  chatLog: ChatLogEntry[];
}

type DeleteDiaryResponse = {
  message: string;
}

export default function Page({ params }: { params: Promise<{ id: number }> }) {
   const theme = useThemeStore((state) => state.theme);
  const [diaryDetail, setDiaryDetail] = useState<GetDiaryResponse>();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const diary = use(params);
  const diaryId = diary.id;
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const fetchDiaryDetails = async () => {
      try {
        const response = await fetch(`/api/diary/${diaryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetDiaryResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          setDiaryDetail(responseData);
        } else { // 401 500
          let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            router.push("/home");
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          break;
      }
      throw new Error(errorMessage);
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: "予期しないエラーが発生しました。",
        });
      }
      } finally {
        if(isSession){
          setIsLoading(false); // ローディングを終了
        }
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
      const responseData = (await response.json()) as DeleteDiaryResponse;
      console.log(responseData);
      if (response.ok) {
        toast({
          description: "日記を削除しました。",
        });
        router.push("/home");
      } else { // 500
        let errorMessage = '';
      switch (response.status) {
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          break;
      }
      throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
        if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: "予期しないエラーが発生しました。",
        });
      }
    } finally {
      if(isSession){
        setIsLoading(false); // ローディングを終了
      }
    }
  };

  useEffect(() => {
    if(isSession){
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  if (isLoading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-theme${theme}-background text-gray-600`}>
      <div className="fixed top-0 flex w-full bg-white max-w-md items-center justify-between pb-5 pt-5 text-center">
        <Link href={"/home"} className="pl-4">
          <IoChevronBackSharp size={"30px"} className={`text-theme${theme}-primary`} />
        </Link>
        <p className="text-lg text-gray-700">{diaryDetail?.diaryData.title}</p>
        <Link href={`/diary/edit/${diaryId}`}>
          <GoPencil size={"33px"} className={`text-theme${theme}-primary mr-5`} />
        </Link>
      </div>
      <div className="mt-[60px] w-[85%]">
        <div className="flex items-center space-x-5">
          <p className="mb-3 mt-10 text-left text-lg font-bold">日記本文</p>
        </div>
        {/* カード */}
        <Card className="text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
            {diaryDetail?.tags && diaryDetail.tags.length > 0 && (
              <div className={`pb-2 pt-1 text-theme${theme}-primary`}>
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
        <p className="mt-7 text-left text-lg font-bold">公開状況</p>
        <div className="justify-left mb-5 mt-4 flex">
          {diaryDetail?.diaryData.isPublic ? (
          <div className="flex items-center space-x-2">
            <MdOutlinePublic size={30} className={`text-theme${theme}-primary mr-2`}/>
            <Label htmlFor="public">
            公開（他の人も見ることができます）
            </Label>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <PiLockKeyFill size={30} className={`text-theme${theme}-primary mr-2`}/>
            <Label htmlFor="private">
            非公開（外部には公開されません）
            </Label>
          </div>
        )}
        </div>
        <p className="mb-3 mt-10 text-lg font-bold">チャットログ</p>
      </div>
      <div className="mb-[140px]">
        {diaryDetail?.chatLog.map((chat, index) => (
          <div key={index}>
            <ChatCard isAI={false}>{chat.message}</ChatCard>
            {chat.response && <ChatCard isAI={true}>{chat.response}</ChatCard>}
          </div>
        ))}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="mx-auto mt-10 w-[80%]">
            <Button
              onClick={() => setIsOpen(true)}
              className={`w-full rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
            >
              日記を削除
            </Button>
          </div>
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
                  className={`w-[100px] rounded-full border border-theme${theme}-primary bg-white text-theme${theme}-primary hover:border-transparent hover:bg-theme${theme}-primary hover:text-white`}
                  onClick={() => setIsOpen(false)}
                >
                  いいえ
                </Button>
              </div>
              <Link href={"/home"}>
                <div className="my-2">
                  <Button
                    className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
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
