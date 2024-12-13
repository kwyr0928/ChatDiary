import { IoPersonCircleSharp } from "react-icons/io5"
import { Card, CardContent } from "./ui/card"

// チャットメッセージ
export default function ChatCard(props: { isAI: boolean, children: string }) {
    const { isAI, children } = props

    return (
        <div className="w-[85%] mx-auto">
            <div className={isAI ? "mr-auto flex" : "ml-auto flex"}>
                {isAI && <IoPersonCircleSharp
                    size={"35px"}
                    color="gray"
                    className="mr-2 mt-2"
                />}
                <Card className={isAI ? "mb-5 w-[70%] text-gray-600 shadow-none" : "mb-5 ml-auto mr-3 w-[70%] text-gray-600 shadow-none"}>
                    <CardContent className="px-5 py-3">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}