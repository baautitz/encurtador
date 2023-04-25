import Image from "next/image";
import Head from "next/head";

import TwitterLogo from '../../../public/twitter-svgrepo-com.png' 

export default function Home() {
    return (
        <div id="container" className="w-screen h-screen flex justify-center items-center">
            <Head>
                <title>Bautitz | Perfil</title>
            </Head>
            <div className="flex flex-col p-6 rounded-lg items-center gap-3 bg-neutral-950">
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl">Olá!👋🏻</h1>
                    <h2 className="text-xl">Me chamo Vinicius e tenho 18 anos</h2>
                </div>
                <span className="text-neutral-500">Essas são minhas redes socias:</span>
                <div className="h-full w-full flex flex-col items-center gap-1">
                    <a href="https://twitter.com/baautitz" className="p-2 border border-sky-600 rounded-lg">
                        
                        Twitter
                    </a>
                    <a href="https://www.instagram.com/vinicius.bautitz" className="p-2 border border-rose-600 rounded-lg">Instagram</a>
                    <button type="button" className="p-2 border border-sky-700 rounded-lg">vini.#9600</button>
                </div>
            </div>
        </div>
    )
}