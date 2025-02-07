"use client";

import { useState } from "react";
import { IoSendSharp, IoTrashSharp } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";

/* UI表示テスト用ページ */
export default function Page() {
  const initialTags: string[] = [
    "タグ1",
    "タグ2",
    "タグ3",
    "タグ4",
    "タグ5",
    "タグ6",
    "タグ7",
  ]; // 変更前タグ(編集内容を取り消す際に返す)
  const [nowTags, setTags] = useState<string[]>(initialTags); //変更後タグ配列(タグ増減するたびに更新し、修正確定されたときにDB変更)
  const [deleteTags, setDeleteTags] = useState<string[]>([]); // 削除するタグとして選択しているかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const deleteTag = () => {
    setTags(() => nowTags.filter((tag) => !deleteTags.includes(tag)));
    // deleteTagsをサーバーに送る
    setIsOpen(false);
  };

  return (
    // 背景: bg-red-50
    <div className="flex items-center justify-center bg-red-50">
      <div className="flex w-full max-w-md flex-col items-start">
        {/* ボタンUI */}
        <div className="mb-5">
          <Label className="block text-lg">ボタン</Label>
          <Button className="bg-red-400 hover:bg-rose-500">
            塗りつぶしボタン
          </Button>
          <Button className="border border-red-400 bg-white text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white">
            枠つきボタン
          </Button>
        </div>

        {/* インプット */}
        <div className="mb-5">
          <Label className="block text-lg">入力欄</Label>
          <Input />
        </div>

        {/* チャット欄 */}
        <div className="mb-5">
          <Label className="block text-lg">チャット</Label>
          <div className="mb-3 flex items-end space-x-2">
            <textarea
              rows={4}
              className="resize-none rounded border p-1 focus:outline-none"
            />
            <IoSendSharp style={{ color: "#f87171", fontSize: "25px" }} />
          </div>
        </div>

        {/* 可変テキストエリア */}
        {/* <div className="mb-5">
                    <Label className="text-lg block">高さが変わるテキストエリア</Label>
                    <ResizeTextarea className="resize-none border rounded focus:outline-none mb-3" defaultValue="初期値" />
                </div> */}

        {/* タグ(見た目のみ) */}
        {/* <div className="mb-5">
                    <Label className="text-lg block">タグ</Label>
                    <InputTag initialTags={nowTags} onChangeTags={setTags} />
                </div> */}

        {/* ラジオボタン */}
        <div className="mb-5">
          <Label className="block text-lg">ラジオボタン</Label>
          <RadioGroup defaultValue="private">
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

        {/* カード */}
        <div className="mb-5">
          <Label className="block text-lg">カード</Label>
          {/* wは仮 */}
          <Card className="w-[350px] shadow-none">
            <CardContent className="p-3">
              出力された日記、チャット文、フィードバックなどを表示する際の白枠
            </CardContent>
          </Card>
        </div>

        {/* タグ履歴編集 */}
        <div className="mb-5 flex h-48 w-48 flex-col rounded-lg border bg-white">
          <div className="flex items-center justify-between py-2 pr-3">
            <span className="pl-3 text-base font-bold">タグ一覧</span>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <button
                onClick={() => {
                  if (deleteTags.length !== 0) {
                    setIsOpen(true);
                    setError("");
                  } else {
                    setIsOpen(false);
                    setError("タグを選択してください"); // 条件が false のときに実行
                  }
                }}
                className="pl-5"
              >
                <IoTrashSharp color="#9ca3af" size="25px" />
              </button>
              {isOpen && (
                <DialogContent className="w-[80%]">
                  <DialogHeader>
                    <DialogTitle className="mt-5">
                      チェックしたタグを削除しますか？
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-around">
                    <div className="my-2">
                      <Button
                        className="w-[100px] rounded-full border border-red-400 bg-white text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        いいえ
                      </Button>
                    </div>
                    <div className="my-2">
                      <Button
                        className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500"
                        onClick={deleteTag}
                      >
                        はい
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
          {error && <p className="mb-2 pl-2 text-sm text-red-500">{error}</p>}
          <ScrollArea className="flex-1 overflow-auto">
            {nowTags.map((tag, tagIndex) => (
              <div key={tagIndex}>
                <div className="flex items-center space-x-1 py-1 pl-2">
                  <Checkbox
                    checked={deleteTags?.includes(tag)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? setDeleteTags((prevDeleteTags) => [
                            ...prevDeleteTags,
                            tag,
                          ])
                        : setDeleteTags(
                            deleteTags.filter((deleteTag) => deleteTag !== tag),
                          );
                    }}
                    className="border-red-600 data-[state=checked]:border-red-400 data-[state=checked]:bg-red-400"
                  />
                  <label className="pl-1 text-base text-gray-600">{tag}</label>
                </div>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* プルダウン */}
        <div className="mb-5">
          <Label className="block text-lg">プルダウン</Label>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="px-3 focus-visible:ring-0">
                <SelectValue placeholder="あなたの気持ちを" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="one">要素１</SelectItem>
                  <SelectItem value="two">要素２</SelectItem>
                  <SelectItem value="three">要素３</SelectItem>
                  <SelectItem value="four">要素４</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap">深堀る！</span>
          </div>
        </div>

        {/* 日記カード */}
        {/* <div className="mb-5">
                    <Label className="text-lg block">日記カード</Label>
                    {
                        filteredDiary.length > 0 ? (
                            filteredDiary.map((d, index) => (
                                // 日記カード表示
                                <DiaryCard key={index} d={d} />
                            ))
                        ) : (
                            <p className="text-center text-gray-400">
                                該当する日記はありません。
                            </p>
                        )
                    }
                </div> */}
      </div>
    </div>
  );
}

// marge
