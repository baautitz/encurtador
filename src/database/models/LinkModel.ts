import mongoose, { Model, Schema } from "mongoose"

type Link = {
	id: string
	name: string
	link: string
	origin: string
	author?: string
	createdAt?: string
	updatedAt?: string
}

const LinkSchema = new Schema<Link>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		link: {
			type: String,
			required: true,
		},
		author: String,
		origin: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

const LinkModel: Model<Link> =
	mongoose.models.LinkModel || mongoose.model("LinkModel", LinkSchema, "links")

export type { Link }
export default LinkModel
