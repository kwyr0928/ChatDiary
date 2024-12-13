"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoBarChartSharp, IoCogSharp, IoHomeSharp } from "react-icons/io5";
import { Card, CardContent } from "~/components/ui/card";
import { toast } from "~/hooks/use-toast";

type FeedbackResponse = {
  message: string;
  monthly: string;
  analyses: string;
  continuation: boolean[];
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackResponse>();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  useEffect(() => {
    const fetchFeedBack = async () => {
      try {
        const response = await fetch(`/api/feedback/${year}/${month}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setFeedback(responseData);
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
    void fetchFeedBack();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-red-50 text-gray-600">
      <div className="mx-auto mb-[110px] w-[85%]">
        <p className="mb-5 mt-8 w-full text-left text-xl font-bold">
        {year}年{month}月の継続状況
        </p>
        <div className="grid grid-cols-7 items-center gap-3">
            {feedback?.continuation.map((isActive, index) => (
              <div
                key={index}
                className={`h-4 w-4 rounded-full ${
                  isActive ? "bg-green-500" : "bg-gray-300"
                } `}
              />
            ))}
        </div>
        <p className="mb-3 mt-5 w-full text-left text-xl font-bold">
          先月のまとめ
        </p>
        {/* カード */}
        <Card className="shadow-none">
          <CardContent className="px-5 py-3">{feedback?.monthly}</CardContent>
        </Card>
        <p className="mb-3 mt-12  w-full text-left text-xl font-bold">
          あなたの分析
        </p>
        {/* カード */}
        <Card className="mb-auto shadow-none">
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
          <IoBarChartSharp size={"50px"} color="#f87171" />
        </Link>
      </div>
    </div>
  );
}
