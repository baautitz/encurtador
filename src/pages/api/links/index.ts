import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnection from '../../../services/DbConnection'
import Link from '../../../models/Link' 

dbConnection()

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const findedLinks = await Link.find({}).sort({ createdAt: -1 })
            res.status(200).json(findedLinks)
            break
        case "POST":
            const { name, link } = req.body
            try {
                const createdLink = await Link.create({ name, link })
                res.status(201).json({ message: "Created", createdLink })
            } catch (error: any) {
                res.status(400).json(error)
            }
            break;
        case "DELETE":
            
            break;
        case "PUT":

            break
        default:
            res.status(405).json({ error: "Method Not Allowed" })
    }

}