import axios, { Axios, AxiosError } from "axios"
import { useCookies } from "react-cookie"
import { showMessageBox } from "./MessageBoxComponent"
import { error } from "console"

function LinkElement(props: {
	key: string
	id: string
	nome: string
	link: string
	onDelete: any[]
	onCopy: any
}) {
	const [cookie, setCookie] = useCookies(["authorization"])

	const deleteLink = () => {
		props.onDelete[0](props.nome)
		axios
			.delete(`/api/links/${props.nome}`, {
				headers: { authorization: cookie.authorization },
			})
			.then(() => {
				props.onDelete[1]()
				showMessageBox(`Link /${props.nome} excluído!`)
			})
			.catch((error: AxiosError) => {
                props.onDelete[1]()
				if (error.response?.status == 404) {
					showMessageBox(`Link /${props.nome} não existe.`, "bg-red-600")
				} else showMessageBox(`Ocorreu um erro inesperado.`, "bg-red-600")
			})
	}

	const copyLink = () => {
		navigator.clipboard.writeText(`https://vnici.us/${props.nome}`)
		props.onCopy(`Link /${props.nome} copiado!`)
	}
	return (
		<li className="space-y-2 lg:space-y-0 lg:space-x-3 flex flex-col lg:flex-row ">
			<input
				type="text"
				onClick={copyLink}
				placeholder="nome"
				defaultValue={props.nome}
				readOnly={true}
				className="lg:w-48 p-2 rounded-lg outline-none border bg-neutral-900 border-neutral-900 hover:bg-neutral-900/50 transition-colors ease-in duration-100 hover:cursor-pointer active:bg-neutral-900"
			/>
			<input
				type="text"
				placeholder="link"
				defaultValue={props.link}
				readOnly={true}
				className="flex-auto p-2 rounded-lg outline-none border border-neutral-900 bg-neutral-900 hover:bg-neutral-900/50 transition-colors ease-in duration-100 hover:cursor-pointer"
			/>
			<div className="space-x-3 self-end lg:self-auto">
				<button
					type="button"
					className="w-fit lg:w-auto bg-green-500 rounded-lg p-2 border border-green-500 hover:bg-green-600/30 transition-colors ease-in duration-100"
				>
					editar
				</button>
				<button
					type="button"
					onClick={deleteLink}
					className="w-fit lg:w-auto bg-red-500 rounded-lg p-2 border border-red-500 hover:bg-red-600/30 transition-colors ease-in duration-100"
				>
					excluir
				</button>
			</div>
		</li>
	)
}

export default LinkElement
