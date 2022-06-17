import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InputIcon from '@mui/icons-material/Input'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import CustomTextField from '../../../components/CustomField'
import routes from '../../../config/routes'
import { useAuth } from '../../../contexts/AuthContext'

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const router = useRouter()
  const auth = useAuth()

  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const json = await response.json()
      auth.setData({ key: 'token', value: json.token })
      console.log(json)
      router.push(routes.adminMusicians())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <BreadcrumbsSite urls={[
        { text: 'Home', url: '/' },
        { text: 'Login', url: '/login' }
      ]} />
      <Card>
        <CardHeader
          title="Login"
        />
        <CardContent>
          <form onSubmit={handleLogin}>
            <CustomTextField
              model={user} required name="username" label="Username" onChange={handleChange}
            />
            <CustomTextField
              model={user} required name="password" type="password" label="Password" onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<InputIcon />}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}

export default Login
