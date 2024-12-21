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
import { useThemeStore } from "~/store/themeStore";

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [tags, setTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // 退会確認ダイアログ
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const fetchInitialData = async () => {
      try {
        // Fetch Tags
        const tagResponse = await fetch(`/api/diary/tag`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tagResponseData = await tagResponse.json();
        console.log(tagResponseData);
        if (tagResponse.ok) {
          setTags(tagResponseData.tagList);
        } else {
          throw new Error(
            tagResponseData.message || "タグの取得に失敗しました",
          );
        }

        // Fetch Email
        const emailResponse = await fetch(`/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const emailResponseData = await emailResponse.json();
        console.log(emailResponseData);
        if (emailResponse.ok) {
          setEmail(emailResponseData.email);
        } else {
          throw new Error(
            emailResponseData.message || "メールアドレスの取得に失敗しました",
          );
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
      } finally {
        setIsLoading(false); // ローディングを終了
      }
    };
    void fetchInitialData();
  }, []);

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
      const response = await fetch(`/api/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
      const response = await fetch(`/api/user/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const handleThemeChange = async (themeNum: number) => {
    setTheme(themeNum);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/theme`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({
          theme: themeNum,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        toast({
          description: "テーマカラーを変更しました！",
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

  // タグ消去
  const handleDeleteTag = async (deleteTags: string[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/diary/tag`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names: deleteTags }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setTags((prevItems) =>
          prevItems.filter((item) => !deleteTags.includes(item)),
        );
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
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background text-gray-600`}>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`mx-auto min-h-screen w-full max-w-md bg-theme${theme}-background text-gray-600`}>
      <div className="mx-auto flex flex-col items-center">
        <div className="ml-8 mr-auto">
          <p className="mt-8 w-full text-left text-xl font-bold">
            アカウント情報
          </p>
          <p className="text-md mt-2 w-full text-left">
            メールアドレス：{email}
          </p>
        </div>

        <div className="ml-8 mr-auto mt-12">
          <p className="mb-4 w-full text-left text-xl font-bold">タグの編集</p>
        </div>
        <div className="w-[85%]">
          <TagListSetting initialList={tags} onDeleteTags={handleDeleteTag} />
        </div>
      </div>

          <div className="mt-6 ml-8 mr-auto">
          <div className="mb-4 w-full text-left text-xl font-bold">
            テーマカラー
            <div className="flex space-x-4 mt-3 mb-16">
              {/* テーマカラー変更4 */}
              <div className="w-8 h-8 bg-red-600 rounded-full" onClick= {() => handleThemeChange(0)}>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full" onClick={() => handleThemeChange(1)}>
              </div>
              <div className="w-8 h-8 bg-yellow-600 rounded-full" onClick={() => handleThemeChange(2)}>
              </div>
              <div className="w-8 h-8 bg-black rounded-full" onClick={() => handleThemeChange(3)}>
              </div>
            </div>
          </div>

        </div>

      <div className="mx-auto mt-5 w-[60%]">
        <Button
          onClick={handleSignOut}
          className="w-full rounded-full bg-gray-400 hover:bg-gray-500"
        >
          ログアウトする
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="mx-auto mt-6 w-[60%]">
          <Button
            className={`w-full rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
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
                className={`w-[100px] rounded-full border border-theme${theme}-primary bg-white text-theme${theme}-primary hover:border-transparent hover:bg-theme${theme}-hover hover:text-white`}
                onClick={() => setIsOpen(false)}
              >
                いいえ
              </Button>
            </div>
            <div className="my-2">
              <Button
                onClick={handleDeleteUser}
                className={`w-[100px] rounded-full bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
              >
                はい
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-0 flex w-full max-w-md justify-around bg-white py-5">
        <Link href={"/setting"}>
          <IoCogSharp size={"50px"} className={`text-theme${theme}-primary`} />
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
