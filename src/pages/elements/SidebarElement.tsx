import { ChevronUp, Edit } from "lucide-react"

function SidebarElement() {
    return (
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
    )
}

export default SidebarElement