"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBarChartSharp, IoCogSharp, IoHomeSharp } from "react-icons/io5";
import TagListSetting from "~/components/tagListSetting";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { toast } from "~/hooks/use-toast";

export default function Page() {
  const [tags, setTags] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false); // 退会確認ダイアログ
  // TODO セッション実装でき次第変更
  const [user, setUser] = useState({
    id: "cm4ko75er0000eb00x6x4byn7",
    email: "example@example.com",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
          setTags(responseData.tagList);
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

  // useEffect(() => {
  // idメアド取得 (JWT取得？ api/user/[id]？)
  // const getUser = async () => {
  //   const response = await fetch(`/api/user/[id]`);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setUser({ ...user, id: data.id, email: data.email })
  //   } else {
  //     console.error("Failed to fetch");
  //   }
  // };
  // getUser();
  // }, [])

  // 退会処理
  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        router.push("/setting/delete/complete");
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

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/signout?${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        router.push("/signin");
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

  // タグ消去
  const handleDeleteTag = async (deleteTags: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/diary/tag/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names: deleteTags }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setTags((prevItems) => prevItems.filter((item) => !deleteTags.includes(item)))
        toast({
          description: "タグを削除しました。",
        });
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
    <div className="min-h-screen w-full max-w-md bg-red-50 text-gray-600">
      <div className="mx-auto mb-[140px] flex flex-col items-center">
        <div className="ml-8 mr-auto">
          <p className="mt-8 w-full text-left text-xl font-bold">
            アカウント情報
          </p>
          <p className="text-md mt-4 w-full text-left">ユーザーID：{user.id}</p>
          <p className="text-md mt-2 w-full text-left">
            メールアドレス：{user.email}
          </p>
        </div>
        <div className="mt-6 w-[60%]">
          <Button
            onClick={handleSignOut}
            className="w-full rounded-full bg-gray-400 hover:bg-gray-500"
          >
            ログアウトする
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="mt-6 w-[60%]">
            <Button
              className="w-full rounded-full bg-red-400 hover:bg-rose-500"
              onClick={() => setIsOpen(true)}
            >
              アカウントを削除する
            </Button>
          </div>
          <DialogContent className="w-[80%]">
            <DialogHeader>
              <DialogTitle className="mt-3">本当に退会しますか？</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-gray-500">
              作成した日記はすべて削除されます
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
              <div className="my-2">
                <Button
                  onClick={handleDeleteUser}
                  className="w-[100px] rounded-full bg-red-400 hover:bg-rose-500"
                >
                  はい
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-12 ml-8 mr-auto">
          <p className="mb-4 w-full text-left text-xl font-bold">
            タグの編集
          </p>
        </div>
        <div className="w-[65%]">
          <TagListSetting initialList={tags} onDeleteTags={handleDeleteTag} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} color="#f87171" />
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
