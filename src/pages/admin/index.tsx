import { Loader } from "lucide-react";
import LinkElement from "../elements/LinkElement";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SidebarElement from "../elements/SidebarElement";

export default function Admin() {
  const [linkList, setLinkList] = useState<[{ "_id": string, name: string, link: string }] | []>([])
  let linksLoaded = useRef(false);

  const linkNameInput = useRef<any>(null)
  const linkInput = useRef<any>(null)

  useEffect(() => {
    if (!linksLoaded.current) {
      fetchLinks()
      linksLoaded.current = true;
    }
  }, [])

  const fetchLinks = () => {
    setLinkList([])
    axios("/api/links").then(res => {
      setLinkList(res.data)
    })
  }

  const createLink = () => {
    const linkNameValue = linkNameInput.current.value
    const linkValue = linkInput.current.value
    if (!linkNameValue.trim() || !linkValue.trim()) return;

    axios.post("/api/links", {
      name: linkNameValue.trim(),
      link: linkValue.trim()
    }).then(() => {
      fetchLinks()
      linkNameInput.current.value = ""
      linkInput.current.value = ""
    })
  }

  return (
    <div id="container" className="box-border flex h-screen text-white ">
      <Head>
        <title>Admin | Bautitz</title>
      </Head>

      <SidebarElement />

      <div id="main-container" className="flex-auto px-6 flex flex-col bg-black overflow-y-auto">

        <div className="flex-auto flex flex-col justify-center items-center min-w-[600px] min-h-[600px] space-y-3">
          <span className="text-5xl font-bold">editar links</span>
          <div id="links-container" className="min-w-[600px] max-w-[1000px] w-4/5 p-6  h-5/6 border-2 border-neutral-900 rounded-xl flex flex-col space-y-6">

            <div id="links-add" className="space-x-3 flex">
              <input type="text" ref={linkNameInput} placeholder="nome" className="w-36 p-2 rounded-xl border-2 border-neutral-900 bg-transparent" />
              <input type="text" ref={linkInput} placeholder="link" className="flex-auto p-2 rounded-xl border-2 border-neutral-900 bg-transparent" />
              <button type="button" onClick={createLink} className="bg-sky-600 rounded-xl p-2 border-2 border-sky-600 hover:bg-sky-600/30 transition-colors ease-in duration-100">adicionar</button>
            </div>

            <div id="links-list" className="flex-auto w-full overflow-y-scroll pr-3">
              {loadLinksList(linksLoaded.current, linkList)}
            </div>

            <button type="button" className="self-end bg-yellow-600 rounded-xl p-2 border-2 border-yellow-600 hover:bg-yellow-600/30 transition-colors ease-in duration-100">salvar alterações</button>
          </div>
        </div>
      </div>

    </div>
  )
}

function loadLinksList(linksLoaded: boolean, linkList: [{ "_id": string, name: string, link: string }] | []) {
  if (!linksLoaded || linkList.length == 0) {
    return (
      <div className="h-full w-full flex justify-center items-center gap-3">
        <Loader />
        <span>Carregando...</span>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {linkList.map(l => <LinkElement key={l["_id"]} nome={l.name} link={l.link} />)}
    </ul>
  )
}