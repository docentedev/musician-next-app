import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL } from '../config'
import getClient from '../utils/getClient'

const imageUrl = (item: any) => ({ ...item, image: `${API_URL}/files/${item.image}` })
const musicians = (req: NextApiRequest, res: NextApiResponse<any>) => {
    const client = getClient(req, `${API_URL}/musicians`)
    const getAllMusicians = async () => {
        try {
            const { page, size, order, sort } = req.query
            const url = `?page=${page}&size=${size}&order=${order}&sort=${sort}`
            const response = await client.get({ url })
            const rows = response.data.rows.map((item: any) => imageUrl(item))
            res.status(response.status).json({ rows, count: response.data.count })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    const createMusician = async () => {
        try {
            const response = await client.post()
            res.status(response.status).json(response.data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    const getMusician = async () => {
        try {
            const { data, status } = await client.get({ url: `/${req.query.id}` })
            res.status(status).json(imageUrl(data))
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    const deleteById = async () => {
        try {
            const { data, status } = await client.delete({ url: `/${req.query.id}` })
            res.status(status).json(data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    const updateMusician = async () => {
        try {
            const { data, status } = await client.put({ url: `/${req.query.id}`, method: 'PUT' })
            res.status(status).json(data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    return {
        getMusician,
        createMusician,
        getAllMusicians,
        deleteById,
        updateMusician,
    }
}

export default musicians