import mongoose, { Schema } from "mongoose"

const LinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    author: String,
}, { timestamps: true })

const Link = mongoose.models.Link || mongoose.model("Link", LinkSchema)

export default Link