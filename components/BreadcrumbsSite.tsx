import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import styles from './BreadcrumbsSite.module.css'

type BreadcrumbsSiteProps = {
    urls: Array<{ text: string, url: string }>
}

const BreadcrumbsSite = ({ urls }: BreadcrumbsSiteProps) => {
  return (
        <div className={styles.container}>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextIcon fontSize="small" />}
            >
                {urls.map((url, index, list) => {
                  const isLast = index === list.length - 1
                  return isLast
                    ? (
                            <Typography color="text.primary" key={index}>{url.text}</Typography>
                      )
                    : (
                            <NextLink key={index} href={url.url}>
                                <MUILink underline="hover" color="inherit">
                                    {url.text}
                                </MUILink>
                            </NextLink>)
                })
                }
            </Breadcrumbs>
        </div>
  )
}

export default BreadcrumbsSite
