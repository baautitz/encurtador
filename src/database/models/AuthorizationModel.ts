import mongoose, { Model, Schema } from "mongoose"

type Authorization = {
	id: string
	username: string
	authorization: string
	lastUsed: Date
	createdAt: Date
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
		createdAt: { type: Date, default: Date.now, expires: '30d' }
	},
	{ timestamps: true }
)

const AuthorizationModel: Model<Authorization> =
	mongoose.models.AuthorizationModel ||
	mongoose.model("AuthorizationModel", AuthorizationSchema, "authorizations")

export type { Authorization }
export default AuthorizationModel
