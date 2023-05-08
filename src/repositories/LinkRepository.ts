import dbConnection from "@/database/DbConnection";
import LinkModel, { Link } from "@/database/models/LinkModel";

dbConnection()

class LinkRepository {

    static async getAllLinks(): Promise<Link[] | null> {
        const links = await LinkModel.find().sort({ createdAt: -1 })
        
        if (!links) return null;
    
        return <Link[]> links 
    }
    
    static async getByName(name: string): Promise<Link | null> {
        const link = (await LinkModel.find({ name }))[0]
    
        if (!link) return null;
    
        return <Link> link
    }
    
}

export default LinkRepository