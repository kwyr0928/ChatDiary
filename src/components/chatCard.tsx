import { IoPersonCircleSharp } from "react-icons/io5";
import { useThemeStore } from "~/store/themeStore";
import { Card, CardContent } from "./ui/card";

// チャットメッセージ
export default function ChatCard(props: { isAI: boolean, children: string }) {
    const { isAI, children } = props
    const theme = useThemeStore((state) => state.theme);

    return (
        <div className="w-[85%] mx-auto">
            <div className={isAI ? "mr-auto flex" : "ml-auto flex"}>
                {isAI && <IoPersonCircleSharp
                    size={"35px"}
                    className={`mr-2 mt-2 text-theme${theme}-primary`}
                />}
                <Card className={isAI ? `mb-5 max-w-[70%] text-gray-600 shadow-none border-theme${theme}-background` : `mb-5 ml-auto max-w-[70%] text-gray-600 shadow-none  border-theme${theme}-background`}>
                    <CardContent className="px-5 py-3 break-words">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}