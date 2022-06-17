import { useState } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import BreadcrumbsSite from '../../../../components/BreadcrumbsSite'
import MusicianForm from '../../../../components/MusicianForm'
import { useAuth, useIsAuth } from '../../../../contexts/AuthContext'
import routes from '../../../../config/routes'
import { CircularProgress } from '@mui/material'

const Musician = ({ initialData }: any) => {
  const auth = useAuth()
  const [openSuccess, setOpenSuccess] = useState(false)
  const [data, setData] = useState(initialData)
  const router = useRouter()

  const isLogin = useIsAuth()

  const handlerSave = async () => {
    const response = await fetch('/api/musicians', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.data.token.jwt}`
      },
      body: JSON.stringify(data)
    })
    if (response.status === 201) {
      setOpenSuccess(true)
      setTimeout(() => {
        setOpenSuccess(false)
        router.push(routes.adminMusicians())
      }, 3000)
    }
  }

  return data && isLogin
    ? (
      <div>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: (routes.home()) },
          { text: 'Musicians', url: (routes.adminMusicians()) },
          { text: 'Create', url: (routes.adminMusicianCreate()) }
        ]} />
        <Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: 10, marginBottom: 10 }}>
              <MusicianForm
                data={data}
                onSave={handlerSave}
                setData={setData}
                openSuccess={openSuccess}
                setOpenSuccess={setOpenSuccess}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} style={{ display: 'none' }}>
            <Paper style={{ padding: 10 }}>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
    : (<CircularProgress />)
}

export async function getServerSideProps({ query, req }: any) {
  return {
    props: {
      initialData: {
        id: '',
        first_name: '',
        last_name: '',
        second_last_name: '',
        second_name: '',
        birth_date: null,
        death_date: null,
        city_name: '',
        country_name: '',
        alias: '',
        city_fk: 0,
        description: '',
      }
    }
  }
}

export default Musician
