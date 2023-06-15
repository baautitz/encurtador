import AuthorizationModel from "@/database/models/AuthorizationModel"
import UserModel from "@/database/models/UserModel"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function middleware(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { authorization } = req.query

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

	const findedUser = await UserModel.findOne({
		username: findedAuthorization.username,
	}).select("-password")


	return res.status(200).json({
		message: "200 - Success",
		content: { authorization: findedAuthorization, user: findedUser },
	})
}
