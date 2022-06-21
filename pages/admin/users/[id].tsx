import { useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { AccountBox, Key as KeyIcon, Save } from '@mui/icons-material'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import routes from '../../../config/routes'
import { useAuth, useIsAuth } from '../../../contexts/AuthContext'
import { Button, Card, CardContent, CardHeader, Chip, CircularProgress } from '@mui/material'
import CustomTextField from '../../../components/CustomField'
import { useRouter } from 'next/router'

const Musician = () => {
  const router = useRouter()
  const isLogin = useIsAuth(['admin'])
  const auth = useAuth()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    id: '',
    roles: [],
  })

  const handleGet = useCallback(async () => {
    if (data.id === '' && id) {
      setLoading(true)
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.data.token.jwt}`
        }
      })
      if (response.status === 200) {
        const result = await response.json()
        setLoading(false)
        setData(result)
      }
    }
  }, [auth.data.token.jwt, data, id])

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSave = (event: any) => {
    event.preventDefault()
  }

  useEffect(() => {
    (async () => {
      await handleGet()
    })()
  }, [handleGet])

  return !loading && data && isLogin
    ? (
      <>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: routes.home() },
          { text: 'Users', url: routes.adminUsers() },
          { text: data.id, url: routes.adminUser(data.id) }
        ]} />
        <Card onSubmit={handleSave} component="form" noValidate autoComplete="off" style={{ marginBottom: 10 }}>
          <CardHeader title="Profile" avatar={<AccountBox />} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField label="Username" name="username" model={data} onChange={handleChange} required />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField label="Email" name="email" type="email" model={data} onChange={handleChange} required />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="success" type="submit" size="large" endIcon={<Save />}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Roles" avatar={<KeyIcon />} />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                {Array.isArray(data.roles) && data.roles.map((r: any) => r.name).map((role: string, i: number) => (
                  <Chip key={i} label={role} style={{ margin: '1rem 1rem 1rem 0' }} />
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    )
    : (
      <CircularProgress />
    )
}

export default Musician
