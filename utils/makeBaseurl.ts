const makeBaseurl = (req: any) => {
  const host = req ? req.headers.host : window.location.host
  const isSecure = req.headers['x-forwarded-proto'] === 'https'
  const protocol = isSecure ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`
  return baseUrl
}
export default makeBaseurl
