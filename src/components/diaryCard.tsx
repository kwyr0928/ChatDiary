"use client";

import Image from "next/image";
import { MdOutlinePublic } from "react-icons/md";
import { PiLockKeyFill } from "react-icons/pi";
import { useThemeStore } from "~/store/themeStore";

type PropTypes = {
  title: string;
  summary: string;
  isPublic: boolean;
  tags: string[];
};

// 日記カード(/homeに表示するやつ)
export default function DiaryCard({
  title,
  summary,
  isPublic,
  tags,
}: PropTypes) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative mb-4 aspect-[317/92]">
        <Image
          src="/日記カード.webp"
          alt="Diary"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ filter: "drop-shadow(3px 3px 2px rgba(60, 0, 0, 0.09))" }}
        />
        <div className="absolute inset-0 ml-2 p-3 px-2 text-gray-600">
          <div className="w-full break-words">
            <div className="flex truncate whitespace-nowrap py-0.5">
              <span className="ml-4 text-xs text-gray-500">{title}</span>
              {isPublic ? (
                <div>
                  <MdOutlinePublic
                    size={15}
                    className={`text-theme${theme}-primary my-auto ml-2`}
                  />
                </div>
              ) : (
                <div>
                  <PiLockKeyFill
                    size={15}
                    className={`text-theme${theme}-primary my-auto ml-2`}
                  />
                </div>
              )}
              {tags.map((tag, index) => (
                <span
                  className={`my-auto ml-2.5 text-xs text-theme${theme}-primary`}
                  key={index}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="line-clamp-2 pt-1.5 text-base">{summary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
