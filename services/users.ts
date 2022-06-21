import type { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_API_URL } from '../config'
import getClient from '../utils/getClient'

const users = (req: NextApiRequest, res: NextApiResponse<any>) => {
    const client = getClient(req, `${AUTH_API_URL}/users`)
    const getAllUsers = async () => {
        try {
            const { page, size, order, sort } = req.query
            const url = `?page=${page}&size=${size}&order=${order}&sort=${sort}`
            const response = await client.get({ url })
            const rows = response.data.rows
            res.status(response.status).json({ rows, count: response.data.count })
        } catch (error: any) {
            res.status(500).json({ error: JSON.parse(error.message) })
        }
    }
    const getUser = async () => {
        try {
            const { data, status } = await client.get({ url: `/${req.query.id}` })
            res.status(status).json(data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    const getProfile = async () => {
        try {
            const { data, status } = await client.get({ url: '/profile' })
            res.status(status).json(data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    const updateUser = async () => {
        try {
            const { data, status } = await client.put({ url: `/${req.query.id}` })
            res.status(status).json(data)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
    return {
        getUser,
        updateUser,
        getProfile,
        getAllUsers,
    }
}

export default users