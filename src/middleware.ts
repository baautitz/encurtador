import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const routes = ["admin", "api", "favicon.svg", "_next"]

export async function middleware(req: NextRequest): Promise<NextResponse> {
  let reqPathsList = req.nextUrl.pathname.substring(1).split("/")

  if (!reqPathsList[0]) {
    return NextResponse.next();
  }

  if (!routes.includes(reqPathsList[0])) {
    return NextResponse.rewrite(new URL(`/api/links/redirect/${req.nextUrl.pathname.replace("/", "")}`, req.url))
  }

  if (reqPathsList[0] == "admin") {
    return await adminMiddleware(req, reqPathsList)
  }

  return NextResponse.next()
}

async function adminMiddleware(req: NextRequest, reqPathsList: string[]): Promise<NextResponse> {
  const logged = true;

  if (!logged && reqPathsList[1] != "login") {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  if (logged && reqPathsList[1] == "login") {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
}