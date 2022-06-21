import type { NextApiRequest, NextApiResponse } from 'next'
import usersService from '../../../services/users'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = usersService(req, res)
  if (req.method === 'GET') {
    await client.getAllUsers()
  }
}
