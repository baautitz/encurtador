import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid';

import LoggedUser from '@/entities/LoggedUser';

import UsersDB from "../../../../users.json"

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            const user: any = UsersDB.find(user => user.username == (req.body["username"] || "") && user.password == (req.body["password"] || ""))

            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" })
            }

            const token = uuid()
            const loggedUser = new LoggedUser({ token, username: user.username, name: user.name })

            res.status(200).json(LoggedUser.addUser(loggedUser))
            break;
        default:
            res.status(405).json({ error: "Method Not Allowed" })
    }

}