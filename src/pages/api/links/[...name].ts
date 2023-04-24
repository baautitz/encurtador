import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnection from '../../../services/DbConnection'
import Link from '../../../models/Link'

dbConnection()

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const link = decodeURI(req.url!.replace("/api/links/", ""))
  const findedLink = (await Link.find({ name: link }))[0]
  

  if (!findedLink) {
    res.status(404).json({ error: `Link '${link}' not found.` })
    return;
  }

  if (req.method == "GET") {
    res.status(200).json(findedLink)
  } else if (req.method == "DELETE") {
    try {
      const linkId = findedLink["_id"]
      await Link.deleteOne({ "_id": linkId })
      res.status(200).json({ message: `Link '${findedLink.name}' deleted.` })
    }
    catch (error: any) {
      console.log(error)
      res.status(400).json(error)
    }
  }

}