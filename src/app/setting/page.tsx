"use client";

import { Check, LoaderCircle } from "lucide-react";
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

type GetTagResponse = {
  message: string;
  tagList: string[];
}

type GetUserResponse = {
  message: string;
  email: string;
  theme: number;
}

type SignOutResponse = {
  message: string;
}

type DeleteResponse = {
  message: string;
}

type UpdateThemeResponse = {
  message: string;
  theme: number;
}

export default function Page() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [tags, setTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // 退会確認ダイアログ
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isSession, setIsSession] = useState(false);

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
        const tagResponseData = (await tagResponse.json()) as GetTagResponse;
        console.log(tagResponseData);
        if (tagResponse.ok) {
          setIsSession(true);
          setTags(tagResponseData.tagList);
        } else { // 401 500
          let errorMessage = '';
      switch (tagResponse.status) {
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
        // Fetch Email
        const emailResponse = await fetch(`/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const emailResponseData = (await emailResponse.json()) as GetUserResponse;
        console.log(emailResponseData);
        if (emailResponse.ok) {
          setIsSession(true);
          setEmail(emailResponseData.email);
        } else { // 401 500
          let errorMessage = '';
      switch (emailResponse.status) {
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
    void fetchInitialData();
  }, []);

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
      const responseData = (await response.json()) as DeleteResponse;
      console.log(responseData);
      if (response.ok) {
        setIsSession(true);
        router.push("/setting/delete/complete");
      } else { // 401 500
        let errorMessage = '';
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー（401）: ログインが必要です。';
          router.push("/signin");
          break;
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            setIsLoading(false); // ローディングを終了
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
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

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = (await response.json()) as SignOutResponse;
      console.log(responseData);
      if (response.ok) {
        setTheme(0);
        router.push("/signin");
      } else { // 500
        let errorMessage = '';
      switch (response.status) {
          case 500:
            errorMessage = 'サーバーエラー（500）：処理に失敗しました。';
            setIsLoading(false); // ローディングを終了
            break;
        default:
          errorMessage = '予期しないエラーが発生しました。';
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
      const responseData = (await response.json()) as UpdateThemeResponse;
      console.log(responseData);
      if (response.ok) {
        setIsSession(true);
        toast({
          description: "テーマカラーを変更しました！",
        });
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
      const responseData = (await response.json()) as DeleteResponse;
      console.log(responseData);
      if (response.ok) {
        setIsSession(true);
        setTags((prevItems) =>
          prevItems.filter((item) => !deleteTags.includes(item)),
        );
        toast({
          description: "タグを削除しました。",
        });
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
  };

  useEffect(() => {
    if(isSession){
      setIsLoading(false); // ローディングを終了
    }
  }, [isSession]);

  if (isLoading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-theme${theme}-background`}>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`mx-auto min-h-screen w-full max-w-md bg-theme${theme}-background`}>
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
            <div className="flex space-x-4 mt-5 mb-16">
              {/* テーマカラー変更4 */}
              <div className="w-8 h-8 bg-theme0-primary rounded-full" onClick= {() => handleThemeChange(0)}>
              </div>
              <div className="w-8 h-8 bg-theme1-primary rounded-full" onClick={() => handleThemeChange(1)}>
              </div>
              <div className="w-8 h-8 bg-theme2-primary rounded-full" onClick={() => handleThemeChange(2)}>
              </div>
              <div className="w-8 h-8 bg-theme3-primary rounded-full" onClick={() => handleThemeChange(3)}>
              </div>
              <div className="w-8 h-8 bg-theme4-primary rounded-full" onClick={() => handleThemeChange(4)}>
              </div>
              <div className="w-8 h-8 bg-theme5-hover rounded-full" onClick={() => handleThemeChange(5)}>
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

