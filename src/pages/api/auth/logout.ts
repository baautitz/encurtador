import type { NextApiRequest, NextApiResponse } from 'next'

import LoggedUser from '@/entities/LoggedUser';

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") return res.status(405).json({ error: "Method Not Allowed" })
    
    const token = req.body['token']
    if (!token) return res.status(200).json(false)

    res.status(200).json(LoggedUser.removeUser(token))
}