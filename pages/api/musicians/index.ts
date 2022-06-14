import { API_URL } from '../../../config'
import type { NextApiRequest, NextApiResponse } from 'next'

const ENDPOINT = `${API_URL}/musicians`

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const data = await response.json()
    res.status(201).json(data)
  } else if (req.method === 'GET') {
    try {
      const { page, size, order, sort } = req.query
      const url = `${ENDPOINT}?page=${page}&size=${size}&order=${order}&sort=${sort}`
      const reponse = await fetch(url)
      const data = await reponse.json()
      const rows = data.rows.map((item: any) => {
        item.image = `${API_URL}/files/${item.image}`
        return item
      })
      res.status(200).json({
        rows,
        count: data.count
      })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  }
}
