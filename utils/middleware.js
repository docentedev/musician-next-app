import nextConnect from 'next-connect'
import multiparty from 'multiparty'

const middleware = nextConnect()

middleware.use(async (req, res, next) => {
  const form = new multiparty.Form()
  await form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err)
      return
    }
    req.body = fields
    req.files = files
    next()
  })
})

export default middleware
