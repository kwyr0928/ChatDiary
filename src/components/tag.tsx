import { IoCloseCircleSharp } from "react-icons/io5";

/* タグUI */
export default function Tag(props: {text: string}) {
    const { text } = props

    // const removeTag = () =>{

    // }
    
    return (
        <span id="badge-${text}" className="inline-flex items-center px-1 mr-2 font-semibold text-red-400 bg-white rounded-full border border-red-400">
            <span className="whitespace-nowrap pt-0.5 px-1 text-base leading-none">{text}</span>
            <button className="focus:outline-none">
                {/* onClick={removeTag} */}
                <IoCloseCircleSharp size="26px" className="text-red-400 pl-0.5" />
            </button>
        </span>
    )
}
// TODO:マイナスボタンを押したらタグが消えるようにする