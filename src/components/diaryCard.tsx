import Image from "next/image";

const diary = {
    diary: [
        {
            title: "2024/12/10 10:49",
            summary:
                "Aさんと○○へ行き、xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
        {
            title: "2024/12/10 10:49",
            summary:
                "Aさんと○○へ行き、xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
    ],
  };

// 日記カード(/homeに表示するやつ)
export default function DiaryCard({title, summary}) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative aspect-[317/92] mb-3">
                <Image
                    src="/日記カード.png"
                    alt="Diary"
                    fill
                />
                <div className="absolute inset-0 text-gray-600 px-2 py-1.5 ml-2">
                    <p className="break-words">
                        <span className="ml-4 text-sm">{title}</span>
                        <br />
                        <span className="line-clamp-2 pt-1">{summary}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}