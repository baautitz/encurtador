import { useEffect, useRef, useState } from "react";

let showMessageBox: any = () => { }

function MessageBoxElement() {
    const messageBoxDiv = useRef<HTMLDivElement | null>(null)
    const messageSpan = useRef<HTMLSpanElement | null>(null)

    const [messageBoxAnimationTimeout, setMessageBoxAnimationTimeout] = useState([
        setTimeout(() => { }), 
        setTimeout(() => { })
    ]);
    
    const [messageBoxValue, setMessageBoxValue] = useState('')

    showMessageBox = (message: string, backgroundColor?: string) => {
        if (!messageBoxDiv || !messageSpan) return

        // reset all background colors
        messageSpan.current?.classList.forEach((cl: string) => { 
            if (cl.startsWith("bg-")) messageSpan.current?.classList.remove(cl)
        })
                                               
        messageSpan.current?.classList.add(backgroundColor || "bg-emerald-600")
        messageBoxDiv.current?.classList.remove("hidden")

        clearTimeout(messageBoxAnimationTimeout[0])

        setTimeout(() => {
            messageBoxDiv.current?.classList.remove("opacity-0")
        }, 1)

        const timeOuts = messageBoxAnimationTimeout
        timeOuts[0] = (setTimeout(() => {
            messageBoxDiv.current?.classList.add("opacity-0")
            clearTimeout(messageBoxAnimationTimeout[1])
            timeOuts[1] = setTimeout(() => {
                messageBoxDiv.current?.classList.add("hidden")
            }, 150)
        }, 1500))

        setMessageBoxAnimationTimeout(timeOuts)

        setMessageBoxValue(message)
    }

    return (
        <div ref={messageBoxDiv} className="fixed bottom-8 transition-all ease-in duration-150 opacity-0 hidden">
            <span ref={messageSpan} className="p-3 rounded-lg">
                {messageBoxValue}
            </span>
        </div>
    )
}

export { showMessageBox }
export default MessageBoxElement
