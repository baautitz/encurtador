import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest, res: any) {
  const pages = ["admin", "api", "_next", "home", "favicon.svg"]
  let link = req.nextUrl.pathname.toLocaleLowerCase().replace("/", "")

  let logged = false;

  const verifyLogin = await fetch(process.env.API_BASE_URL + "/auth/verify", {
    method: "GET",
    headers: { "token": req.cookies.get("token")?.value || "" },
  });
  const response = await verifyLogin.json()

  if (response.token) logged = true

  if (link.split("/")[0] == "admin") {
    if (logged && link.split("/")[1] == "login") {
      return NextResponse.redirect(new URL(`/admin`, req.url))
    }

    if (!logged && link.split("/")[1] != "login") {
      return NextResponse.rewrite(new URL(`/admin/login`, req.url))
    }
  }

  if (pages.includes(link.split("/")[0].toLowerCase())) return;
  if (!link) return NextResponse.redirect(new URL("/home", req.url));

  return NextResponse.rewrite(new URL(`/api/redirect/${req.nextUrl.pathname.replace("/", "")}`, req.url))
}