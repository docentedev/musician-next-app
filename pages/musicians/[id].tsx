import { useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import DeleteForever from '@mui/icons-material/DeleteForever'
import { useRouter } from 'next/router'
import BreadcrumbsSite from '../../components/BreadcrumbsSite'
import makeBaseurl from '../../utils/makeBaseurl'
import MusicianForm from '../../components/MusicianForm'
import UploadMusicianAvatar from '../../components/UploadMusicianAvatar'
import { useAuth } from '../../contexts/AuthContext'

const Musician = ({ initialData }: any) => {
  const auth = useAuth()
  const [openSuccess, setOpenSuccess] = useState(false)
  const [data, setData] = useState(initialData)
  const router = useRouter()

  const authCheck = useCallback(() => {
    if (auth.data.isLogin === null) return
    if (!auth.data.isLogin) router.push('/')
  }, [auth.data, router])

  useEffect(() => {
    authCheck()
  }, [authCheck])

  const handlerSave = async () => {
    const response = await fetch(`/api/musicians/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.data.token.jwt}`
      },
      body: JSON.stringify(data)
    })
    // const json = await response.json()
    if (response.status === 200) {
      setOpenSuccess(true)
      setTimeout(() => {
        setOpenSuccess(false)
        router.push('/musicians')
      }, 1000)
    }
  }

  const handlerSaveAvatar = () => {
    setOpenSuccess(true)
    setTimeout(() => {
      setOpenSuccess(false)
      router.push('/musicians')
    }, 1000)
  }

  const handlerDelete = async () => {
    const response = await fetch(`/api/musicians/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.data.token.jwt}`
      },
    })
    await response.json()
    if (response.status === 200) {
      setOpenSuccess(true)
      setTimeout(() => {
        setOpenSuccess(false)
        router.push('/musicians')
      }, 1000)
    }
  }

  return auth.data.isLogin && data
    ? (
      <div>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: '/' },
          { text: 'Musicians', url: '/musicians' },
          { text: data.id, url: '/musicians' }
        ]} />
        <Grid>
          <Grid item xs={12}>
            <Card style={{ marginBottom: 10 }}>
              <CardContent>
                <UploadMusicianAvatar id={data.id} image={data.image} onSave={handlerSaveAvatar} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={{ marginBottom: 10 }}>
              <CardHeader
                title="Musicians"
                action={
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteForever />}
                    onClick={handlerDelete}
                  >Delete</Button>}
              />
              <CardContent>
                <MusicianForm
                  data={data}
                  onSave={handlerSave}
                  setData={setData}
                  openSuccess={openSuccess}
                  setOpenSuccess={setOpenSuccess}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    ) : (<div>Loading...</div>)
}

export async function getServerSideProps({ query, req }: any) {
  try {
    const baseUrl = makeBaseurl(req)
    const id = query.id
    const res = await fetch(`${baseUrl}/api/musicians/${id}`)
    const json = await res.json()
    return { props: { initialData: json } }
  } catch (error) {
    return { props: { initialData: null, error } }
  }
}

export default Musician
