import Image from "next/image"
import Head from "next/head"

import MessageBoxComponent, {
	showMessageBox,
} from "./components/MessageBoxComponent"

import TwitterLogo from "../../public/twitter-logo.svg"
import InstagramLogo from "../../public/instagram-logo.svg"
import DiscordLogo from "../../public/discord-logo.svg"
import GitHubLogo from "../../public/github-logo.svg"
import WavingHandEmoji from "../../public/waving-hand-emoj.svg"
import Logo from "../../public/logo-big-name.svg"
import router from "next/router"

function discordButtonClickHandler() {
	navigator.clipboard.writeText("vnicius.")
	showMessageBox("Discord copiado!")
}

function socialMedia() {
	return (
		<>
			<a
				href="https://twitter.com/baautitz"
				target="_blank"
				className="w-40 flex items-center p-2 gap-3 border rounded-lg border-sky-600 shadow-[0_0_8px_0_rgba(2,132,199,.5)] hover:bg-sky-600/30 transition-all ease-in duration-100"
			>
				<Image
					draggable={false}
					alt="TwitterLogo"
					src={TwitterLogo}
					width={30}
				/>
				Twitter
			</a>

			<a
				href="https://www.instagram.com/vinicius.bautitz"
				target="_blank"
				className="w-40 flex items-center p-2 gap-3 border rounded-lg border-rose-600 shadow-[0_0_8px_0_rgba(225,29,72,.5)] hover:bg-rose-600/30 transition-all ease-in duration-100"
			>
				<Image
					draggable={false}
					alt="InstagramLogo"
					src={InstagramLogo}
					width={30}
				/>
				Instagram
			</a>

			<a
				href="https://github.com/baautitz"
				target="_blank"
				className="w-40 flex items-center p-2 gap-3 border rounded-lg border-white shadow-[0_0_6px_0_rgba(255,255,255,.5)] hover:bg-white/30 transition-all ease-in duration-100"
			>
				<Image draggable={false} alt="GitHubLogo" src={GitHubLogo} width={30} />
				GitHub
			</a>

			<button
				type="button"
				onClick={discordButtonClickHandler}
				className="w-40 flex items-center p-2 gap-3 border rounded-lg border-sky-700 shadow-[0_0_8px_0_rgba(3,105,161,.5)] hover:bg-sky-700/30 transition-all ease-in duration-100"
			>
				<Image
					draggable={false}
					alt="DiscordLogo"
					src={DiscordLogo}
					width={30}
				/>
				vnicius.
			</button>
		</>
	)
}

export default function Home() {
	return (
		<>
			<Head>
				<title>Perfil | vnici.us</title>
			</Head>

			<div className="h-screen min-h-[450px] flex flex-col justify-center items-center bg-black text-white">
				<div className="w-full h-full flex flex-col items-center justify-center p-6 gap-3 bg-neutral-950 border border-neutral-800 shadow-[0_0_15px_0_rgba(38,38,38,.5)] md:rounded-lg md:max-w-lg md:h-fit">
					<div className="flex flex-col items-center gap-3">
						<h1 className="text-5xl font-bold flex gap-2">
							Olá!
							<Image
								draggable={false}
								alt="WavingHandEmoji"
								src={WavingHandEmoji}
								width={40}
							/>
						</h1>
						<h2 className="text-xl font-bold text-center">
							Me chamo Vinicius e tenho 18 anos
						</h2>
					</div>

					<span className="text-neutral-500">Minhas redes socias:</span>

					<div className="grid md:grid-cols-2 items-center justify-center gap-2">
						{socialMedia()}
					</div>

					<Image
						draggable={false}
						src={Logo}
						alt="Logo"
						width={120}
						className="mt-2"
					/>
				</div>

				<MessageBoxComponent />
			</div>
		</>
	)
}
