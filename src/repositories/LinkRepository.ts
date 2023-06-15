import dbConnection from "@/database/DbConnection"
import LinkModel, { Link } from "@/database/models/LinkModel"

dbConnection()

class LinkRepository {
	static async getAllLinks(): Promise<Link[] | null> {
		const links = await LinkModel.find().sort({ createdAt: -1 })

		if (!links) return null

		return links as Link[]
	}

	static async getByName(name: string): Promise<Link | null> {
		const link = (await LinkModel.find({ name }))[0]

		if (!link) return null

		return link as Link
	}

	static async create(link: Link): Promise<Link> {
		const createdLink = await LinkModel.create(link)
		return createdLink
	}

	static async update(name: string, linkToUpdate: Link): Promise<Link | null> {
		const link = (await this.getByName(name)) as Link

		if (!link) return null

		Object.assign(link, {
			name: linkToUpdate.name,
			link: linkToUpdate.link,
		})

		await LinkModel.updateOne({ name: link.name }, link)
        const updatedLink = (await this.getByName(name)) 
        
		return updatedLink as Link
	}

	static async delete(name: string): Promise<boolean> {
		await LinkModel.deleteOne({ name })
		return true
	}
}

export default LinkRepository
