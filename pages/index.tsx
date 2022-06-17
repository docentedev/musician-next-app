import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import BreadcrumbsSite from '../components/BreadcrumbsSite'
import styles from '../styles/Home.module.css'
import makeBaseurl from '../utils/makeBaseurl'
import routes from '../config/routes'
import MusicianCard from '../components/MusicianCard'
import { useAuth } from '../contexts/AuthContext'

const Home: NextPage = ({ initialData }: any) => {
  const auth = useAuth()
  return (
    <div className={styles.container}>
      <Head>
        <title>Musician CL Home</title>
        <meta name="description" content="Musician CL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BreadcrumbsSite urls={[{ text: 'Home', url: routes.home() }]} />
        <Box
          className={`${styles.cardContainer} ${auth.data.isLogin ? styles.login : styles.anonymous}`}
        >
          <Grid container spacing={2}>
            {initialData.rows.map((musician: any) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={musician.id} className={styles.gridCardContainer}>
                <MusicianCard musician={musician} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  )
}

export async function getServerSideProps({ query, req }: any) {
  try {
    const baseUrl = makeBaseurl(req)
    const res = await fetch(`${baseUrl}/api/musicians?size=100&page=1&order=id&sort=asc`)
    const json = await res.json()
    if (json.error) return { props: { initialData: { rows: [], count: 0 }, error: JSON.parse(json.error) } }
    return { props: { initialData: json } }
  } catch (error) {
    console.log('>>> 2', error)
    return { props: { initialData: { rows: [], count: 0 }, error } }
  }
}

export default Home
