import { ChevronUp, Edit } from "lucide-react"
import Image from "next/image";
import Logo from "../../public/logo-big-name.svg"


function SidebarElement() {
    return (
        <div id="sidebar-container" className="lg:flex-none h-20 lg:h-full lg:w-72 bg-neutral-950 shadow-[0_0_15px_0_rgba(38,38,38,.5)] border-b lg:border-b-0 lg:border-r border-neutral-800 lg:p-6 lg:overflow-y-auto">

        <div className="flex lg:flex-col h-full px-6 lg:px-0 items-center lg:items-start lg:min-h-[180px]">
          <nav className="flex-auto flex items-start space-y-3 w-full">
            <a href="/admin" className="flex items-center justify-center w-full">
              <Image draggable={false} src={Logo} alt="logo" width={150} className="mt-2"/>
            </a>
          </nav>

          <button type="button" id="account-settings" className="flex items-center h-10 lg:w-full lg:h-auto justify-between p-3 bg-neutral-900 border border-neutral-900 hover:bg-transparent rounded-lg transition-colors ease-in duration-100">
            <div className="flex items-center gap-3">
              <img src="https://cravatar.eu/helmavatar/Bautitz/40.png" alt="avatar" className="rounded-full w-7 h-7 lg:w-10 lg:h-10" />
              <div className="flex items-center text-xl font-bold ">
                <span className="overflow-hidden max-w-[128px] text-ellipsis whitespace-nowrap">Vinicius</span>
              </div>
            </div>

            <ChevronUp strokeWidth={3} />
          </button>
        </div>

      </div>
    )
}

export default SidebarElement