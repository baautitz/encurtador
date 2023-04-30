import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

import Api from '../src/services/Api';
import axios from 'axios';
import { log } from 'console';

export async function middleware(req: NextRequest, res: any) {
  const pages = ["admin", "api", "_next", "home", "login", "favicon.svg"]
  let link = req.nextUrl.pathname.toLocaleLowerCase().replace("/", "")

  let logged = false;

  const verifyLogin = await fetch(process.env.API_BASE_URL + "/auth/verify", {
    method: "GET",
    headers: { "id": req.cookies.get("id")?.value || "" },
  });
  const response = await verifyLogin.json()

  if (response.id) logged = true

  if (link.split("/")[0] == "admin") {
    if (!logged) {
      return NextResponse.redirect(new URL(`/login`, req.url))
    }
  }

  if (link.split("/")[0] == "login") {
    if (logged) {
      return NextResponse.redirect(new URL(`/admin`, req.url))
    }
  }

  if (pages.includes(link.split("/")[0].toLowerCase())) return;
  if (!link) return NextResponse.redirect(new URL("/home", req.url));

  return NextResponse.rewrite(new URL(`/api/redirect/${req.nextUrl.pathname.replace("/", "")}`, req.url))
}

