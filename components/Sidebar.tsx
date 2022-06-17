import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Menu from '@mui/icons-material/Menu'
import styles from './Layout.module.css'
import { useAuth } from '../contexts/AuthContext'
import routes from '../config/routes'
import { IconButton } from '@mui/material'

const ItemLink = ({ currentUrl, text, url, exact = true }: any) => {
    return (
        <Link href={url}>
            <a className={styles.resetLink}>
                <MenuItem
                    selected={exact ? currentUrl === url : currentUrl.startsWith(url)}
                >
                    <ListItemIcon>
                        {(exact ? currentUrl === url : currentUrl.startsWith(url)) && <ArrowRightIcon fontSize="small" />}
                    </ListItemIcon>
                    <Typography variant="inherit">{text}
                    </Typography>
                </MenuItem>
            </a>
        </Link>)
}

export default function Sidebar() {
    const [open, setOpen] = React.useState(false)
    const auth = useAuth()
    const router = useRouter()

    return (
        <div className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
            <IconButton
                color="inherit"
                aria-label="menu"
                className={styles.sidebarButton} onClick={() => setOpen(!open)}>
                <Menu />
            </IconButton>
            <Paper>
                <MenuList>
                    <ItemLink currentUrl={router.pathname} text="Home" url={routes.home()} />
                    {auth.data.isLogin && <ItemLink currentUrl={router.pathname} text="Cities" url={routes.adminCities()} exact={false} />}
                    {auth.data.isLogin && <ItemLink currentUrl={router.pathname} text="Musicians" url={routes.adminMusicians()} exact={false} />}
                </MenuList>
            </Paper>
        </div >
    )
}
