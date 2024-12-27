"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import InputTag from "~/components/inputTag";
import ResizeTextarea from "~/components/resizeTextarea";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type GetTagResponse = {
  message: string;
  tagList: string[];
}

type DiaryData = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
}

type UpdateDiaryResponse = {
  message: string;
  diaryData: DiaryData;
}

export default function New() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  const searchParams = useSearchParams();
  const res = searchParams.get("res");
  const [text, setText] = useState<string>(res ?? "")
  const [tags, setTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState("private");
  const [isLoading, setIsLoading] = useState(true);
  const diaryId = searchParams.get("diaryId");
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const fetchTagNames = async () => {
      try {
        if( res == undefined ) {
        router.push("/home");
        throw new Error("エラーが発生しました。もう一度やり直してください。");
        }
        const response = await fetch(`/api/diary/tag`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const responseData = (await response.json()) as GetTagResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          setTagList(responseData.tagList);
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
    }
    void fetchTagNames();
  }, [])

  useEffect(() => {
    if (tagList.length > 0) {
      console.log("tagList updated:", tagList);
    }
  }, [tagList]);

  const handleCreateDiary = async () => {
    setIsLoading(true);
    sessionStorage.setItem("showDialog", "true");
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
      router.push("/home");
    } else { // 401 500
      sessionStorage.removeItem("showDialog");
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
    <div className={`relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
      <div className="fixed top-0 mb-5 flex w-full max-w-md flex-col justify-around bg-white pt-5 text-center">
        <div className="mb-3 flex">
          <p className="mx-auto my-auto text-lg font-medium">
            {new Date().toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div className="mb-auto mt-[70px] w-[85%]">
        <p className="mt-5 mb-3 text-left text-lg font-medium">生成された日記<span className="text-sm">（修正可）</span></p>
        <ResizeTextarea
          className="h-36 w-full resize-none rounded border border-gray-300 p-2 px-5 py-3 text-gray-600 focus:outline-none"
          text={text}
          onChange={(newText) => {
            setText(newText);
          }}
          isLimit={false}
        />
        <p className="mt-8 text-left text-lg font-medium">タグ</p>
        <div className="flex justify-center">
          <InputTag initialTags={tags} initialTagList={tagList} onChangeTags={setTags} />
        </div>
        <p className="mt-7 text-left text-lg font-medium">公開状況</p>
        {/* ラジオボタン */}
        <div className="mb-5 flex justify-left mt-4">
          <RadioGroup
            defaultValue="private"
            value={isPublic}
            onValueChange={(value: "public" | "private") => {
              setIsPublic(value);
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
        </div>
        <Link href={"/home"}>
          {/* ボタンUI */}
          <div className="my-10 flex justify-center">
            <Button
              onClick={handleCreateDiary}
              className={`w-[80%] rounded-full bg-theme${theme}-primary text-xl hover:bg-theme${theme}-hover mt-6`}
            >
              作成する！
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
