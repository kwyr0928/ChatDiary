"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import InputTag from "~/components/inputTag";
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

export default function New() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <Page />
       </Suspense>
  )
}

function Page() {
  const router = useRouter();
  const initialTags: string[] = ["タグ1", "タグ2"]
  const [nowTags, setTags] = useState<String[]>(initialTags)
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState("private");
  const searchParams = useSearchParams();
  const res = searchParams.get("res");
  const diaryId = searchParams.get("diaryId");

  const handleCreateDiary = async () => {
    try {
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "cm4hw5qr900022sld4wo2jlcb",
          summary: res,
          tags: nowTags,
          isPublic: isPublic === 'public'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create diary');
      }

      const data = await response.json();
      console.log(data);
      router.push('/home');
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="fixed top-0 max-w-md mb-5 flex w-full flex-col justify-around bg-white pt-5 text-center">
        <div className="mb-3 flex">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          </Dialog>
          <p className="my-auto mr-12 w-[95%] text-lg">2024/10/2</p>
        </div>
      </div>
      <div className="w-[85%] mt-[70px] mb-auto">
        <p className="my-2 text-center text-lg">出力された日記</p>
        {/* カード */}
        <Card className="text-gray-600 shadow-none">
          <CardContent className="px-5 py-3">
           {res}
          </CardContent>
        </Card>
        <p className="mb-2 mt-5 text-left text-lg">タグ</p>
        <div className="flex gap-3">
        <InputTag initialTags={initialTags} onChangeTags={setTags} />
          {/* <Tag text="food" />
          <Tag text="Aちゃん" />
          <IoAddCircleOutline
            color="#f87171"
            size={"30px"}
            className="mt-0.5"
          /> */}
        </div>
        <p className="mb-2 mt-5 text-left text-lg">公開範囲</p>
        {/* ラジオボタン */}
        <div className="mb-5">
        <RadioGroup 
            defaultValue="private" 
            value={isPublic}
            onValueChange={(value: "public" | "private") => setIsPublic(value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
            <RadioGroupItem
                value="public"
                id="public"
                className="border-red-400"
              />
              <Label htmlFor="public">公開</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="private"
                id="private"
                className="border-red-400"
              />
              <Label htmlFor="private">非公開</Label>
            </div>
          </RadioGroup>
        </div>
        <Link href={"/home"}>
          {/* ボタンUI */}
          <div className="flex justify-center my-10">
            <Button 
            onClick={handleCreateDiary}
            className="bg-red-400 hover:bg-rose-500 rounded-full w-[80%] text-xl">作成する！</Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
