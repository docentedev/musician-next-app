import { useState } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import MusicianForm from '../../../components/MusicianForm'

const Musician = ({ initialData }: any) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [data, setData] = useState(initialData)
  const router = useRouter()

  const handlerSave = async () => {
    const response = await fetch('/api/musicians', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await response.json()
    console.log(json)
    if (response.status === 201) {
      setOpenSuccess(true)
      setTimeout(() => {
        setOpenSuccess(false)
        // redirect to list
        router.push('/musicians')
      }, 3000)
    }
  }

  return data
    ? (
      <div>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: '/' },
          { text: 'Musicians', url: '/musicians' },
          { text: 'Create', url: '/musicians/create' }
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
    : (
      <div>Loading...</div>
      )
}

export async function getServerSideProps ({ query, req }: any) {
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
        city_fk: 0
      }
    }
  }
}

export default Musician
