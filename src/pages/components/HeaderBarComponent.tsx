import { useRouter } from "next/router"

import Image from "next/image"
import Link from "next/link"

import Logo from "../../../public/logo-big-name.svg"
import { LogOut } from "lucide-react"
import { useCookies } from "react-cookie"
import axios from "axios"

export default function HeaderBarElement({ fullName }: any) {
	const router = useRouter()
	const [cookies] = useCookies(["authorization"])

	const logout = () => {
		axios.post("/api/auth/logout", { authorization: cookies.authorization })
      .then(() => router.reload())
      .catch(() => router.reload())
		router.reload()
	}

	return (
		<div
			id="sidebar-container"
			className="
      h-20 w-full
      py-3
      px-6
    
      flex
      items-center
      justify-between

      border-b
      border-neutral-800

      bg-neutral-950
      
    "
		>
			<Link href="/admin">
				{" "}
				<Image src={Logo} height={45} alt="logo"></Image>{" "}
			</Link>
			<button
				type="button"
				onClick={logout}
				className="h-full w-32 sm:w-48 p-3 flex justify-start items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-800 hover:bg-neutral-800/30 duration-100"
			>
				<span className="flex-auto text-start overflow-hidden text-ellipsis whitespace-nowrap font-bold text-lg">
					{fullName}
				</span>
				<LogOut strokeWidth={2} />
			</button>
		</div>
	)
}
