import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnection from '../../../services/DbConnection'
import Link from '../../../models/Link'
import Api from '../../../services/Api'

dbConnection()

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    let { name, link } = req.body
    
    switch (req.method) {
        case "GET":
            const findedLinks = await Link.find({}).sort({ createdAt: -1 })
            res.status(200).json(findedLinks)
            break
        case "POST":
            try {
                const rg = /(['^A-Za-z0-9].*)/g
            
                name = name.replaceAll(" ", "")
                link = link.replaceAll(" ", "")
            
                name = name.match(rg)[0]

                const createdLink = await Link.create({ name, link })
                res.status(201).json({ message: "Created", createdLink })
            } catch (error: any) {
                res.status(400).json(error)
            }
            break;
        default:
            res.status(405).json({ error: "Method Not Allowed" })
    }

}