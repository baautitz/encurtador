import type { NextApiRequest, NextApiResponse } from 'next'

import Link from '../../../database/models/LinkModel'
import LinkRepository from '@/repositories/LinkRepository'



const executeRequest: any = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const findedLinks = await LinkRepository.getAllLinks()
        res.status(200).json(findedLinks)
    },

    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        let { name, link } = req.body

        try {
            const rg = /[A-Za-z0-9]+([/]{0,1}[A-Za-z0-9-]+)*/g

            name = name.replaceAll(" ", "")
            link = link.replaceAll(" ", "")

            name = (name.match(rg)) ? name.match(rg)[0] : ""
            name = decodeURI(name)

            const createdLink = await Link.create({ name, link })
            res.status(201).json({ message: "Created", createdLink })
        } catch (error: any) {
            res.status(400).json(error)
        }
    }
}

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method || "";
    const requestFunction = executeRequest[method]

    if (!requestFunction) {
        res.status(405).json({ error: "Method Not Allowed" })
    }

    await requestFunction(req, res)
}