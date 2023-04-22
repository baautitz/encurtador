import mongoose, { Schema } from "mongoose"

const LinkSchema = new Schema({
    name: String,
    link: String,
    author: String,
}, { timestamps: true })

const Link = mongoose.models.Link || mongoose.model("Link", LinkSchema)

export default Link