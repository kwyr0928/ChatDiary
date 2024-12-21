"use client"

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeStore } from "~/store/themeStore";

type GetUserResponse = {
  message: string;
  email: string;
  theme: number;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = (await response.json()) as GetUserResponse;
        console.log(responseData);
        if (response.ok) {
          setTheme(responseData.theme);
          router.replace("/home")
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        console.log(error);
        router.replace("/signin");
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    }

    void start();
  }, [router, setTheme])
  

  if (loading) {
    return (
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600`}>
        <Image
          src="/logo.png"
          alt="logo"
          priority={true}
          width={250}
          height={250}
        />
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-red-50 text-gray-600">
      <Image
        src="/logo.png"
        alt="logo"
        priority={true}
        width={250}
        height={250}
      />
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
