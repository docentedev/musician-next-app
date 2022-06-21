import * as React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Logout, AccountBox } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import routes from '../config/routes'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import styles from './Layout.module.css'

const ButtonAppBar = () => {
    const router = useRouter()
    const auth = useAuth()
    const handleLogout = () => {
        auth.setData({ key: 'logout', value: false })
        router.push(routes.home())
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        className={`${styles.logo} ${auth.data.isLogin ? styles.login : styles.anonymous}`}
                    >
                        <Link href={routes.home()}>
                            Musician
                        </Link>
                    </Typography>
                    {auth.data.isLogin ? (
                        <>
                            <Link href={routes.profile()}>
                                <IconButton>
                                    <AccountBox />
                                </IconButton>
                            </Link>
                            <IconButton color="error" onClick={handleLogout}>
                                <Logout />
                            </IconButton>
                        </>
                    ) : (
                        <Link href={routes.authLogin()}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default ButtonAppBar
