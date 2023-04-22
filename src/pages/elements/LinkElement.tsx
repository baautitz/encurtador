"use client"

import { Component } from "react"

class LinkElement extends Component {
    render() {
        return (
            <li className="space-x-3 flex">
                  <input type="text" placeholder="nome" defaultValue={"abcdefghijklmnnopqrstuvwxyz"} disabled className="w-36 p-2 rounded-xl border-2 bg-neutral-900 border-neutral-900 hover:bg-neutral-900/50 transition-colors ease-in duration-100 hover:cursor-pointer" />
                  <input type="text" placeholder="link" defaultValue={"https://abcdefghijklmnnopqrstuvwxyz.com"} disabled className="flex-auto p-2 rounded-xl border-2 border-neutral-900 bg-neutral-900 hover:bg-neutral-900/50 transition-colors ease-in duration-100 hover:cursor-pointer" />
                  <button type="button" className="bg-green-500 rounded-xl p-2 border-2 border-green-500 hover:bg-green-600/30 transition-colors ease-in duration-100">editar</button>
                  <button type="button" className="bg-red-500 rounded-xl p-2 border-2 border-red-500 hover:bg-red-600/30 transition-colors ease-in duration-100">excluir</button>
            </li>
        )
    }
}

export default LinkElement