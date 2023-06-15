import type { NextApiRequest, NextApiResponse } from "next"

import dbConnection from "../../../database/DbConnection"
import LinkRepository from "@/repositories/LinkRepository"
import AuthorizationModel from "@/database/models/AuthorizationModel"

dbConnection()

type ExecuteRequestType = {
	[key: string]: (
		req: NextApiRequest,
		res: NextApiResponse,
		link: string
	) => Promise<void>
}

const executeRequest: ExecuteRequestType = {
	GET: async (req: NextApiRequest, res: NextApiResponse, link: string) => {
		const findedLink = await LinkRepository.getByName(link)

		if (!findedLink) {
			res.status(404).json({ message: `404 - Link '${link}' not found.` })
			return
		}

		res.status(200).json(findedLink)
	},
	DELETE: async (req: NextApiRequest, res: NextApiResponse, link: string) => {
		const findedLink = await LinkRepository.getByName(link)

		if (!findedLink) {
			res.status(404).json({
				error: "404 - Not Found",
				message: `Link '${link}' not found.`,
			})
			return
		}

		const { authorization } = req.headers
		if (!authorization)
			return res.status(400).json({
				error: "400 - Bad Request",
				message: "Authorization cannot be blank",
			})

		const findedAuthorization = await AuthorizationModel.findOne({
			authorization,
		})

		if (!findedAuthorization)
			return res.status(400).json({
				error: "401 - Unauthorized",
				message: "Invalid authorization",
			})

		const wasDeleted = await LinkRepository.delete(findedLink.name)

		if (!wasDeleted)
			return res.status(500).json({
				error: "500 - Internal Server Error",
			})

		return res.status(200).json({ message: "200 - Success" })
	},
	UPDATE: async (req: NextApiRequest, res: NextApiResponse, link: string) => {},
}

export default async function middleware(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const link = decodeURI(req.url!.replace("/api/links/", ""))
	const method = req.method || ""
	const requestFunction = executeRequest[method]

	if (!requestFunction) {
		return res.status(405).json({ error: "405 - Method Not Allowed" })
	}

	await requestFunction(req, res, link)

	// const findedLink = (await Link.find({ name: link }))[0]

	// if (!findedLink) {
	// 	res.status(404).json({ error: `Link '${link}' not found.` })
	// 	return
	// }

	// if (req.method == "GET") {
	// 	res.status(200).json(findedLink)
	// } else if (req.method == "DELETE") {
	// 	try {
	// 		const linkId = findedLink["_id"]
	// 		await Link.deleteOne({ _id: linkId })
	// 		res.status(200).json({ message: `Link '${findedLink.name}' deleted.` })
	// 	} catch (error: any) {
	// 		res.status(400).json(error)
	// 	}
	// }
}
