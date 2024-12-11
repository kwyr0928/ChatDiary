"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IoCheckmarkSharp,
  IoChevronBackSharp,
  IoTrashSharp
} from "react-icons/io5";
import ChatCard from "~/components/chatCard";
import InputTag from "~/components/inputTag";
import ResizeTextarea from "~/components/resizeTextarea";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/hooks/use-toast";

export default function Page({ params }: { params: { id: number } }) {
  const { toast } = useToast()
  const [isPublic, setIsPublic] = useState("private");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [text, setText] = useState(
    "栗が好きなAさんを誘い、パフェを食べに行った。私はさつまいものアイスが乗ったパフェで、Aさんは栗のパウンドケーキが乗ったパフェだった。私が見つけた店で喜んでくれて嬉しい。彼女が喜ぶ店をまた探したいと思った。"
  );
  const initialTags: string[] = ["タグ1", "タグ2"]
  const [nowTags, setTags] = useState<String[]>(initialTags)
  const [diaryDetail, setDiaryDetail] = useState({
    message: "get diary successfully",
    diaryData: {
      id: "cm4gxss8m0001foh9fxoz0d8v",
      userId: "cm4gtat1h0000rrm4ibketejy",
      title: "2024/12/9 20:16",
      summary: "修正した要約",
      isPublic: true,
      created_at: "2024-12-09T11:16:08.566Z",
    },
    tags: ["food", "donuts"],
    tagList: ["food", "donuts", "fi"],
    chatLog: [
      {
        message: "ドーナツ食べた",
        response: "ドーナツ食べたんだね~。\n",
      },
      {
        message: "おいしかった",
        response: "おいしかったんだね~。\n",
      },
      {
        message: "にいろとなずなとたべた",
        response: "三人で食べたんだね~。\n",
      },
      {
        message: "ぴょんすけにもらった",
        response: "ぴょんすけにもらったんだね~。\n",
      },
      {
        message: "楽しかった！",
        response: null,
      },
    ],
  });

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        // userId書き変え
        const userId = "cm4i0r0dr000014cn72v3t7j0";
        const response = await fetch(
          `/api/diary/${params.id}?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch diaries: ${response.status}`);
        }
        setDiaryDetail(await response.json());
        console.log(diaryDetail);
        setText(diaryDetail.diaryData.summary);
        setTags(diaryDetail.tags);
        if(diaryDetail.diaryData.isPublic === true){
          setIsPublic("public");
        }else{
          setIsPublic("private");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    void fetchDiaries();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <div className="fixed top-0 max-w-md flex w-full items-center justify-between pt-5 text-center bg-red-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger onClick={() => setIsOpen(true)} className="pl-3">
            <IoChevronBackSharp color="#f87171" size={"30px"} />
          </DialogTrigger>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle className="mt-5">編集内容を削除して戻りますか？</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-gray-500">
              編集内容は反映されません
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
              <Link href={"/diary/detail"}>
                <div className="my-2">
                  <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500">
                    はい
                  </Button>
                </div>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
        <p className="text-lg text-gray-700">{diaryDetail.diaryData.title}</p>
        <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
          <DialogTrigger onClick={() => setIsOpen2(true)} className="pr-5">
            <IoTrashSharp color="gray" size={"35px"} />
          </DialogTrigger>
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
                  className="w-[100px] rounded-full bg-white hover:bg-red-400 text-red-400 hover:text-white border border-red-400 hover:border-transparent"
                  onClick={() => setIsOpen2(false)}
                >
                  いいえ
                </Button>
              </div>
              <Link href={"/home"}>
                <div className="my-2">
                  <Button className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500" onClick={() => {
                    toast({
                      title: "日記を削除しました。",
                    })
                  }}>
                    はい
                  </Button>
                </div>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-[60px] mb-auto w-[85%]">
        <div className="flex items-center justify-start space-x-5">
          <p className="my-2 text-lg">日記本文</p>
          <Button onClick={handleSave}>
            <IoCheckmarkSharp size={"23px"} color="#f87171" onClick={() => {
              toast({
                title: "保存しました。",
              })
            }} />
          </Button>
        </div>
        <ResizeTextarea className="resize-none focus:outline-none w-full text-gray-600  h-36 px-5 py-3 rounded border border-gray-300 p-2" text={text} onChange={setText} />
        <p className="mb-2 mt-5 text-left text-lg">タグ</p>
        <div className="flex gap-3">
          <InputTag initialTags={initialTags} onChangeTags={setTags} />
        </div>
        <p className="mb-2 mt-5 text-left text-lg">公開範囲</p>
        {/* ラジオボタン */}
        <div className="mb-8">
          <RadioGroup  defaultValue="private" 
            value={isPublic}
            onValueChange={(value: "public" | "private") => setIsPublic(value)}
            className="space-y-2">
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
        <p className="my-2 text-lg">チャットログ</p>
      </div>
      <div className="mb-auto">
      {diaryDetail.chatLog.map((chat, index) => (
          <div key={index}>
            <ChatCard isAI={false}>{chat.message}</ChatCard>
            {chat.response && <ChatCard isAI={true}>{chat.response}</ChatCard>}
          </div>
        ))}
      </div>
    </div>
  );
}
