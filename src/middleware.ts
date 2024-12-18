import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const routes = ["admin", "api", "favicon.svg", "_next"];

export async function middleware(req: NextRequest): Promise<NextResponse> {
	let reqPathsList = req.nextUrl.pathname.substring(1).split("/");

	// if requested url is root ("/")
	if (!reqPathsList[0]) {
		return NextResponse.redirect('https://profile.vnici.us');
	}

	// if requested url path includes in routes array
	if (!routes.includes(reqPathsList[0])) {
		return NextResponse.rewrite(new URL(`/api/links/redirect/${req.nextUrl.pathname.replace("/", "")}`, req.url));
	}

	return NextResponse.next();
}
