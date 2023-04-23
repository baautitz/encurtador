import { Edit, ChevronUp } from "lucide-react";
import LinkElement from "../elements/LinkElement";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [linkList, setLinkList] = useState<[{name: string, link: string}] | []>([])
  let linksLoaded = useRef(true);

  useEffect(() => {
    if (!linksLoaded.current) {
      fetchLinks()
      linksLoaded.current = true;
    }
  }, [])

  const fetchLinks = () => {
    axios("/api/links").then(res => {
      setLinkList(res.data)
    })
  }

  return (
    <div id="container" className="box-border flex h-screen text-zinc-300 ">
      <Head>
        <title>Admin | Bautitz</title>
      </Head>
    
      <div id="sidebar-container" className="flex-none w-72 bg-black border-r-2 border-neutral-900 p-6 overflow-y-auto">

        <div className="flex flex-col h-full min-h-[180px]">
          <nav className="flex-auto space-y-3">
            <a href="#" className="flex items-center gap-3 text-xl font-bold ">
              <Edit /> editar links
            </a>
          </nav>

          <button type="button" id="account-settings" className="flex items-center justify-between p-3 bg-neutral-900 border-2 border-neutral-900 hover:bg-transparent rounded-xl transition-colors ease-in duration-100">
            <div className="flex items-center gap-3">
              <img src="https://cravatar.eu/helmavatar/Bautitz/40.png" alt="avatar" className="rounded-full" />
              <div className="flex items-center text-xl font-bold ">
                <span className="overflow-hidden max-w-[128px] text-ellipsis whitespace-nowrap">Vinicius</span>
              </div>
            </div>

            <ChevronUp strokeWidth={3} />
          </button>
        </div>

      </div>

      <div id="main-container" className="flex-auto px-6 flex flex-col bg-black overflow-y-auto">
        <div className="flex-auto flex flex-col justify-center items-center min-w-[600px] min-h-[600px] space-y-3">
          <span className="text-5xl font-bold">editar links</span>
          <div id="links-container" className="min-w-[600px] max-w-[1000px] w-4/5 p-6  h-5/6 border-2 border-neutral-900 rounded-xl flex flex-col space-y-6">

            <div id="links-add" className="space-x-3 flex">
              <input type="text" placeholder="nome" className="w-36 p-2 rounded-xl border-2 border-neutral-900 bg-transparent" />
              <input type="text" placeholder="link" className="flex-auto p-2 rounded-xl border-2 border-neutral-900 bg-transparent" />
              <button type="button" className="bg-sky-600 rounded-xl p-2 border-2 border-sky-600 hover:bg-sky-600/30 transition-colors ease-in duration-100">adicionar</button>
            </div>

            <div id="links-list" className="flex-auto w-full overflow-y-scroll pr-3">
              <ul className="space-y-3">
                 {(linksLoaded ? <span>Loading</span> : linkList.map(l => <LinkElement nome={l.name} link={l.link}/>))}
              </ul>
            </div>

            <button type="button" className="self-end bg-yellow-600 rounded-xl p-2 border-2 border-yellow-600 hover:bg-yellow-600/30 transition-colors ease-in duration-100">salvar alterações</button>
          </div>
        </div>
      </div>

    </div>
  )
}
