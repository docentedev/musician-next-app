import type { NextApiRequest, NextApiResponse } from 'next'
import musiciansService from '../../../services/musicians'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const client = musiciansService(req, res)
  if (req.method === 'GET') {
    await client.getMusician()
  } else if (req.method === 'DELETE') {
    await client.deleteById()
  } else if (req.method === 'PUT') {
    await client.updateMusician()
  } else {
    res.status(200).json({ message: 'Not implemented yet' })
  }
}
