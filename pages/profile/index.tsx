import { useEffect, useState } from 'react'
import { CardContent, Card, Grid, Chip, Typography, Box, CardActions } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import BreadcrumbsSite from '../../components/BreadcrumbsSite'
import { useAuth, useIsAuth } from '../../contexts/AuthContext'
import routes from '../../config/routes'
import { Alert, Button, CircularProgress, Collapse, IconButton } from '@mui/material'
import CustomTextField from '../../components/CustomField'
import { AccountBox, Save, Close as CloseIcon, Key as KeyIcon } from '@mui/icons-material'

const Profile = () => {
    const auth = useAuth()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [data, setData] = useState({
        id: '',
        username: '',
        email: '',
    })
    const isLogin = useIsAuth()

    useEffect(() => {
        if (auth.data.token.id && data.id === '') {
            (async () => {
                try {
                    const res = await fetch(`/api/profiles`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.data.token.jwt}`
                        },
                    })
                    const data = await res.json()
                    setData(data)
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [auth.data.token.id, auth.data.token.jwt, data])

    const handleChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSave = async (event: any) => {
        event.preventDefault()
        try {
            await fetch(`/api/users/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.data.token.jwt}`
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                })
            })
            setOpenSuccess(true)
            setTimeout(() => {
                setOpenSuccess(false)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    return data.id !== '' && isLogin
        ? (
            <>
                <BreadcrumbsSite urls={[
                    { text: 'Home', url: (routes.home()) },
                    { text: 'Profile', url: (routes.profile()) }
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
                            <Grid item>
                                <Collapse in={openSuccess}>
                                    <Alert
                                        action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => setOpenSuccess(false)}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                        }>Saved successfully
                                    </Alert>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title="Roles" avatar={<KeyIcon />} />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                {Array.isArray(auth.data.token.roles) && auth.data.token.roles.map((role: string, i: number) => (
                                    <Chip key={i} label={role} style={{ margin: '1rem 1rem 1rem 0' }} />
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </>
        ) : (<CircularProgress />)
}

export default Profile
