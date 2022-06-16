import type { NextApiRequest, NextApiResponse } from 'next'
import musiciansService from '../../../services/musicians'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = musiciansService(req, res)
  if (req.method === 'POST') {
    await client.createMusician()
  } else if (req.method === 'GET') {
    await client.getAllMusicians()
  }
}
