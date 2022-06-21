import { Button, CircularProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InputIcon from '@mui/icons-material/Input'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import CustomTextField from '../../../components/CustomField'
import routes from '../../../config/routes'
import { parseJwt, useAuth, useRolesValidation } from '../../../contexts/AuthContext'
import styles from './index.module.css'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const router = useRouter()
  const auth = useAuth()
  const roleValidation = useRolesValidation()

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const json = await response.json()
      const tokenData = {
        token: parseJwt(json.token),
        isLogin: true,
      }
      auth.setData({ key: 'token', value: json.token })
      if (roleValidation(['admin'], tokenData)) {
        router.push(routes.adminMusicians())
      } else {
        router.push(routes.home())
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div>
      <BreadcrumbsSite urls={[
        { text: 'Home', url: '/' },
        { text: 'Login', url: '/login' }
      ]} />
      <div className={styles.container}>
        <Card>
          <CardHeader
            title="Login"
          />
          <CardContent>
            {loading ? (<CircularProgress />) : (<form onSubmit={handleLogin}>
              <CustomTextField
                model={user} required name="username" autoComplete="current-password" label="Username" onChange={handleChange}
              />
              <CustomTextField
                model={user} required name="password" autoComplete="current-password" type="password" label="Password" onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size='large'
                endIcon={<InputIcon />}
              >
                Login
              </Button>
            </form>)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
