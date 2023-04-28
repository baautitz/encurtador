import Image from "next/image";
import Head from "next/head";
import Twemoji from "react-twemoji";

import MessageBoxElement, { showMessageBox } from "../elements/MessageBoxElement"

import TwitterLogo from "../../../public/twitter-logo.svg"
import InstagramLogo from "../../../public/instagram-logo.svg"
import DiscordLogo from "../../../public/discord-logo.svg"
import GitHubLogo from "../../../public/github-logo.svg"
import WavingHandEmoji from "../../../public/waving-hand-emoj.svg"


export default function Home() {
    const copyDiscord = (toCopy: string) => navigator.clipboard.writeText(toCopy)

    return (
        <div className="
            h-screen
            min-h-[400px]

            flex 
            flex-col 
            justify-center 
            items-center 

            bg-black 
            text-white 
        ">
            <Head>
                <title>Bautitz | Perfil</title>
            </Head>
            <div className="
                w-full 
                h-full 

                flex 
                flex-col 

                items-center 
                justify-center 

                p-6 
                gap-3 

                bg-neutral-950 
                border
                border-neutral-800  
                shadow-[0_0_15px_0_rgba(38,38,38,.5)] 
            
                md:rounded-lg 
                md:max-w-lg 
                md:h-fit
            ">
                <div className="
                    flex 
                    flex-col 
                    items-center 

                    pb-6
                    gap-3 
                ">
                    <h1 className="text-5xl font-bold flex gap-2">
                        Olá!
                        <Image draggable={false} alt="Instagram" src={WavingHandEmoji} width={40} />
                    </h1>
                    <h2 className="text-xl font-bold text-center">Me chamo Vinicius e tenho 18 anos</h2>
                </div>
                <span className="text-neutral-500">Minhas redes socias:</span>
                <div className="
                    w-full 
                    flex 
                    flex-col 
                    items-center 
                    gap-2
                ">
                    <a href="https://twitter.com/baautitz" target="_blank" className="
                        w-40 
                        flex
                        items-center 

                        p-2 
                        gap-3 
                    
                        border 
                        rounded-lg 
                        border-sky-600 
                        shadow-[0_0_8px_0_rgba(2,132,199,.5)] 
                        
                        hover:bg-sky-600/30 

                        transition-all 
                        ease-in 
                        duration-100
                    ">
                        <Image draggable={false} alt="Twitter" src={TwitterLogo} width={30} />
                        Twitter
                    </a>

                    <a href="https://www.instagram.com/vinicius.bautitz" target="_blank" className="
                        w-40 
                        flex
                        items-center 

                        p-2 
                        gap-3 
                    
                        border 
                        rounded-lg 
                        border-rose-600 
                        shadow-[0_0_8px_0_rgba(225,29,72,.5)]

                        hover:bg-rose-600/30

                        transition-all 
                        ease-in 
                        duration-100
                    ">
                        <Image draggable={false} alt="Instagram" src={InstagramLogo} width={30} />
                        Instagram
                    </a>

                    <a href="https://github.com/baautitz" target="_blank" className="
                        w-40 
                        flex
                        items-center 

                        p-2 
                        gap-3 
                    
                        border
                        rounded-lg 
                        border-white 
                        shadow-[0_0_7px_0_rgba(255,255,255,.5)]

                        hover:bg-white/30

                        transition-all 
                        ease-in 
                        duration-100
                    ">
                        <Image draggable={false} alt="GitHub" src={GitHubLogo} width={30} />
                        GitHub
                    </a>

                    <button type="button" onClick={() => {
                        showMessageBox("Discord copiado!")
                        copyDiscord("vini.#9600")
                    }} className="
                        w-40 
                        flex
                        items-center 

                        p-2 
                        gap-3 
                    
                        border 
                        rounded-lg 
                        border-sky-700
                        shadow-[0_0_8px_0_rgba(3,105,161,.5)] 
                        
                        hover:bg-sky-700/30

                        transition-all 
                        ease-in 
                        duration-100
                    ">
                        <Image draggable={false} alt="Discord" src={DiscordLogo} width={30} />
                        vini.#9600
                    </button>
                </div>
                <MessageBoxElement />
            </div>

        </div>
    )
}