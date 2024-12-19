"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import InputTag from "~/components/inputTag";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/hooks/use-toast";

export default function New() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState("private");
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const res = searchParams.get("res");
  const diaryId = searchParams.get("diaryId");

  useEffect(() => {
    const fetchTagNames = async () => {
      try {
        const response = await fetch(`/api/diary/tag`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const responseData = await response.json();
        console.log(responseData.message);
        if (response.ok) {
          setTagList(responseData.tagList);
        } else {
          throw new Error(responseData);
        }
      } catch (error) {
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
    }
    void fetchTagNames();
  }, [])

  useEffect(() => {
    if (tagList.length > 0) {
      console.log("tagList updated:", tagList);
    }
  }, [tagList]);

  const handleCreateDiary = async () => {
    try {
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: res,
          tags: tags,
          isPublic: isPublic === "public",
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
      router.push(`/home?diaryId=${diaryId}`);
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
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="fixed top-0 mb-5 flex w-full max-w-md flex-col justify-around bg-white pt-5 text-center">
        <div className="mb-3 flex">
          {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)} className="pl-5">
              <IoChevronBackSharp color="#f87171" size={"30px"} />
            </DialogTrigger>
            <DialogContent className="w-[80%]">
              <DialogHeader>
                <DialogTitle className="mt-5">編集内容を削除して戻りますか？</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-center text-gray-500">
                作成した日記は削除されます
              </DialogDescription>
              <div className="flex justify-around">
                <div className="my-2">
                  <Button
                    className="w-[100px] rounded-full bg-white hover:bg-red-400 text-red-400 hover:text-white border border-red-400 hover:border-transparent"
                    onClick={() => setIsOpen(false)}
                  >
                    いいえ
                  </Button>
                </div>
                <Link href={"/home"}>
                  <div className="my-2">
                    <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                      はい
                    </Button>
                  </div>
                </Link>
              </div>
            </DialogContent>
          </Dialog> */}
          <p className="mx-auto my-auto text-lg">
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
        <p className="mt-5 mb-3 text-left text-lg">出力された日記</p>
        {/* カード */}
        <Card className="text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">{res}</CardContent>
        </Card>
        <p className="mt-8 text-left text-lg">タグ</p>
        <div className="flex justify-center">
          <InputTag initialTags={tags} initialTagList={tagList} onChangeTags={setTags} />
        </div>
        <p className="mt-7 text-left text-lg">公開状況</p>
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
        </div>
        <Link href={"/home"}>
          {/* ボタンUI */}
          <div className="my-10 flex justify-center">
            <Button
              onClick={handleCreateDiary}
              className="w-[80%] rounded-full bg-red-400 text-xl hover:bg-rose-500 mt-6"
            >
              作成する！
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
