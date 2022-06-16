import { AUTH_API_URL } from '../../../config'
import type { NextApiRequest, NextApiResponse } from 'next'

const ENDPOINT = `${AUTH_API_URL}/users/login`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const body = req.body
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        res.status(response.status).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}
