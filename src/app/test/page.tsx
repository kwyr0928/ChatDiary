import { IoSendSharp } from "react-icons/io5";
import ResizeTextarea from "~/components/resizeTextarea";
import Tag from "~/components/tag";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

/* UI表示テスト用ページ */
export default function Page() {
    return (
        <div className="h-screen bg-red-50">
            {/* ボタンUI */}
            <div className="mb-5">
                <Label className="text-lg block">ボタン</Label>
                <Button className="bg-red-400 hover:bg-rose-500">塗りつぶしボタン</Button>
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
                    <IoSendSharp style={{ color:"#f87171", fontSize: '25px' }} />
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
                <Tag text="新規タグ" />
            </div>

            {/* ラジオボタン */}
            <div className="mb-5">
                <Label className="text-lg block">ラジオボタン</Label>
                <RadioGroup defaultValue="private">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" className="border-red-400" />
                        <Label htmlFor="public">公開</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" className="border-red-400" />
                        <Label htmlFor="private">非公開</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}