import { API_URL } from '../../../config'
import type { NextApiRequest, NextApiResponse } from 'next'

const ENDPOINT = `${API_URL}/cities`

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { id } = req.query
    const reponse = await fetch(`${ENDPOINT}/${id}`)
    const data = await reponse.json()
    res.status(200).json(data)
  } else {
    res.status(200).json({
      message: 'Not implemented yet'
    })
  }
}
