import { IoCloseCircleSharp } from "react-icons/io5";
import { useThemeStore } from "~/store/themeStore";

/* タグUI */
export default function Tag(props: {text: string, onRemoveTag: (removeTag: string) => void}) {
    const { text, onRemoveTag = () => { } } = props
            const theme = useThemeStore((state) => state.theme);
    const removeTag = () =>{
        onRemoveTag(text)
    }
    
    return (
        <span id="badge-${text}" className={`inline-flex items-center px-1 py-0.5 font-semibold text-theme${theme}-primary bg-white rounded-full border border-theme${theme}-primary mt-1`}>
            <span className="whitespace-nowrap pt-0.5 px-1 text-base leading-none">{text}</span>
            <button className="focus:outline-none">
                <IoCloseCircleSharp size="26px" className={`text-theme${theme}-primary`} onClick={removeTag} />
            </button>
        </span>
    )
}
// TODO:マイナスボタンを押したらタグが消えるようにする