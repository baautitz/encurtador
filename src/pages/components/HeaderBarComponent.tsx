import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/logo-big-name.svg"
import { LogOut } from "lucide-react";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

function SidebarElement() {
  const { push } = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [user, setUser] = useState()
  const userLoaded = useRef(false)

  const fetchUser = () => {
    // const instance = axios.create({ headers: { 'token': cookies.token } })
    // instance.get("/api/auth/verify").then(res => {
    //   setUser(res.data.name)
    // })
  }

  useEffect(() => {
    if (!userLoaded.current) {
      fetchUser()
      userLoaded.current = true
    }
  })

  const logout = () => {
    // axios.post("/api/auth/logout", { token: cookies.token }).then((res) => {
    //   push("/admin/login")
    // }).catch()
  }

  return (
    <div id="sidebar-container" className="
      h-20 w-full
      py-3
      px-6
    
      flex
      items-center
      justify-between

      border-b
      border-neutral-800

      bg-neutral-950
    ">

      <Link href="/admin"> <Image src={Logo} height={40} alt="logo"></Image> </Link>
      <button type="button" onClick={logout} className="w-32 sm:w-48 p-3 flex justify-start items-center gap-3 rounded-lg bg-neutral-800">
        <span className="flex-auto text-start overflow-hidden text-ellipsis whitespace-nowrap font-bold text-lg">{user}</span>
        <LogOut strokeWidth={2} />
      </button>

    </div>
  )
}

export default SidebarElement