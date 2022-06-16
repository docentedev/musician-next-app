import nextConnect from 'next-connect'
import request from 'request'
import fs from 'fs'
import { API_URL } from '../../../../../config'
import middleware from '../../../../../utils/middleware'

const ENDPOINT = `${API_URL}/files`
const handler = nextConnect()

handler.use(middleware)
handler.post(async (req: any, res: any) => {
  try {
    const imagePath = req.files.file[0].path
    const formData = {
      id: req.body.id,
      file: fs.createReadStream(imagePath)
    }

    request.post({ url: ENDPOINT, formData, headers: {
      authorization: req.headers.authorization
    } }, function optionalCallback (err, _httpResponse, body) {
      if (err) {
        console.error('upload failed:', err)
        res.status(500).json({ error: err })
        return
      }
      console.log('Upload successful!  Server responded with:', body)
      res.status(200).json(JSON.parse(body))
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
