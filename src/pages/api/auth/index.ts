import dbConnection from "@/database/DbConnection"
import AuthorizationModel from "@/database/models/AuthorizationModel"
import UserModel from "@/database/models/UserModel"
import { v4 as uuidv4 } from "uuid"

import type { NextApiRequest, NextApiResponse } from "next"

dbConnection()

export default async function middleware(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method != "POST")
		return res.status(405).json({ error: "405 - Method Not Allowed" })

	const { username, password } = req.body

	if (!username || !password)
		return res.status(400).json({
			error: "400 - Bad Request",
			message: "Username or Password cannot be blank",
		})

	const user = await UserModel.findOne({ username, password })

	if (!user)
		return res.status(401).json({
			error: "401 - Unauthorized",
			message: "Invalid username or password",
		})

	const authorization = await AuthorizationModel.create({
		username,
		authorization: uuidv4().replaceAll("-", ""),
	})

	return res.status(200).json({
		message: "200 - Success",
		content: authorization
	})
}
