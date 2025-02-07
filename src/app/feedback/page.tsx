"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBarChartSharp, IoCogSharp, IoHomeSharp } from "react-icons/io5";
import { Card, CardContent } from "~/components/ui/card";
import { toast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type FeedbackResponse = {
  message: string;
  monthly: string;
  analyses: string;
  continuation: boolean[];
};

export default function Page() {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackResponse>();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const [isSession, setIsSession] = useState(false);
  const loadingText = "読み込み中...";

  useEffect(() => {
    const fetchFeedBack = async () => {
      try {
        const response = await fetch(`/api/feedback/${year}/${month}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as FeedbackResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          setFeedback(responseData);
        } else {
          // 401 500
          let errorMessage = "";
          switch (response.status) {
            case 401:
              errorMessage = "認証エラー（401）: ログインが必要です。";
              router.push("/signin");
              break;
            case 500:
              errorMessage = "サーバーエラー（500）：処理に失敗しました。";
              break;
            default:
              errorMessage = "予期しないエラーが発生しました。";
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
        if (isSession) {
          setIsLoading(false); // ローディングを終了
        }
      }
    };
    void fetchFeedBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, router, year]);

  useEffect(() => {
    if (isSession) {
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  if (isLoading) {
    return (
      <div
        className={`mx-auto flex min-h-screen w-full max-w-md items-center justify-center bg-theme${theme}-background text-rose-950`}
      >
        {loadingText.split("").map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={`animate-loadingBounce flex-col pb-4 font-mplus text-3xl font-medium italic tracking-wider`}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-theme${theme}-background text-gray-600`}
    >
      <div className="mx-auto mb-[110px] w-[85%]">
        <p className="mb-5 mt-8 w-full text-left text-xl font-bold">
          {year}年{month}月の継続状況
        </p>
        <div className="grid grid-cols-7 place-items-center items-center gap-3">
          {feedback?.continuation.map((isActive, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-300"
              } `}
            />
          ))}
        </div>
        <p className="mb-3 mt-8 w-full text-left text-xl font-bold">
          先月のまとめ
        </p>
        {/* カード */}
        <Card className={`shadow-none border-theme${theme}-background`}>
          <CardContent className="px-5 py-3">{feedback?.monthly}</CardContent>
        </Card>
        <p className="mb-3 mt-9 w-full text-left text-xl font-bold">
          あなたの分析
        </p>
        {/* カード */}
        <Card className={`mb-auto shadow-none border-theme${theme}-background`}>
          <CardContent className="px-5 py-3">{feedback?.analyses}</CardContent>
        </Card>
      </div>
      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp
            size={"50px"}
            className={`text-theme${theme}-primary`}
          />
        </Link>
      </div>
    </div>
  );
}
