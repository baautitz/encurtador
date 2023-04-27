import { NextServer } from 'next/dist/server/next'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest, res: any) {
  const pages = ["admin", "api", "_next", "favicon.ico", "home", "login"]
  
  let link = req.nextUrl.pathname.toLocaleLowerCase().replace("/","")

  if (pages.includes(link.split("/")[0].toLowerCase())) return;
  if (!link) return NextResponse.redirect(new URL("/home", req.url));

  return NextResponse.rewrite(new URL(`/api/redirect/${req.nextUrl.pathname.replace("/","")}`, req.url))
}

