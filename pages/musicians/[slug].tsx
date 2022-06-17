import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import BreadcrumbsSite from '../../components/BreadcrumbsSite'
import makeBaseurl from '../../utils/makeBaseurl'
import routes from '../../config/routes'
import { Box, Typography, CardMedia, CircularProgress } from '@mui/material'
import dateToMMDDYYYY from '../../utils/dateToMMDDYYYY'
import styles from './styles.module.css'
import Alias from '../../components/Alias'
import Head from 'next/head'

const Musician = ({ initialData: data }: any) => {
    return data
        ? (
            <div>
                <Head>
                    <title>Musician CL {data.first_name} {data.last_name}</title>
                    <meta name="description" content="Musician CL" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <BreadcrumbsSite urls={[
                    { text: 'Home', url: (routes.home()) },
                    { text: `${data.first_name} ${data.last_name}`, url: (routes.adminMusician(data.id)) }
                ]} />
                <Grid>
                    <Grid item xs={12}>
                        <Card className={styles.card}>
                            <CardMedia
                                component="img"
                                sx={{ width: 200 }}
                                image={data.image}
                                alt={`${data.first_name} ${data.last_name}`}
                                onError={(e: any) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {data.first_name} {data.last_name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        <Alias alias={data.alias} />
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                                        {data.birth_date && (<Typography variant="body2" color="text.secondary">{dateToMMDDYYYY(data.birth_date)}</Typography>)}
                                        {data.death_date && (<Typography variant="body2" color="text.secondary" marginLeft={1} marginRight={1}>-</Typography>)}
                                        {data.death_date && (<Typography variant="body2" color="text.secondary">{dateToMMDDYYYY(data.death_date)}</Typography>)}
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                                        {data.city_name && (<Typography variant="body2" color="text.secondary">{data.city_name}</Typography>)}
                                        <Typography variant="body2" color="text.secondary" marginLeft={1} />
                                        {data.country_name && (<Typography variant="body2" color="text.secondary">{data.country_name}</Typography>)}
                                    </Box>
                                </CardContent>
                            </Box>
                        </Card>
                        <div className={styles.divider} />
                        {data.description && (<Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                                    <Typography variant="body1" color="text.primary">{data.description}</Typography>
                                </Box>
                            </CardContent>
                        </Card>)}
                    </Grid>
                </Grid>
            </div>
        ) : (<CircularProgress />)
}

export async function getServerSideProps({ query, req }: any) {
    try {
        const baseUrl = makeBaseurl(req)
        const id = query.slug.split('_').reverse()[0]
        const res = await fetch(`${baseUrl}/api/musicians/${id}`)
        const json = await res.json()
        return { props: { initialData: json } }
    } catch (error) {
        return { props: { initialData: null, error } }
    }
}

export default Musician
