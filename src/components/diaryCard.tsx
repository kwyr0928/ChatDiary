import Image from "next/image";
import Link from "next/link";

const diary = {
    diary: [
        {
            tag: ["A", "お出かけ"],
            context:
                "Aさんと○○へ行き、xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            date: "2024-11-21",
        },
        {
            tag: ["B", "旅行"],
            context: "Bさんと△△へ行き、xxxxxxxxxxxxxxxxxxxxx",
            date: "2024-11-01",
        },
        {
            tag: ["C", "仕事"],
            context: "Cさんと□□へ行き、xxxx",
            date: "2024-10-10",
        },
        {
            tag: ["D", "ねむい"],
            context: "ねむいでござんす",
            date: "2024-10-9",
        },
    ],
};

// 日記カード(/homeに表示するやつ)
export default function DiaryCard(props: { d: { tag: string[], context: string, date: string }, index: number }) {
    const { d, index } = props
    return (
        <div>
            <Link href={`/diary/detail`}>
                <div className="relative w-[317px] h-[92px] mb-3">
                    <Image
                        src="/日記カード.png"
                        alt="Diary"
                        width={317}
                        height={92}
                    />
                    <div className="absolute inset-0 text-gray-600 p-2 ml-2">
                        <p className="break-words">
                            <span className="ml-4 text-sm">{d.date}</span>
                            <span className="md-4 ml-12 space-x-4 text-red-400 text-sm">
                                {d.tag.map((tag, tagIndex) => (
                                    <span key={tagIndex}>#{tag}</span>
                                ))}
                            </span>
                            <br />
                            {d.context}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}