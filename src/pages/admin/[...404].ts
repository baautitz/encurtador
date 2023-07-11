import dbConnection from "@/database/DbConnection"
import AuthorizationModel from "@/database/models/AuthorizationModel"

export async function getServerSideProps(context: any) {
	dbConnection()

	const authorizationCookie = context.req.cookies["authorization"]
	if (!authorizationCookie)
		return {
			redirect: {
				permanent: false,
				destination: "/admin/login",
			},
		}

	const findedAuthorization = await AuthorizationModel.findOne({
		authorization: authorizationCookie,
	})

	if (!findedAuthorization) {
		context.res.setHeader(
			"Set-Cookie",
			"authorization=invalidAuthorization; Max-Age=0"
		)

		return {
			redirect: {
				permanent: false,
				destination: "/admin/login",
			},
		}
	}

	return {
		notFound: true,
	}
}

export default async function page404() {}
