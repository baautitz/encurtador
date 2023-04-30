import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid';

import UsersDB from "../../../../users.json"

const loggedUsers: any = []

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            const user: any = UsersDB.find(user => user.username == (req.body["username"] || "") && user.password == (req.body["password"] || ""))

            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" })
            }

            const id = uuid()

            loggedUsers.push({ id, user })
            res.status(200).json(loggedUsers.find((u: { id: string; }) => u.id == id))
            break;
        default:
            res.status(405).json({ error: "Method Not Allowed" })
    }

}

export { loggedUsers }