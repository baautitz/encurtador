import mongoose, { Model, Schema } from "mongoose"

type User = {
	id: string
	username: string
	password: string
	fullName: string
	avatar: string
}

const UserSchema = new Schema<User>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: String,
		fullName: String,
		avatar: String,
	},
	{ timestamps: true }
)

const UserModel: Model<User> =
	mongoose.models.UserModel || mongoose.model("UserModel", UserSchema, "users")

export type { User }
export default UserModel
