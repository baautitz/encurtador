import type { NextApiRequest, NextApiResponse } from "next"

import Link from "../../../database/models/LinkModel"
import LinkRepository from "@/repositories/LinkRepository"
import AuthorizationModel from "@/database/models/AuthorizationModel"

const executeRequest: any = {
	GET: async (req: NextApiRequest, res: NextApiResponse) => {
		const findedLinks = await LinkRepository.getAllLinks()
		res.status(200).json(findedLinks)
	},

	POST: async (req: NextApiRequest, res: NextApiResponse) => {
		let { name, link, origin, author } = req.body

		if (!name || !link || !origin)
			return res.status(400).json({
				error: "400 - Bad Request",
				message: "Name/Link cannot be blank",
			})

		const findedLink = await LinkRepository.getByName(name)
		if (findedLink)
			return res.status(409).json({
				error: "409 - Conflict",
				message: `Link '${name}' already exists`,
			})

		const { authorization } = req.headers
		if (!authorization) {
			return res.status(400).json({
				error: "400 - Bad Request",
				message: "Authorization cannot be blank",
			})
		}

		const findedAuthorization = await AuthorizationModel.findOne({
			authorization,
		})

		if (!findedAuthorization) {
			return res.status(401).json({
				error: "401 - Unauthorized",
				message: "Invalid authorization",
			})
		}
			

		try {
			const linkNamePattern = /[A-Za-z0-9]+([/]{0,1}[A-Za-z0-9-]+)*/g

			name = name.replaceAll(" ", "")
			link = link.replaceAll(" ", "")

			let refinedLinkValue: string = link.trim()
			if (
				!refinedLinkValue.startsWith("http://") &&
				!refinedLinkValue.startsWith("https://")
			) {
				refinedLinkValue = `http://${refinedLinkValue}`
			}

			name = name.match(linkNamePattern) ? name.match(linkNamePattern)[0] : ""
			name = decodeURI(name)

			author = !author ? findedAuthorization.username : author

			const createdLink = await Link.create({
				name,
				link: refinedLinkValue,
				author,
				origin,
			})
			res.status(201).json({ message: "201 - Created", content: createdLink })
		} catch (content: any) {
			res.status(500).json({ error: "500 - Internal Server Error", content })
		}
	},
}

export default async function middleware(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const method = req.method || ""
	const requestFunction = executeRequest[method]

	if (!requestFunction) {
		res.status(405).json({ error: "405 - Method Not Allowed" })
	}

	await requestFunction(req, res)
}
