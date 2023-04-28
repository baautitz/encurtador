import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest, res: any) {
  const pages = ["admin", "api", "_next", "home", "login"]
  let link = req.nextUrl.pathname.toLocaleLowerCase().replace("/","")

  // const logged = false;

  // if (link.split("/")[0] == "admin") {
  //   if (!logged) {
  //     return NextResponse.redirect(new URL(`/login`, req.url))
  //   }
  // }

  // if (link.split("/")[0] == "login") {
  //   if (logged) {
  //     return NextResponse.redirect(new URL(`/admin`, req.url))
  //   }
  // }

  if (pages.includes(link.split("/")[0].toLowerCase())) return;
  if (!link) return NextResponse.redirect(new URL("/home", req.url));

  return NextResponse.rewrite(new URL(`/api/redirect/${req.nextUrl.pathname.replace("/","")}`, req.url))
}

