// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  uptime: number,
  message: string,
  date: Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }
  res.status(200).json(data)
}
