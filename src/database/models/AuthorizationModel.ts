import mongoose, { Model, Schema } from "mongoose"

type Authorization = {
	id: string
	username: string
	authorization: string
	lastUsed: Date
}

const AuthorizationSchema = new Schema<Authorization>(
	{
		authorization: {
			type: String,
			required: true,
			unique: true,
		},
		username: String,
		lastUsed: { type: Date, default: Date.now },
	},
	{ timestamps: false }
)

const AuthorizationModel: Model<Authorization> =
	mongoose.models.AuthorizationModel ||
	mongoose.model("AuthorizationModel", AuthorizationSchema, "authorizations")

export type { Authorization }
export default AuthorizationModel
