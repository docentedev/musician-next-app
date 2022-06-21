import type { NextApiRequest, NextApiResponse } from 'next'
import usersService from '../../../services/users'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const client = usersService(req, res)
    if (req.method === 'GET') {
        await client.getUser()
    } else if (req.method === 'PUT') {
        await client.updateUser()
    } else {
        res.status(200).json({ message: 'Not implemented yet' })
    }
}
