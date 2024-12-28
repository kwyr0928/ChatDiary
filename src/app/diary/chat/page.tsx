"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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
import { useThemeStore } from "~/store/themeStore";

type ChatResponse = {
  message: string;
  chatId: string;
  count: number;
  response: string;
  summary: string | null;
}

type DeleteResponse = {
  message: string;
}

type GetUserResponse = {
  message: string;
  email: string;
  theme: number;
}

export default function Chat() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const theme = useThemeStore((state) => state.theme);
  const [mode, setMode] = useState(0); // 深掘りモード
  const [inputText, setInputText] = useState(""); // 入力メッセージ
  const [count, setCount] = useState(0); // チャット回数
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>(
    [],
  ); // チャット内容
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // 要約生成中かどうか
  const [isSending, setIsSending] = useState(false); // 送信中かどうか
  const [isLoading, setIsLoading] = useState(true); // 送信中かどうか
  const router = useRouter();
  const params = useSearchParams();
  const diaryId = params.get("diaryId");
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && diaryId) {
      const storedData = localStorage.getItem(`chat-${diaryId}`);
      if (storedData) {
        const { count: storedCount, messages: storedMessages, mode: storedMode } = JSON.parse(storedData) as { count: number; messages: { text: string; isAI: boolean }[]; mode: number };
        setCount(storedCount);
        setMessages(storedMessages);
        setMode(storedMode);
      }
    }
  }, [diaryId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && diaryId) {
      localStorage.setItem(`chat-${diaryId}`, JSON.stringify({
        count,
        messages,
        mode
      }));
    }
  }, [count, messages, mode, diaryId]);

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined' && diaryId) {
      localStorage.removeItem(`chat-${diaryId}`);
    }
  };

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
      setIsOpen(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const start = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetUserResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
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
        router.replace("/signin");
      } finally {
        if(isSession){
          setIsLoading(false); // ローディングを終了
        }
      }
    }

    void start();
  }, []);

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
      const responseData = (await response.json()) as ChatResponse;
      console.log(responseData);
      if (response.ok) {
        setIsSession(true);
        if (count + 1 >= 5) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          clearLocalStorage();
          router.push(
            `/diary/new?res=${responseData.summary}&diaryId=${diaryId}`,
          );
          return;
        }
        setCount(count + 1);
        // AIの返信をメッセージリストに追加
        setMessages((prev) => [
          ...prev,
          { text: responseData.response, isAI: true },
        ]);
      } else { // 401 500 504
        let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            break;
          case 504:
            errorMessage = 'タイムアウト（504）：再試行してください。';
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
          break;
      }
      throw new Error(errorMessage);
      }
      // 入力フィールドをクリア
      setInputText("");
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
      setIsSending(false); // 送信完了
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = (await response.json()) as DeleteResponse;
      console.log(responseData);
      if (response.ok) {
        clearLocalStorage();
        router.push("/home");
      } else { // 500
        let errorMessage = '';
      switch (response.status) {
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

  const handleChange = (value: string) => {
    setMode(value === "episode" ? 0 : 1);
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
    <div className={`relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-theme${theme}-background text-gray-600`}>
      <div className="fixed top-0 mb-5 flex w-full max-w-md flex-col justify-center bg-white pt-5 text-center">
        <div className="mb-1 flex">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className="pl-5">
              <IoChevronBackSharp size={"30px"} className={`text-theme${theme}-primary`} />
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
                    className={`w-[100px] rounded-full border border-theme${theme}-primary bg-white text-theme${theme}-primary hover:border-transparent hover:bg-theme${theme}-hover hover:text-white`}
                    onClick={() => setIsOpen(false)}
                  >
                    いいえ
                  </Button>
                </div>
                <div onClick={handleDelete}>
                  <div className="my-2">
                    <Button className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}>
                      はい
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="mx-auto pr-12 text-md text-gray-700 font-medium">
            {new Date().toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {/* プルダウン */}
        <div className="mx-auto flex space-x-5 mb-3 w-[60%] items-center justify-center text-sm font-medium">
          <div className="flex items-center ">
            <Select onValueChange={handleChange}>
              <SelectTrigger className={`hover:bg-gray-50 border-theme${theme}-primary`}>
                <SelectValue placeholder="物事を&nbsp;" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="episode">物事を&nbsp;</SelectItem>
                  <SelectItem value="emotion">感情を&nbsp;</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p>深堀る！</p>
        </div>
      </div>
      <div className="w-full mb-[120px] mt-[130px]">
        {messages.map((message, index) => (
          <ChatCard key={index} isAI={message.isAI}>
            {message.text}
          </ChatCard>
        ))}
      </div>
      {/* チャット欄 */}
      <div className={`fixed bottom-0 w-full max-w-md items-end justify-center bg-theme${theme}-background pb-5 pt-3`}>
        {isSending ? (
          // 送信中の表示
          <LoaderCircle className="w-[360px] animate-spin" />
        ) : isGenerating ? (
          // 日記生成中の表示
          <p className="w-[360px] text-center">日記生成中...</p>
        ) : (
          <div>
            <p className="w-[360px] text-xs text-center pb-1">日記生成まであと <span className={`text-sm font-bold text-theme${theme}-primary`}>{5-count}</span> メッセージ</p>
            <div className="flex items-end justify-center space-x-2">
              <ResizeTextarea
                className={`w-[300px] resize-none rounded border p-1 focus:outline-none border-theme${theme}-background`}
                text={inputText}
                onChange={(text) => setInputText(text)}
                isLimit={true}
                placeholder={count >= 1 ? "AIと会話して思い出を振り返りましょう" : "今日はどんなことがありましたか？"}
              />
              <IoSendSharp
                onClick={handleSend}
                size={"30px"}
                className={`pb-1 text-theme${theme}-primary`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
