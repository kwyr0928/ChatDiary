"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

type Diary = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
};

type ApiResponse = {
  message: string;
  diaries: Diary[];
  tagList: string[];
};

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [diaryList, setDiaryList] = useState<ApiResponse>();
  const [shareData, setShareData] = useState();
  const filteredDiary = diaryList
    ? diaryList.diaries.filter((d) =>
        JSON.stringify(d).toLowerCase().includes(keyword.toLowerCase()),
      )
    : []; // 検索
    const [isOpen, setIsOpen] = useState(false);
    const params = useSearchParams();
    const diaryId = params.get("diaryId");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

  useEffect(() => {
    const fetchDiaries = async () => {
      // 日記一覧取得
      
      try {
      if (diaryId != undefined) {
        setIsOpen(true);
        const response = await fetch(`/api/share`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setShareData(responseData);
        } else {
          throw new Error(responseData);
        }
      }
        const response = await fetch(`/api/diary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setDiaryList(responseData);
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

    void fetchDiaries();
  }, []);

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
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          router.push(`/diary/chat?diaryId=${responseData.diaryId}`);
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
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="mx-auto mb-[140px] mt-[80px] w-[85%]">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="mt-5">
                  誰かの日記が届きました！
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-gray-500 my-3">
                {shareData.share.summary}
              </DialogDescription>
                  <div className="my-2 mx-auto">
                    <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500" onClick={() => (setIsOpen(false))}>
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
      <div className="fixed top-0 max-w-md w-full bg-red-50 pb-4 pt-4">
        <div className="flex items-center mx-6 space-x-3">
        <IoSearchSharp size={"30px"} color="#EB6B6B" />
        <Input
          placeholder="日記を検索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="shadow-sm"
        />
        </div>
      </div>
      <div onClick={initializeDiary} className="fixed bottom-24 flex w-full max-w-md justify-end pr-4">
        <IoAddCircleSharp size={"70px"} color="#f87171" />
      </div>
      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
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
