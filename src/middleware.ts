import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const pages = ["admin", "api", "_next", "favicon.ico"]

export async function middleware(req: NextRequest, res: any) {
  let link = req.nextUrl.pathname.toLocaleLowerCase().replace("/","")

  if (pages.includes(link.split("/")[0].toLowerCase())) return;
  if (!link) return NextResponse.redirect(new URL("/admin", req.url));

  const encurtador: { [key: string]: string } = {
    vini: "https://twitter.com/baautitz",
    fab: "https://twitter.com/fabriciocevero"
  }

  return NextResponse.rewrite(new URL(`/api/redirect/${link}`, req.url))

  // if (encurtador[link]) return NextResponse.redirect(new URL(encurtador[link]))

  // return NextResponse.json({
  //   link,
  //   encurtador: encurtador[link] || "null"
  // })

}

