import Image from "next/image";

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
export default function DiaryCard(props: { d: { tag: string[], context: string, date: string } }) {
    const { d } = props
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
                        <span className="ml-4 text-sm">{d.date}</span>
                        <span className="ml-12 space-x-4 text-red-400 text-sm">
                            {d.tag.map((tag, tagIndex) => (
                                <span key={tagIndex}>#{tag}</span>
                            ))}
                        </span>
                        <br />
                        <span className="line-clamp-2 pt-1">{d.context}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}