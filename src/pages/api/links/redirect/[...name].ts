import LinkRepository from '@/repositories/LinkRepository';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const link = req.url!.replace("/api/links/redirect/", "").replace("/", "");
  const findedLink = await LinkRepository.getByName(link)

  if (!findedLink) res.redirect("/")
  else res.redirect(findedLink.link)
}