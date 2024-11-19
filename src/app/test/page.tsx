import { IoSendSharp } from "react-icons/io5";
import ResizeTextarea from "~/components/resizeTextarea";
import Tag from "~/components/tag";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Page() {
    return (
        <div className="h-screen bg-red-50">
            {/* ボタンUI */}
            <div className="mb-5">
                <Label className="text-lg block">ボタン</Label>
                <Button className="bg-red-400 hover:bg-red-500">塗りつぶしボタン</Button>
                <Button className="bg-white hover:bg-red-400 text-red-400 hover:text-white border border-red-400 hover:border-transparent">枠つきボタン</Button>
            </div>

            {/* インプット */}
            <div className="mb-5">
                <Label className="text-lg block">入力欄</Label>
                <Input />
            </div>

            {/* チャット欄 */}
            <div className="mb-5">
                <Label className="text-lg block">チャット</Label>
                <div className="flex space-x-2 mb-3 items-end">
                    <textarea rows={4} className="resize-none border rounded focus:outline-none" />
                    <IoSendSharp style={{ color: '#5c5c5c', fontSize: '25px' }} />
                </div>
            </div>

            {/* 可変テキストエリア */}
            <div className="mb-5">
                <Label className="text-lg block">高さが変わるテキストエリア</Label>
                <ResizeTextarea className="resize-none border rounded focus:outline-none mb-3" />
            </div>

            {/* タグ(見た目のみ) */}
            <div className="mb-5">
                <Label className="text-lg block">タグ</Label>
                <Tag text="新規タグ"/>
            </div>
        </div>
    )
}