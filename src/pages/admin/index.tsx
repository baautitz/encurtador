import Head from "next/head"
import axios from "axios"
import { useEffect, useRef, useState } from "react"

import { Loader2 } from "lucide-react"

import LinkComponent from "../components/LinkComponent"
import HeaderbarComponent from "../components/HeaderBarComponent"
import MessageBoxComponent, {
	showMessageBox,
} from "../components/MessageBoxComponent"

function loadLinksList(
	linksLoaded: boolean,
	linkList: [{ _id: string; name: string; link: string }] | [],
	onDelete: any[],
	onCopy: any
) {
	if (linkList == null) {
		return (
			<div className="h-full w-full flex justify-center items-center gap-3">
				<span>Não foi possível encontrar nennhum link :(</span>
			</div>
		)
	}

	if (!linksLoaded || linkList.length == 0) {
		return (
			<div className="h-full w-full flex justify-center items-center gap-3">
				<Loader2
					strokeWidth={3}
					className="animate-spin"
				/>
				<span>Carregando...</span>
			</div>
		)
	}

	return (
		<ul className="space-y-5 lg:space-y-3">
			{linkList.map((l) => (
				<LinkComponent
					key={l.name}
					id={l["_id"]}
					nome={l.name}
					link={l.link}
					onDelete={onDelete}
					onCopy={onCopy}
				/>
			))}
		</ul>
	)
}

export default function Admin() {
	const [linkList, setLinkList] = useState<any>([])
	let linksLoaded = useRef(false)

	const linkNameInput = useRef<any>(null)
	const linkInput = useRef<any>(null)

	useEffect(() => {
		if (!linksLoaded.current) {
			fetchLinks()
			linksLoaded.current = true
		}
	}, [])

	const fetchLinks = () => {
		axios("/api/links").then((res) => {
			setLinkList(res.data)
		})
	}

	const createLinkFromInput = (e: any) => {
		if (e.key == "Enter") createLink()
	}

	const createLink = () => {
		// let linkNameValue = linkNameInput.current.value
		// const linkValue = linkInput.current.value
		// const rg = /[A-Za-z0-9]+([/]{0,1}[A-Za-z0-9-]+)*/g
		// linkNameValue = (linkNameValue.match(rg)) ? linkNameValue.match(rg)[0] : ""
		// if (!linkNameValue.trim() || !linkValue.trim()) return;
		// let refinedLinkValue: string = linkValue.trim()
		// if (!refinedLinkValue.startsWith("http://") && !refinedLinkValue.startsWith("https://")) {
		//   refinedLinkValue = `http://${refinedLinkValue}`
		// }
		// axios.post("/api/links", {
		//   name: linkNameValue.trim(),
		//   link: refinedLinkValue
		// }).then(() => {
		//   fetchLinks()
		//   linkNameInput.current.value = ""
		//   linkInput.current.value = ""
		// })
	}

	const onDeleteRemoveFromLinksList = (name: string) => {
		setLinkList(linkList.filter((l: { name: any }) => name != l.name))
	}

	const onDeleteLinkFetchLinks = () => {
		fetchLinks()
	}

	return (
		<div className="box-border flex flex-col  h-screen text-white ">
			<Head>
				<title>Bautitz | Admin</title>
			</Head>

			<HeaderbarComponent />

			<div
				id="main-container"
				className="flex-auto lg:px-6 flex flex-col bg-black overflow-y-auto">
				<div className="flex-auto flex flex-col justify-center items-center lg:min-w-[600px] min-h-[600px] lg:space-y-3">
					<div
						id="links-container"
						className="bg-neutral-950 lg:min-w-[640px] max-w-[1000px] w-full lg:w-4/5 p-6 flex-auto lg:flex-none h-5/6 lg:border border-neutral-800 lg:rounded-lg flex flex-col space-y-6">
						<span className="text-5xl font-bold text-center">editar links</span>

						<form
							id="links-add"
							className="space-y-2 lg:space-y-0 lg:space-x-3 flex flex-col lg:flex-row">
							<input
								type="text"
								ref={linkNameInput}
								onKeyDown={(e) => createLinkFromInput(e)}
								placeholder="nome"
								className="lg:w-48 p-2 rounded-lg border border-neutral-800 bg-transparent focus:border-white outline-none"
							/>
							<div className="flex-auto rounded-lg flex border border-neutral-800 focus-within:border-white">
								<input
									type="text"
									placeholder="link"
									defaultValue="http://"
									disabled
									className="p-2 w-[67px] rounded-l-md bg-neutral-800 text-white"
								/>
								<input
									type="text"
									ref={linkInput}
									onKeyDown={(e) => createLinkFromInput(e)}
									placeholder="link"
									className="flex-auto p-2 w-full rounded-r-lg bg-transparent outline-none"
								/>
							</div>
							<button
								type="button"
								onClick={createLink}
								className="bg-sky-600 rounded-lg p-2 border border-sky-600 hover:bg-sky-600/30 transition-colors ease-in duration-100">
								adicionar
							</button>
						</form>

						<div
							id="links-list"
							className="flex-auto w-full overflow-y-scroll pr-3">
							{loadLinksList(
								linksLoaded.current,
								linkList,
								[onDeleteRemoveFromLinksList, onDeleteLinkFetchLinks],
								showMessageBox
							)}
						</div>

						<button
							type="button"
							className="self-end bg-yellow-500 rounded-lg p-2 border border-yellow-500 hover:bg-yellow-600/30 transition-colors ease-in duration-100">
							salvar alterações
						</button>
					</div>

					<MessageBoxComponent />
				</div>
			</div>
		</div>
	)
}
