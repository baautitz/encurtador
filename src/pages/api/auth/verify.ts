import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid';

import { loggedUsers } from './index';

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {

    const id = req.headers["id"]
    const user = loggedUsers.find((user: any) => user.id == (id || ""))

    if (!user) {
        return res.status(401).json({ error: "Invalid token" })
    }

    const findedUser = loggedUsers.find((u: any) => u.id == user.id)
    
    res.status(200).json(findedUser)
}
