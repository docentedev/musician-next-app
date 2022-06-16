import type { NextApiRequest } from 'next'

type Options = {
    url?: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

const headersDefault = (req: NextApiRequest) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            authorization: req.headers.authorization || ''
        }
    }
}

const getClient = (req: NextApiRequest, baseUrl: string) => {
    const client = async (options: Options) => {
        const body = req.body ? JSON.stringify(req.body) : false
        const opts: any = {
            method: options.method || 'GET',
            ...headersDefault(req)
        }
        if (body) { opts.body = body }
        if (!options.url) { options.url = '' }
        const response = await fetch(`${baseUrl}${options.url}`, opts)
        if (response.status === 200 || response.status === 201) {
            const data = await response.json()
            const model = { data, status: response.status }
            return model
        } else {
            throw new Error(JSON.stringify({
                message: response.text,
                status: response.status,
            }))
        }
    }
    return {
        get: async (options?: Options) => await client({ ...options, method: 'GET' }),
        post: async (options?: Options) => await client({ ...options, method: 'POST' }),
        put: async (options?: Options) => await client({ ...options, method: 'PUT' }),
        delete: async (options?: Options) => await client({ ...options, method: 'DELETE' }),
    }
}

export default getClient
