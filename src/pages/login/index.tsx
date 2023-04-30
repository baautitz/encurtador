import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Router from 'next/router';

import { useCookies } from 'react-cookie'
import { useEffect, useRef, useState } from "react";

import Logo from "../../../public/logo-big-name.svg"
import Image from "next/image";

import MessageBoxElement, { showMessageBox } from "@/elements/MessageBoxElement";
import { redirect } from "next/dist/server/api-utils";


function Login() {
    const username = useRef<any>();
    const password = useRef<any>();

    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    const enterLogin = (e: any) => {
        if (e.key == "Enter") login()
    }

    const login = () => {
        axios.post("/api/auth/", {
            username: username.current.value, password: password.current.value
        }).then(res => {
            setCookie("id", res.data.id, {
                path: '/',
            })
            Router.push("/admin")
        }).catch(e => {
            if (e.response.status == 401) {
                showMessageBox("Usuário ou senha inválido")
            } else showMessageBox("Ocorreu um erro ao efetuar login")
        })
    }

    return (
        <div className="
            h-screen
            min-w-[310px]
            min-h-[320px]

            flex
            justify-center
            items-center
            bg-black
        ">
            <Head>
                <title>Bautitz | Login</title>
            </Head>
            <div className="
                h-full 
                w-full
                sm:h-auto
                sm:w-[500px]

                flex 
                flex-col  
                items-center
            ">
                <form className="
                    h-full 
                    w-full

                    flex
                    flex-col
                    items-center
                    justify-center

                    p-6
                    space-y-3

                    border
                    border-neutral-800
                    sm:rounded-lg
                    bg-neutral-950
                    
                ">
                    <div className="flex flex-col items-center gap-3">
                        <h1 className="text-5xl font-bold">login</h1>
                        <h2 className="text-xl text-neutral-500">Insira seus dados para continuar</h2>
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                        <input ref={username} type="text" name="user" id="user-input" placeholder="Usuário" className="
                            p-2

                            border
                            border-neutral-800
                            rounded-lg
                            focus:border-white
                            outline-none

                            bg-neutral-950

                            transition
                            ease-in
                            duration-100
                        "/>
                        <input ref={password} onKeyDown={e => enterLogin(e)} type="password" name="password" id="password-input" placeholder="Senha" className="
                            p-2

                            border
                            border-neutral-800
                            rounded-lg
                            focus:border-white
                            outline-none

                            bg-neutral-950

                            transition
                            ease-in
                            duration-100
                        "/>
                    </div>
                    <div className="select-none w-full flex justify-between">
                        <Image draggable={false} src={Logo} width={120} alt="logo" />

                        <button onClick={login} type="button" className="
                            w-20
                            p-2
                            self-end

                            text-center

                            border
                            border-sky-600
                            rounded-lg

                            bg-sky-600
                            hover:bg-sky-600/30

                            transition
                            ease-in
                            duration-100
                        " >
                            entrar
                        </button>
                    </div>
                </form>
                <MessageBoxElement />
            </div>
        </div>
    )
}

export default Login;