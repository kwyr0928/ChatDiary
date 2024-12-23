"use client";

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
  const [filterPublic, setFilterPublic] = useState<"all" | "public" | "private">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const theme = useThemeStore((state) => state.theme);
  const [keyword, setKeyword] = useState("");
  const [diaryList, setDiaryList] = useState<GetDiaryResponse>();
  const [shareData, setShareData] = useState("");
  const filteredDiary = diaryList
    ? diaryList.diaries.filter((d) =>
        JSON.stringify(d).toLowerCase().includes(keyword.toLowerCase()),
      ).filter((d) => {
        if (filterPublic === "public") return d.isPublic;
        if (filterPublic === "private") return !d.isPublic;
        return true; // "all" の場合
      }).sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : []; // 検索

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isSession, setIsSession] = useState(false);

    const loadingText = "日記読み込み中..."

    const toggleSortOrder = () => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };


    const handleFilterChange = (filter: "all" | "public" | "private") => {
      setFilterPublic(filter);
    };

  useEffect(() => {
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
            setIsLoading(false); // ローディングを終了
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          setIsLoading(false); // ローディングを終了
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
      }
    };

    if (isLoading) {
      return (
        <div className={`mx-auto flex min-h-screen w-full max-w-md items-center justify-center bg-theme${theme}-background text-gray-600`}>
          {loadingText.split("").map((char, index) => (
            <span
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={`animate-loadingBounce pb-4 text-3xl italic font-semibold tracking-widest font-sans flex-col`}
          >
            {char}
          </span>
          ))}
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
          <div className="flex justify-end space-x-5 mb-4">
          <Button
            onClick={toggleSortOrder}
            className={`rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
          >
            {sortOrder === "asc" ? "早い順" : "遅い順"}
          </Button>
           <select
            value={filterPublic}
            onChange={(e) => handleFilterChange(e.target.value as "all" | "public" | "private")}
            className="w-28 rounded-lg border border-gray-300 p-2"
          >
            <option value="all">すべて</option>
            <option value="public">public</option>
            <option value="private">private</option>
          </select>
        </div>

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
      <div className="fixed bottom-24 flex w-full max-w-md justify-end pr-4">
        <IoAddCircleSharp onClick={initializeDiary} size={"70px"} className={`text-theme${theme}-primary`} />
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
