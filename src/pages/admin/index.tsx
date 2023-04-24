import { Loader } from "lucide-react";
import LinkElement from "../elements/LinkElement";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SidebarElement from "../elements/SidebarElement";

export default function Admin() {
  const [linkList, setLinkList] = useState<any>([])
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
    axios("/api/links").then(res => {
      setLinkList(res.data)
    })
  }

  const createLinkFromInput = (e: any) => {
    if (e.key == "Enter") createLink()
  }

  const createLink = () => {
    let linkNameValue = linkNameInput.current.value
    const linkValue = linkInput.current.value

    const rg = /([A-Za-z0-9][A-Za-z0-9/].*)/g
    linkNameValue = (linkNameValue.match(rg)) ? linkNameValue.match(rg)[0] : ""

    if (!linkNameValue.trim() || !linkValue.trim()) return;

    let refinedLinkValue: string = linkValue.trim()

    if (!refinedLinkValue.startsWith("http://") && !refinedLinkValue.startsWith("https://")) {
      refinedLinkValue = `http://${refinedLinkValue}`
    }

    axios.post("/api/links", {
      name: linkNameValue.trim(),
      link: refinedLinkValue
    }).then(() => {
      fetchLinks()
      linkNameInput.current.value = ""
      linkInput.current.value = ""
    })
  }

  const onDeleteUpdateLinks = (name: string) => {
    setLinkList(linkList.filter((l: { name: any; }) => name != l.name))
  }

  const onDeleteLinkFetchLinks = () => {
    fetchLinks()
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

            <form id="links-add" className="space-x-3 flex">
              <input type="text" ref={linkNameInput} onKeyDown={e => createLinkFromInput(e)} placeholder="nome" className="w-36 p-2 rounded-xl border-2 border-neutral-900 bg-transparent" />
              <div className="flex-auto rounded-xl flex">
                <input type="text" placeholder="link" defaultValue="http://" disabled className="p-2 w-[67px] rounded-l-xl border-2 border-neutral-900 bg-neutral-900 text-zinc-400" />
                <input type="text" ref={linkInput} onKeyDown={e => createLinkFromInput(e)} placeholder="link" className="flex-auto p-2 w-full rounded-r-xl border-2 border-neutral-900 bg-transparent" />
              </div>
              <button type="button" onClick={createLink} className="bg-sky-600 rounded-xl p-2 border-2 border-sky-600 hover:bg-sky-600/30 transition-colors ease-in duration-100">adicionar</button>
            </form>

            <div id="links-list" className="flex-auto w-full overflow-y-scroll pr-3">
              {loadLinksList(linksLoaded.current, linkList, [onDeleteUpdateLinks, onDeleteLinkFetchLinks])}
            </div>

            <button type="button" className="self-end bg-yellow-500 rounded-xl p-2 border-2 border-yellow-500 hover:bg-yellow-600/30 transition-colors ease-in duration-100">salvar alterações</button>
          </div>
        </div>
      </div>

    </div>
  )
}

function loadLinksList(linksLoaded: boolean, linkList: [{ "_id": string, name: string, link: string }] | [], onDelete: any[]) {
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
      {linkList.map(l => <LinkElement key={l.name} id={l["_id"]} nome={l.name} link={l.link} onDelete={onDelete} />)}
    </ul>
  )
}