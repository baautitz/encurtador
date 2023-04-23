import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnection from '../../../services/DbConnection'
import Link from '../../../models/Link'

dbConnection()

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const link = req.url?.replace("/api/links/", "")
  const findedLink = await Link.find({ name: link })

  if (!findedLink[0]) {
    res.status(404).json({ error: `Link '${link}' not found.` })
    return;
  }

  res.status(200).json(findedLink[0])
}