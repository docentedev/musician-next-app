import type { NextPage } from 'next'
import Head from 'next/head'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import BreadcrumbsSite from '../components/BreadcrumbsSite'
import styles from '../styles/Home.module.css'
import makeBaseurl from '../utils/makeBaseurl'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

// card auto height
function MusicianCard ({ musician }: any) {
  return (
    <Card style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="180"
        image={musician.image}
        onError={(e: any) => {
          e.target.src = 'https://via.placeholder.com/150?text=No+Image'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {musician.first_name} {musician.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {musician.alias.split(',').map((alias: string) => alias.trim()).join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

const Home: NextPage = ({ initialData }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Index</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: '/' }
        ]} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {initialData.rows.map((musician: any) => (
              <Grid item xs={6} sm={4} md={4} lg={3} key={musician.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'space-around',
                alignItems: 'center'
              }}>
                <Item style={{ width: '100%', height: '100%' }}>
                  <MusicianCard musician={musician} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  )
}

export async function getServerSideProps ({ query, req }: any) {
  try {
    const baseUrl = makeBaseurl(req)
    const res = await fetch(`${baseUrl}/api/musicians?size=100&page=1&order=id&sort=asc`)
    const json = await res.json()
    return { props: { initialData: json } }
  } catch (error) {
    return { props: { initialData: null, error } }
  }
}

export default Home