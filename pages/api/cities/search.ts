import { API_URL } from '../../../config'
import type { NextApiRequest, NextApiResponse } from 'next'

const ENDPOINT = `${API_URL}/cities/search`

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    res.status(200).json({
      message: 'Not implemented yet'
    })
  } else if (req.method === 'GET') {
    const { q } = req.query
    const url = `${ENDPOINT}?q=${q}`
    const reponse = await fetch(url)
    const data = await reponse.json()
    res.status(200).json(data)
  }
}
