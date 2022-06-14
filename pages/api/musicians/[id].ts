import { API_URL } from '../../../config'
import type { NextApiRequest, NextApiResponse } from 'next'

const ENDPOINT = `${API_URL}/musicians`

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { id } = req.query
    const reponse = await fetch(`${ENDPOINT}/${id}`)
    const data = await reponse.json()
    data.image = `${API_URL}/files/${data.image}`
    res.status(200).json(data)
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    const reponse = await fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE'
    })
    const data = await reponse.json()
    res.status(200).json(data)
  } else if (req.method === 'PUT') {
    const { id } = req.query
    const body = req.body
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    res.status(200).json(data)
  } else {
    res.status(200).json({
      message: 'Not implemented yet'
    })
  }
}
