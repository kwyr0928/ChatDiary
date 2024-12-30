"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  IoBarChartSharp,
  IoChevronBackSharp,
  IoCogSharp,
  IoHomeSharp,
} from "react-icons/io5";
import { RiSave3Line } from "react-icons/ri";
import ChatCard from "~/components/chatCard";
import InputTag from "~/components/inputTag";
import ResizeTextarea from "~/components/resizeTextarea";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type DiaryData = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
};

type ChatLogEntry = {
  message: string;
  response: string | null;
};

type GetDiaryResponse = {
  message: string;
  diaryData: DiaryData;
  tags: string[];
  tagList: string[];
  chatLog: ChatLogEntry[];
};

type UpdateDiaryResponse = {
  message: string;
  diaryData: DiaryData;
};

type DeleteDiaryResponse = {
  message: string;
};

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const theme = useThemeStore((state) => state.theme);
  const { toast } = useToast();
  const [isPublic, setIsPublic] = useState("private");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const diary = use(params);
  const diaryId = diary.id;
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [diaryDetail, setDiaryDetail] = useState<GetDiaryResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && diaryId) {
      const storedData = localStorage.getItem(`edit-${diaryId}`);
      if (storedData) {
        const {
          isPublic: storedPublic,
          text: storedText,
          tags: storedTags,
          tagList: storedTagList,
          isChanged: storedIsChanged,
        } = JSON.parse(storedData) as {
          isPublic: string;
          text: string;
          tags: string[];
          tagList: string[];
          isChanged: boolean;
        };
        console.log(storedData);
        setIsPublic(storedPublic);
        setText(storedText);
        setTags(storedTags);
        setTagList(storedTagList);
        setIsChanged(storedIsChanged);
      }
    }
  }, [diaryId]);

  useEffect(() => {
    if (typeof window !== "undefined" && diaryId) {
      localStorage.setItem(
        `edit-${diaryId}`,
        JSON.stringify({
          isPublic,
          text,
          tags,
          tagList,
          isChanged,
        }),
      );
    }
  }, [diaryId, isPublic, text, tags, tagList, isChanged]);

  const clearLocalStorage = () => {
    if (typeof window !== "undefined" && diaryId) {
      localStorage.removeItem(`edit-${diaryId}`);
    }
  };

  useEffect(() => {
    if (isChanged) {
      window.history.pushState(null, "", window.location.href);
    }
    const handlePopState = (event: PopStateEvent) => {
      if (isChanged) {
        event.preventDefault();
        window.history.pushState(null, "", window.location.href);
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isChanged]);

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
          const storedData = localStorage.getItem(`edit-${diaryId}`);
          if (storedData != null) {
            const { text: storedText } = JSON.parse(storedData) as {
              isPublic: string;
              text: string;
              tags: string[];
              tagList: string[];
              isChanged: boolean;
            };
            setDiaryDetail(responseData);
            if (storedText == "") {
              setText(responseData.diaryData.summary);
              setTags(responseData.tags);
              setTagList(responseData.tagList);
              if (responseData.diaryData.isPublic === true) {
                setIsPublic("public");
              } else {
                setIsPublic("private");
              }
            }
          }
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
              router.push("/home");
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
    void fetchDiaryDetails();
  }, [diaryId, isSession, router, toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: text,
          tags: tags,
          isPublic: isPublic === "public",
        }),
      });
      const responseData = (await response.json()) as UpdateDiaryResponse;

      console.log(responseData);
      if (response.ok) {
        setIsSession(true);
        setIsChanged(false);
        toast({
          description: "変更を保存しました。",
        });
        clearLocalStorage();
        router.push(`/diary/detail/${diaryId}`);
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
      setIsSaving(false); // 保存終了
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
      const responseData = (await response.json()) as DeleteDiaryResponse;
      console.log(responseData);
      if (response.ok) {
        toast({
          description: "日記を削除しました。",
        });
        clearLocalStorage();
        router.push("/home");
      } else {
        // 500
        let errorMessage = "";
        switch (response.status) {
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

  useEffect(() => {
    if (isSession) {
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  if (isLoading) {
    return (
      <div
        className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}
      >
        <LoaderCircle className={`animate-spin text-theme${theme}-primary`} />
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}
    >
      <div className="fixed top-0 flex w-full max-w-md items-center justify-between bg-white pb-5 pt-5 text-center">
        {isChanged ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className="pl-3">
              <IoChevronBackSharp
                size={"30px"}
                className={`text-theme${theme}-primary`}
              />
            </DialogTrigger>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="mt-5">
                  編集内容を削除して戻りますか？
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-center text-gray-500">
                編集内容は反映されません
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
                <Link href={`/diary/detail/${diaryId}`}>
                  <div className="my-2">
                    <Button
                      className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
                      onClick={() => {
                        clearLocalStorage();
                      }}
                    >
                      はい
                    </Button>
                  </div>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Link className="ml-3" href={`/diary/detail/${diaryId}`}>
            <IoChevronBackSharp
              size={"30px"}
              className={`text-theme${theme}-primary`}
            />
          </Link>
        )}
        <p className="text-lg font-medium text-gray-700">
          {diaryDetail?.diaryData.title}
        </p>
        <div onClick={handleSave}>
          <RiSave3Line
            size={"35px"}
            className={`text-theme${theme}-primary mr-5`}
          />
        </div>
      </div>
      <div className="mt-[60px] w-[85%]">
        <div className="flex items-center space-x-5">
          <p className="mb-3 mt-10 text-left text-lg font-medium">日記本文</p>
        </div>
        {!isSaving ? (
          <ResizeTextarea
            className="h-36 w-full resize-none rounded border border-gray-300 p-2 px-5 py-3 text-gray-600 focus:outline-none"
            text={text}
            onChange={(newText) => {
              setText(newText);
              setIsChanged(true);
            }}
            isLimit={false}
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center">
            <LoaderCircle
              className={`animate-spin text-theme${theme}-primary`}
            />
          </div>
        )}
        <p className="mt-8 text-left text-lg font-medium">タグ</p>
        <div className="flex justify-center">
          {!isSaving ? (
            <InputTag
              initialTags={tags}
              initialTagList={tagList}
              onChangeTags={(newTags) => {
                setIsChanged(true);
                setTags(newTags);
              }}
            />
          ) : (
            <div className="flex h-36 w-full items-center justify-center">
              <LoaderCircle
                className={`animate-spin text-theme${theme}-primary`}
              />
            </div>
          )}
        </div>
        <p className="mt-7 text-left text-lg font-medium">公開状況</p>
        {/* ラジオボタン */}
        <div className="justify-left mb-5 mt-4 flex">
          {!isSaving ? (
            <RadioGroup
              defaultValue="private"
              value={isPublic}
              onValueChange={(value: "public" | "private") => {
                setIsPublic(value);
                setIsChanged(true);
              }}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="public"
                  id="public"
                  className={`border-theme${theme}-primary`}
                />
                <Label htmlFor="public">
                  公開（他の人も見ることができます）
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="private"
                  id="private"
                  className={`border-theme${theme}-primary`}
                />
                <Label htmlFor="private">
                  非公開（外部には公開されません）
                </Label>
              </div>
            </RadioGroup>
          ) : (
            <div className="mx-auto flex h-36 items-center justify-center">
              <LoaderCircle
                className={`animate-spin text-theme${theme}-primary`}
              />
            </div>
          )}
        </div>
        <p className="mb-3 mt-10 text-lg font-medium">チャットログ</p>
      </div>
      <div className="mb-[140px]">
        {diaryDetail?.chatLog.map((chat, index) => (
          <div key={index}>
            <ChatCard isAI={false}>{chat.message}</ChatCard>
            {chat.response && <ChatCard isAI={true}>{chat.response}</ChatCard>}
          </div>
        ))}
        <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
          <div className="mx-auto mt-10 w-[60%]">
            <Button
              onClick={() => setIsOpen2(true)}
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
                  className={`w-[100px] rounded-full border border-theme${theme}-primary bg-white text-theme${theme}-primary hover:border-transparent hover:bg-theme${theme}-hover hover:text-white`}
                  onClick={() => setIsOpen2(false)}
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
          <IoCogSharp
            size={"50px"}
            color="gray"
            onClick={() => {
              clearLocalStorage();
            }}
          />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp
            size={"50px"}
            color="gray"
            onClick={() => {
              clearLocalStorage();
            }}
          />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp
            size={"50px"}
            color="gray"
            onClick={() => {
              clearLocalStorage();
            }}
          />
        </Link>
      </div>
    </div>
  );
}
