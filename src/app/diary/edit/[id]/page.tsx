"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  IoBarChartSharp,
  IoChevronBackSharp,
  IoCogSharp,
  IoHomeSharp
} from "react-icons/io5";
import { RiSave3Line } from "react-icons/ri";
import ChatCard from "~/components/chatCard";
import InputTag from "~/components/inputTag";
import ResizeTextarea from "~/components/resizeTextarea";
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
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
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
  const { toast } = useToast();
  const [isPublic, setIsPublic] = useState("private");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const diary = use(params);
  const diaryId = diary.id;
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [diaryDetail, setDiaryDetail] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchDiaryDetails = async () => {
      try {
        const response = await fetch(`/api/diary/${diaryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setDiaryDetail(responseData);
          setText(responseData.diaryData.summary);
          setTags(responseData.tags);
          setTagList(responseData.tagList);
          if (responseData.diaryData.isPublic === true) {
            setIsPublic("public");
          } else {
            setIsPublic("private");
          }
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
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setIsChanged(false);
        toast({
          description: "変更を保存しました。",
        });
        router.push(`/diary/detail/${diaryId}`)
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

  const handleSetTags = (newTags: string[]) => {
    setTags(newTags)
    setIsChanged(true);
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="fixed top-0 flex w-full max-w-md items-center justify-between bg-red-50 pt-5 text-center">
        {isChanged ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className="pl-3">
              <IoChevronBackSharp color="#f87171" size={"30px"} />
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
                    className="w-[100px] rounded-full border border-red-400 bg-white text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    いいえ
                  </Button>
                </div>
                <Link href={`/diary/detail/${diaryId}`}>
                  <div className="my-2">
                    <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                      はい
                    </Button>
                  </div>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Link className="ml-3" href={`/diary/detail/${diaryId}`}>
            <IoChevronBackSharp color="#f87171" size={"30px"} />
          </Link>
        )}
        <p className="text-lg text-gray-700">{diaryDetail?.diaryData.title}</p>
          <div onClick={handleSave}>
            <RiSave3Line size={"35px"} color="#f87171" className="mr-5" />
          </div>
      </div>
      <div className="mb-auto mt-[60px] w-[85%]">
        <div className="flex items-center space-x-5">
          <p className="my-2 text-left text-lg">日記本文</p>
        </div>
        {!isSaving ? (
          <ResizeTextarea
            className="h-36 w-full resize-none rounded border border-gray-300 p-2 px-5 py-3 text-gray-600 focus:outline-none"
            text={text}
            onChange={(newText) => {
              setText(newText);
              setIsChanged(true);
            }}
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        <p className="mb-2 mt-7 text-left text-lg">タグ</p>
        <div className="flex justify-center">
        {!isSaving ? (
          <InputTag
            initialTags={tags}
            initialTagList={tagList}
            onChangeTags={(newTags) => {
              handleSetTags(newTags)
            }}
            />
          ) : (
            <div className="flex h-36 w-full items-center justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
        </div>
        <p className="mb-2 mt-7 text-left text-lg">公開範囲</p>
        {/* ラジオボタン */}
        <div className="mb-5 flex justify-center">
        {!isSaving ? (
          <Card className="text-gray-600 shadow-none">
            <CardContent className="px-5 py-3">
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
                    className="border-red-400"
                  />
                  <Label htmlFor="public">
                    公開（他の人も見ることができます）
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="private"
                    id="private"
                    className="border-red-400"
                  />
                  <Label htmlFor="private">
                    非公開（外部には公開されません）
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          ) : (
            <div className="flex h-36 mx-auto items-center justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
        </div>
        <p className="my-2 text-lg">チャットログ</p>
      </div>
      <div className="mb-auto">
        {diaryDetail?.chatLog.map((chat, index) => (
          <div key={index}>
            <ChatCard isAI={false}>{chat.message}</ChatCard>
            {chat.response && <ChatCard isAI={true}>{chat.response}</ChatCard>}
          </div>
        ))}
        <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
          <div className="w-[60%] mt-5 mx-auto">
            <Button onClick={() => setIsOpen2(true)} className="w-full rounded-full bg-red-400 hover:bg-rose-500">
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
                  className="w-[100px] rounded-full border border-red-400 bg-white text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
                  onClick={() => setIsOpen2(false)}
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
