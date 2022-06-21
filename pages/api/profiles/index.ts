import type { NextApiRequest, NextApiResponse } from 'next'
import profilesService from '../../../services/profiles'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const client = profilesService(req, res)
    if (req.method === 'GET') {
        await client.getProfile()
    } else {
        res.status(200).json({ message: 'Not implemented yet' })
    }
}
