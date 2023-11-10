import Router from "next/router";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/logo-big-name.svg";
import { LogOut } from "lucide-react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function HeaderBarElement({ fullName, pageName }: any) {
	const linksNav = useRef<HTMLDivElement>(null);

	linksNav.current?.childNodes.forEach((el: any) => {
		if (pageName != el.innerHTML) {
			el.classList.remove("translate-y-[1px]");
			el.classList.remove("after:relative");
			el.classList.remove("after:border");
			el.classList.remove("after:w-full");
			el.classList.add("text-white/60");
			el.classList.remove("text-white");
		} else {
			el.classList.add("translate-y-[1px]");
			el.classList.add("after:relative");
			el.classList.add("after:border");
			el.classList.add("after:w-full");
			el.classList.add("text-white");
			el.classList.remove("text-white/60");
		}
	});

	const [page, setPage] = useState();
	const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);

	function logout() {
		const authorization = cookies.authorization;
		removeCookie("authorization");
		axios.post("/api/auth/logout", { authorization }).then(() => Router.reload());
	}

	return (
		<div
			id="sidebar-container"
			className="
      h-20 w-full
      py-3
      px-6
    
      flex
	  gap-20
      items-center
      justify-between

      border-b
      border-neutral-800

      bg-neutral-950
      
    "
		>
			<Link href="/admin">
				<Image src={Logo} height={45} alt="logo" />
			</Link>
			<div ref={linksNav} className="h-full flex-auto hidden md:flex justify-center items-center gap-10 text-lg font-semibold">
				{/* <Link
					href="/admin/links"
					className="text-white/60 h-full flex justify-center items-center flex-col hover:text-white duration-200"
				>
					links
				</Link>
				<Link
					href="/admin/users"
					className="text-white/60 h-full flex justify-center items-center flex-col hover:text-white duration-200"
				>
					usuários
				</Link> */}
			</div>
			<button
				type="button"
				onClick={logout}
				className="h-full w-32 sm:w-48 p-3 flex justify-start items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-800 hover:bg-neutral-800/30 duration-100"
			>
				<span className="flex-auto text-start overflow-hidden text-ellipsis whitespace-nowrap font-bold text-lg">{fullName}</span>
				<LogOut strokeWidth={2} />
			</button>
		</div>
	);
}
