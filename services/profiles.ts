import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_API_URL } from '../config'
import getClient from '../utils/getClient'

const profiles = (req: NextApiRequest, res: NextApiResponse<any>) => {
    const client = getClient(req, `${AUTH_API_URL}/profiles`)
    const getProfile = async () => {
        try {
            const { data, status } = await client.get()
            res.status(status).json(data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    return {
        getProfile,
    }
}

export default profiles