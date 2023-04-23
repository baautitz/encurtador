import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnection from '../../../services/DbConnection'
import Link from '../../../models/Link'

dbConnection()

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const findedLinks = await Link.find({})
            res.status(200).json(findedLinks)
            break
        case "POST":

            break;
        case "DELETE":

            break;
        case "PUT":

            break
        default:
            res.status(405).json({error: "Method Not Allowed"})
    }

}