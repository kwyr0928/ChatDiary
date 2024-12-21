"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IoAddCircleSharp,
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp,
  IoSearchSharp
} from "react-icons/io5";
import DiaryCard from "~/components/diaryCard";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { toast } from "~/hooks/use-toast";
import { useThemeStore } from '~/store/themeStore';

type Diary = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
};

type GetDiaryResponse = {
  message: string;
  diaries: Diary[];
  tagList: string[];
};

type ShareData = {
  summary: string;
}

type GetShareResponse = {
  message: string;
  share: ShareData;
}

type StartChatResponse = {
  message: string;
  diaryId: string;
}

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  const [keyword, setKeyword] = useState("");
  const [diaryList, setDiaryList] = useState<GetDiaryResponse>();
  const [shareData, setShareData] = useState("");
  const filteredDiary = diaryList
    ? diaryList.diaries.filter((d) =>
        JSON.stringify(d).toLowerCase().includes(keyword.toLowerCase()),
      )
    : []; // 検索
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    console.log(theme);
    const fetchDiaries = async () => {
      // 日記一覧取得
      try {
        const shouldShowDialog = sessionStorage.getItem("showDialog");
        if (shouldShowDialog === "true") {
        setIsOpen(true);
        const response = await fetch(`/api/share`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetShareResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          setShareData(responseData.share.summary);
          sessionStorage.removeItem("showDialog");
        } else { // 401 500
          let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
        case 500:
          errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
          break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          break;
      }
      throw new Error(errorMessage);
        }
      }
      const response = await fetch(`/api/diary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetDiaryResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          setDiaryList(responseData);
        } else { // 401 500
          let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
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

    void fetchDiaries();
  }, []);

  useEffect(() => {
    if(isSession){
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);


    const initializeDiary = async () => {
      // 日記作成
      setIsLoading(true);
      try {
        const response = await fetch("/api/diary/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as StartChatResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          router.push(`/diary/chat?diaryId=${responseData.diaryId}`);
        } else { // 401 500
          let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
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

    if (isLoading) {
      return (
        <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
          <LoaderCircle className="animate-spin" />
        </div>
      );
    }

  return (
    <div className={`relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-theme${theme}-background text-gray-600`}>
      <div className="mx-auto mb-[140px] mt-[80px] w-[85%]">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="mt-5">
                  誰かの日記が届きました！
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-gray-500 my-3">
                {shareData}
              </DialogDescription>
                  <div className="my-2 mx-auto">
                    <Button className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`} onClick={() => (setIsOpen(false))}>
                      見た！
                    </Button>
                  </div>
            </DialogContent>
          </Dialog>
        {/* <ScrollArea> */}
        {filteredDiary.length > 0 ? (
          filteredDiary.map((d, index) => (
            // 日記カード表示
            <Link
              key={index}
              href={`/diary/detail/${d.id}`}
              className="focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            >
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
        )}
        {/* </ScrollArea> */}
      </div>
      <div className={`fixed top-0 max-w-md w-full bg-theme${theme}-background pb-4 pt-4`}>
        <div className="flex items-center mx-6 space-x-3">
        <IoSearchSharp size={"30px"} className={`text-theme${theme}-primary`} />
        <Input
          placeholder="日記を検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="shadow-sm"
        />
        </div>
      </div>
      <div onClick={initializeDiary} className="fixed bottom-24 flex w-full max-w-md justify-end pr-4">
        <IoAddCircleSharp size={"70px"} className={`text-theme${theme}-primary`} />
      </div>
      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} className={`text-theme${theme}-primary`} />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
