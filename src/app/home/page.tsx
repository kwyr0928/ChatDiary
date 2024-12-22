"use client";

import { LoaderCircle, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";

import {
  IoAddCircleSharp,
  IoBarChartSharp,
  IoCogSharp,
  IoHomeSharp,
  IoSearchSharp,
} from "react-icons/io5";
import DiaryCard from "~/components/diaryCard";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/hooks/use-toast";
import { useThemeStore } from "~/store/themeStore";

type Diary = {
  id: string;
  userId: string;
  title: string;
  summary: string;
  isPublic: boolean;
  created_at: string;
  tags: string[];
};

type GetDiaryResponse = {
  message: string;
  diaries: Diary[];
  tagList: string[];
};

type ShareData = {
  summary: string;
};

type GetShareResponse = {
  message: string;
  share: ShareData;
};

type StartChatResponse = {
  message: string;
  diaryId: string;
};

export default function Page() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterPublic, setFilterPublic] = useState<
    "all" | "public" | "private"
  >("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const theme = useThemeStore((state) => state.theme);
  const [keyword, setKeyword] = useState("");
  const [diaryList, setDiaryList] = useState<GetDiaryResponse>();
  const [shareData, setShareData] = useState("");
  const [isTagPopoverOpen, setIsTagPopoverOpen] = useState(false);
  const filteredDiary = diaryList
    ? diaryList.diaries
        .filter((d) =>
          JSON.stringify(d).toLowerCase().includes(keyword.toLowerCase()),
        )
        .filter((d) => {
          if (filterPublic === "public") return d.isPublic;
          if (filterPublic === "private") return !d.isPublic;
          return true; // "all" の場合
        })
        .filter((d) => {
          if (selectedTags.length === 0) return true;
          return selectedTags.some((tag) => d.tags.includes(tag));
        })
        .sort((a, b) =>
          sortOrder === "asc"
            ? new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
        )
    : []; // 検索

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isSession, setIsSession] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  useEffect(() => {
    const fetchDiaries = async () => {
      // 日記一覧取得
      try {
        const shouldShowDialog = sessionStorage.getItem("showDialog");
        if (shouldShowDialog === "true") {
          setIsOpen(true);
          const response = await fetch(`/api/share`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseData = (await response.json()) as GetShareResponse;
          console.log(responseData);
          if (response.ok) {
            setIsSession(true);
            setShareData(responseData.share.summary);
            sessionStorage.removeItem("showDialog");
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
        }
        const response = await fetch(`/api/diary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetDiaryResponse;
        console.log(responseData);
        if (response.ok) {
          setIsSession(true);
          setDiaryList(responseData);
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

    void fetchDiaries();
  }, []);

  useEffect(() => {
    if (isSession) {
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  const initializeDiary = async () => {
    // 日記作成
    setIsLoading(true);
    try {
      const response = await fetch("/api/diary/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = (await response.json()) as StartChatResponse;
      console.log(responseData);
      if (response.ok) {
        setIsSession(true);
        router.push(`/diary/chat?diaryId=${responseData.diaryId}`);
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
            setIsLoading(false); // ローディングを終了
            break;
          default:
            errorMessage = "予期しないエラーが発生しました。";
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

  if (isLoading) {
    return (
      <div
        className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}
      >
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-theme${theme}-background text-gray-600`}
    >
      <div className="mx-auto mb-[140px] mt-[70px] w-[85%]">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle className="mt-5">
                誰かの日記が届きました！
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="my-3 text-gray-500">
              {shareData}
            </DialogDescription>
            <div className="mx-auto my-2">
              <Button
                className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
                onClick={() => setIsOpen(false)}
              >
                見た！
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mb-2 flex">
          <Popover open={isTagPopoverOpen} onOpenChange={setIsTagPopoverOpen}>
            <PopoverTrigger asChild>
              <div>
                <div
                  className={`flex w-fit border-b pb-1 border-theme${theme}-primary`}
                >
                  <p className="mr-1 text-sm">検索条件の追加</p>
                  <Plus
                    size={17}
                    className={`text-theme${theme}-primary my-auto`}
                  />
                </div>
                <div className="mt-2 flex space-x-1">
                  {selectedTags.length > 0 && (
                    <p className="text-xs">{selectedTags.length}個のタグ</p>
                  )}
                  {filterPublic === "private" && (
                    <p className="text-xs">/ 非公開のみ</p>
                  )}
                  {filterPublic === "public" && (
                    <p className="text-xs">/ 公開のみ</p>
                  )}
                  {sortOrder === "desc" && (
                    <p className="text-xs">/ 投稿日が古い順</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`border border-theme${theme}-primary bg-white text-theme${theme}-primary mt-1`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="mt-1 flex w-full flex-col pt-6 px-6 pb-4"
              align="start"
            >
              <button
                className="absolute right-3 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsTagPopoverOpen(false)}
              >
                <X size={17} />
              </button>
              <div className="mb-4 flex space-x-10">
                <div className="space-y-2">
                  <p className="text-xs">タグ</p>
                  {diaryList?.tagList.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                        className={`border-theme${theme}-primary data-[state=checked]:bg-theme${theme}-primary data-[state=checked]:border-theme${theme}-primary`}
                      />
                      <label
                        htmlFor={tag}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="ml-4 flex flex-col space-y-2">
                  <RadioGroup
                    defaultValue="all"
                    value={filterPublic}
                    className="flex flex-col"
                    onValueChange={(value: "all" | "public" | "private") => {
                      setFilterPublic(value);
                    }}
                  >
                    <p className="text-xs">公開状況</p>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="all"
                        id="all"
                        className={`border-theme${theme}-primary`}
                      />
                      <Label htmlFor="all">すべて</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="public"
                        id="public"
                        className={`border-theme${theme}-primary`}
                      />
                      <Label htmlFor="public">公開</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="private"
                        id="private"
                        className={`border-theme${theme}-primary`}
                      />
                      <Label htmlFor="private">非公開</Label>
                    </div>
                  </RadioGroup>
                  <p className="pt-5 text-xs">投稿日</p>
                  <RadioGroup
                    defaultValue="asc"
                    value={sortOrder}
                    className="flex flex-col"
                    onValueChange={(value: "asc" | "desc") => {
                      setSortOrder(value);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="asc"
                        id="asc"
                        className={`border-theme${theme}-primary`}
                      />
                      <Label htmlFor="asc">昇順</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="desc"
                        id="desc"
                        className={`border-theme${theme}-primary`}
                      />
                      <Label htmlFor="desc">降順</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTags([]);
                    setFilterPublic("all");
                    setSortOrder("asc");
                  }}
                  className="w-full"
                >
                  条件をクリア
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* <ScrollArea> */}
        {filteredDiary.length > 0 ? (
          filteredDiary.map((d, index) => (
            // 日記カード表示
            <Link
              key={index}
              href={`/diary/detail/${d.id}`}
              className="focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            >
              <DiaryCard key={index} title={d.title} summary={d.summary} isPublic={d.isPublic} tags={d.tags} />
            </Link>
          ))
        ) : keyword == "" ? (
          <p className="text-center text-gray-400">
            今日はどんなことがありましたか？
          </p>
        ) : (
          <p className="text-center text-gray-400">
            該当する日記がありませんでした。
          </p>
        )}
        {/* </ScrollArea> */}
      </div>
      <div
        className={`fixed top-0 w-full max-w-md bg-theme${theme}-background pb-4 pt-4`}
      >
        <div className="mx-6 flex items-center space-x-3">
          <IoSearchSharp
            size={"30px"}
            className={`text-theme${theme}-primary`}
          />
          <Input
            placeholder="日記を検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="shadow-sm"
          />
        </div>
      </div>
      <div className="fixed bottom-24 flex w-full max-w-md justify-end pr-4">
        <IoAddCircleSharp
          onClick={initializeDiary}
          size={"70px"}
          className={`text-theme${theme}-primary`}
        />
      </div>
      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="gray" />
        </Link>
        <Link href={"/home"}>
          <IoHomeSharp size={"50px"} className={`text-theme${theme}-primary`} />
        </Link>
        <Link href={"/feedback"}>
          <IoBarChartSharp size={"50px"} color="gray" />
        </Link>
      </div>
    </div>
  );
}
