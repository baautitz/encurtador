import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import LinkRepository from "./repositories/LinkRepository"

const routes = ["admin", "api", "favicon.svg", "_next"]

export async function middleware(req: NextRequest): Promise<NextResponse> {
	let reqPathsList = req.nextUrl.pathname.substring(1).split("/")

	// if requested url is root ("/")
	if (!reqPathsList[0]) {
		return NextResponse.next()
	}

	// if requested url includes one of routes array
	if (!routes.includes(reqPathsList[0])) {
		return NextResponse.rewrite(
			new URL(
				`/api/links/redirect/${req.nextUrl.pathname.replace("/", "")}`,
				req.url
			)
		)
	}

	// // if requested url is part of admin ("/admin/*")
	// if (reqPathsList[0] == "admin") {
	// 	return await adminMiddleware(req, reqPathsList)
	// }

	return NextResponse.next()
}

// async function adminMiddleware(
// 	req: NextRequest,
// 	reqPathsList: string[]
// ): Promise<NextResponse> {
// 	const logged = true

// 	if (!logged && reqPathsList[1] != "login") {
// 		return NextResponse.redirect(new URL("/admin/login", req.url))
// 	}

// 	if (logged && reqPathsList[1] == "login") {
// 		return NextResponse.redirect(new URL("/admin", req.url))
// 	}

// 	return NextResponse.next()
// }