import mongoose, { Model, Schema } from "mongoose"

type Authorization = {
	id: string
	username: string
    authorization: string
}

const AuthorizationSchema = new Schema<Authorization>(
	{
		authorization: {
			type: String,
			required: true,
			unique: true,
		},
		username: String,
	},
	{ timestamps: true }
)

const AuthorizationModel: Model<Authorization> =
	mongoose.models.AuthorizationModel || mongoose.model("AuthorizationModel", AuthorizationSchema, "authorizations")

export type { Authorization }
export default AuthorizationModel