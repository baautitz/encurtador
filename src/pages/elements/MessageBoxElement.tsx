import { useRef, useState } from "react";

let showMessageBox: any = () => { }

function messageBoxElement() {
    const messageBoxDiv = useRef<any>()
    const [messageBoxAnimationTimeout, setMessageBoxAnimationTimeout] = useState([setTimeout(() => { }), setTimeout(() => { })]);
    const [messageBoxValue, setMessageBoxValue] = useState('')

    showMessageBox = (message: string) => {
        messageBoxDiv.current.classList.remove("hidden")

        clearTimeout(messageBoxAnimationTimeout[0])

        setTimeout(() => {
            messageBoxDiv.current.classList.remove("opacity-0")
        }, 1)

        const timeOuts = messageBoxAnimationTimeout
        timeOuts[0] = (setTimeout(() => {
            messageBoxDiv.current.classList.add("opacity-0")
            clearTimeout(messageBoxAnimationTimeout[1])
            timeOuts[1] = setTimeout(() => messageBoxDiv.current.classList.add("hidden"), 100)
        }, 1500))

        setMessageBoxAnimationTimeout(timeOuts)

        setMessageBoxValue(message)
    }
    return (
        <div ref={messageBoxDiv} className="
                fixed bottom-8

                transition-all
                ease-in
                duration-100

                opacity-0
                hidden
            ">
            <span className="
                    p-3 
                    
                    rounded-lg 
                    bg-emerald-600
                ">
                {messageBoxValue}
            </span>
        </div>
    )
}

export { showMessageBox }
export default messageBoxElement