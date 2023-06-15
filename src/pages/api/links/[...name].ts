import type { NextApiRequest, NextApiResponse } from "next"

import dbConnection from "../../../database/DbConnection"
import LinkRepository from "@/repositories/LinkRepository"

dbConnection()

type ExecuteRequestType = {
	[key: string]: (req: NextApiRequest, res: NextApiResponse, link: string) => Promise<void>
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
	DELETE: async (req: NextApiRequest, res: NextApiResponse, link: string) => {},
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
		res.status(405).json({ error: "Method Not Allowed" })
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
