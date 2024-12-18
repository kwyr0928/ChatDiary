"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { IoChevronBackSharp, IoSendSharp } from "react-icons/io5";
import ChatCard from "~/components/chatCard";
import ResizeTextarea from "~/components/resizeTextarea";
import { Button } from "~/components/ui/button";

import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "~/hooks/use-toast";

export default function Chat() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const [mode, setMode] = useState(0); // 深掘りモード
  const [inputText, setInputText] = useState(""); // 入力メッセージ
  const [count, setCount] = useState(0); // チャット回数
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>(
    [],
  ); // チャット内容
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // 要約生成中かどうか
  const [isSending, setIsSending] = useState(false); // 送信中かどうか
  const router = useRouter();
  const params = useSearchParams();
  const diaryId = params.get("diaryId");

  const handleSend = async () => {
    // メッセージを送信
    // 入力が空の場合は送信しない
    if (!inputText.trim() || !diaryId || isSending) return;
    if (count + 1 >= 5) {
      setIsGenerating(true); // 要約生成中に設定
    } else {
      setIsSending(true); // 送信中に設定
    }
    try {
      // ユーザーメッセージをメッセージリストに追加
      setMessages((prev) => [...prev, { text: inputText, isAI: false }]);
      // APIにメッセージ送信
      const response = await fetch(`/api/chat/${diaryId}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: mode,
          text: inputText,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        if (count + 1 >= 5) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          router.push(
            `/diary/new?res=${responseData.response}&diaryId=${diaryId}`,
          );
        }
        setCount(count + 1);
        // AIの返信をメッセージリストに追加
        setMessages((prev) => [
          ...prev,
          { text: responseData.response, isAI: true },
        ]);
      } else {
        throw new Error(responseData);
      }
      // 入力フィールドをクリア
      setInputText("");
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
      setIsSending(false); // 送信完了
    }
  };

  const handleDelete = async () => {
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
    }
  };

  const handleChange = (value: string) => {
    setMode(value === "episode" ? 0 : 1);
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-red-50 text-gray-600">
      <div className="fixed top-0 mb-5 flex w-full max-w-md flex-col justify-center bg-white pt-5 text-center">
        <div className="mb-3 flex">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className="pl-5 mr-auto">
              <IoChevronBackSharp color="#f87171" size={"30px"} />
            </DialogTrigger>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="mt-5">
                  日記作成を中止して戻りますか？
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-center text-gray-500">
                チャット内容は削除されます
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
                <div onClick={handleDelete}>
                  <div className="my-2">
                    <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                      はい
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="my-auto mr-12 w-[95%] text-lg text-gray-700">
            {new Date().toLocaleDateString("ja-JP")}
          </p>
        </div>
        {/* プルダウン */}
        <div className="mx-auto mb-3 w-fit items-center">
          <div className="flex items-center space-x-2">
            <Select onValueChange={handleChange}>
              <SelectTrigger className="px-3 hover:bg-gray-50">
                <SelectValue placeholder="物事掘り下げモード" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="episode">物事掘り下げモード</SelectItem>
                  <SelectItem value="emotion">感情掘り下げモード</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap">深堀る！</span>
          </div>
        </div>
      </div>
      <div className="mb-[120px] mt-[130px] w-fill">
        {messages.map((message, index) => (
          <ChatCard key={index} isAI={message.isAI}>
            {message.text}
          </ChatCard>
        ))}
      </div>
      {/* チャット欄 */}
      <div className="fixed bottom-0 flex items-end justify-center w-full max-w-md bg-red-50 pb-5 pt-3">
        {isSending ? (
          // 送信中の表示
          <LoaderCircle className="w-[300px] animate-spin" />
        ) : isGenerating ? (
          // 回答生成中の表示
          <p className="w-[300px] text-center">回答生成中...</p>
        ) : (
          <div className="flex items-end justify-center space-x-2">
          <ResizeTextarea
          className="w-[300px] resize-none rounded border p-1 focus:outline-none"
            text={inputText}
            onChange={(text) => setInputText(text)}
            isLimit={true}
          />
          <IoSendSharp onClick={handleSend} color="#f87171" size={"30px"} className="pb-1" />
          </div>
        )}
      </div>
    </div>
  );
}
