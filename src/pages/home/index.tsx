import Image from "next/image";
import Head from "next/head";

import TwitterLogo from "../../../public/twitter-logo.svg"
import InstagramLogo from "../../../public/instagram-logo.svg"
import DiscordLogo from "../../../public/discord-logo.svg"


export default function Home() {
    return (
        <div id="container" className="w-screen h-screen flex justify-center items-center min-h-[400px]">
            <Head>
                <title>Bautitz | Perfil</title>
            </Head>
            <div className="flex flex-col p-6 rounded-lg items-center justify-center gap-3 bg-neutral-950 border shadow-[0_0_15px_0_rgba(38,38,38,.5)] border-neutral-800 w-full h-full md:max-w-lg md:h-fit">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-5xl">Olá!👋🏻</h1>
                    <h2 className="text-xl">Me chamo Vinicius e tenho 18 anos</h2>
                </div>
                <span className="text-neutral-500">Minhas redes socias:</span>
                <div className="w-full flex flex-col items-center gap-2">
                    <a href="https://twitter.com/baautitz" target="_blank" className="w-40 p-2 border border-sky-600 shadow-[0_0_8px_0_rgba(2,132,199,.5)] rounded-lg flex gap-3 items-center hover:bg-sky-600/30">
                        <Image alt="Twitter" src={TwitterLogo} width={30} height={30} ></Image>
                        Twitter
                    </a>

                    <a href="https://www.instagram.com/vinicius.bautitz" target="_blank" className="w-40 p-2 border border-rose-600 shadow-[0_0_8px_0_rgba(225,29,72,.5)]  rounded-lg flex gap-3 items-center hover:bg-rose-600/30">
                        <Image alt="Instagram" src={InstagramLogo} width={30} height={30} ></Image>
                        Instagram
                    </a>

                    <button type="button" className="w-40 p-2 border border-sky-700 rounded-lg flex gap-3 items-center shadow-[0_0_8px_0_rgba(3,105,161,.5)] hover:bg-sky-700/30">
                        <Image alt="Discord" src={DiscordLogo} width={30} height={30} ></Image>
                        vini.#9600
                    </button>
                </div>
            </div>
        </div>
    )
}