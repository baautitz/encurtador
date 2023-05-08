import type { NextApiRequest, NextApiResponse } from 'next'


export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
    // const token: string | undefined = req.headers["token"] as string | undefined

    // if (!token) return res.status(401).json({ error: "Please, provide a valid token" })

    // const user = LoggedUser.getUser(token)

    // if (!user) {
    //     return res.status(401).json({ error: "Invalid token" })
    // }

    // res.status(200).json(user)
}