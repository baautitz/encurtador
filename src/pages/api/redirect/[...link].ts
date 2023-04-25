import Api from '../../../services/Api';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const link = req.url!.replace("/api/redirect/", "").replace("/", "");


  try {
    const findedLink = await Api(`/links/${link}`)
    res.redirect(findedLink.data.link).end()
  } catch (error: any) {
    res.redirect("/home")
  }

}