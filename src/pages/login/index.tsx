import Head from "next/head";
import Link from "next/link";

function Login() {
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
                sm:w-[620px]

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
                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl font-bold">login</h1>
                        <h2 className="text-xl font-bold pt-3">Realize seu login para continuar</h2>
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                        <input type="text" name="user" id="user-input" placeholder="Usuário" className="
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
                        <input type="password" name="password" id="password-input" placeholder="Senha" className="
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
                    <Link href="admin" className="
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
                    ">
                        <button type="button" >
                            Login
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login;