"use client"

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          router.replace("/home")
        } else {
          throw new Error(responseData);
        }
      } catch (error) {
        router.replace("/signin");
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    }

    void start();
  }, [router])

  if (loading) {
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
    </div>
  );
}
