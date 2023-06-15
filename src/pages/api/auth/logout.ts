import dbConnection from "@/database/DbConnection"
import AuthorizationModel from "@/database/models/AuthorizationModel"
import type { NextApiRequest, NextApiResponse } from "next"

dbConnection()

export default async function middleware(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { authorization } = req.body

	if (!authorization)
		return res.status(400).json({
			error: "400 - Bad Request",
			message: "Authorization cannot be blank",
		})

	const wasDeleted = await AuthorizationModel.deleteOne({ authorization })

	if (wasDeleted.deletedCount == 0)
		return res.status(400).json({
			error: "401 - Unauthorized",
			message: "Invalid authorization",
		})

	return res.status(200).json({
		message: "200 - Success",
	})
}
