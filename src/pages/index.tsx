import Image from "next/image";
import Head from "next/head";

import MessageBoxComponent, {
  showMessageBox,
} from "../components/MessageBoxComponent";

import XLogo from "../../public/x-logo.svg";
import InstagramLogo from "../../public/instagram-logo.svg";
import DiscordLogo from "../../public/discord-logo.svg";
import GitHubLogo from "../../public/github-logo.svg";
import WavingHandEmoji from "../../public/waving-hand-emoj.svg";
import Logo from "../../public/logo-big-name.svg";

function socialMedia() {
  return (
    <>
      <a
        rel="noopener"
        href="https://x.com/baautitz"
        target="_blank"
        className="w-40 flex items-center p-2 gap-3 border rounded-lg border-zinc-300 shadow-[0_0_6px_0_rgba(212,212,216,.5)] hover:bg-white/30 transition-all ease-in duration-100"
      >
        <Image draggable={false} alt="XLogo" src={XLogo} width={30} />X /
        Twitter
      </a>

      <a
        rel="noopener"
        href="https://www.instagram.com/vinicius.bautitz"
        target="_blank"
        className="w-40 flex items-center p-2 gap-3 border rounded-lg border-rose-600 shadow-[0_0_8px_0_rgba(225,29,72,.5)] hover:bg-rose-600/30 transition-all ease-in duration-100"
      >
        <Image
          draggable={false}
          alt="InstagramLogo"
          src={InstagramLogo}
          width={30}
        />
        Instagram
      </a>

      <a
        rel="noopener"
        href="https://discord.com/users/404867138193457163"
        target="_blank"
        className="w-40 flex items-center p-2 gap-3 border rounded-lg border-sky-700 shadow-[0_0_8px_0_rgba(3,105,161,.6)] hover:bg-sky-700/30 transition-all ease-in duration-100"
      >
        <Image
          draggable={false}
          alt="DiscordLogo"
          src={DiscordLogo}
          width={30}
        />
        Discord
      </a>

      <a
        rel="noopener"
        href="https://github.com/baautitz"
        target="_blank"
        className="w-40 flex items-center p-2 gap-3 border rounded-lg border-zinc-300 shadow-[0_0_6px_0_rgba(212,212,216,.5)] hover:bg-white/30 transition-all ease-in duration-100"
      >
        <Image draggable={false} alt="GitHubLogo" src={GitHubLogo} width={30} />
        GitHub
      </a>
    </>
  );
}

export async function getServerSideProps() {
  let todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  let birthdayDate = new Date("2004-08-27");
  birthdayDate.setHours(0, 0, 0, 0);

  let age = todayDate.getFullYear() - birthdayDate.getFullYear();

  if (
    todayDate.getMonth() < birthdayDate.getMonth() ||
    (todayDate.getMonth() === birthdayDate.getMonth() &&
      todayDate.getDate() < birthdayDate.getDate())
  ) {
    age -= 1;
  }

  return {
    props: {
      age,
    },
  };
}

export default function Home({ age }: any) {
  return (
    <div className="h-screen grid">
      <div className="grid h-full md:p-5 md:place-items-center">
        <Head>
          <title>Perfil • vnici.us</title>
        </Head>

        <div className="md:grid place-items-center text-white md:w-[700px]">
          <div className="md:w-full h-full flex flex-col items-center justify-center p-6 gap-3 bg-neutral-950 border border-neutral-800 shadow-[0_0_15px_0_rgba(38,38,38,.5)] md:rounded-lg md:max-w-lg md:h-fit">
            <div className="flex flex-col items-center gap-1 text-zinc-300">
              <h1 className="text-5xl font-semibold flex gap-2">
                Olá!
                <Image
                  draggable={false}
                  alt="WavingHandEmoji"
                  src={WavingHandEmoji}
                  width={40}
                />
              </h1>
              <h2 className="text-xl font-semibold text-center">
                Me chamo Vinicius e tenho {age} anos
              </h2>
            </div>

            <span className="text-neutral-500">Um pouco sobre mim:</span>

            <div className="grid md:grid-cols-2 items-center justify-center gap-2 text-zinc-200">
              {socialMedia()}
            </div>

            <Image
              draggable={false}
              src={Logo}
              alt="Logo"
              width={120}
              className="mt-2"
            />
          </div>

          <MessageBoxComponent />
        </div>
      </div>
    </div>
  );
}
