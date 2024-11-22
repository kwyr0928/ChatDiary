import { IoRemoveCircleSharp } from "react-icons/io5";

/* タグUI */
export default function Tag(props: {text: string}) {
    const { text } = props

    // const removeTag = () =>{

    // }
    
    return (
        <span id="badge-dismiss-1" className="inline-flex items-center px-2 py-1 mr-2 font-semibold text-red-400 bg-white rounded-full border border-red-400 mb-3">
            <button data-dismiss-target="#badge-dismiss-1" className="focus:outline-none">
                {/* onClick={removeTag} */}
                <IoRemoveCircleSharp size="24px" className="text-red-400" />
            </button>
            <span className="pt-0.5 px-1 text-base leading-none">{text}</span>
        </span>
    )
}
// TODO:マイナスボタンを押したらタグが消えるようにする