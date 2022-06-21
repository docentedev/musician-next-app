import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import DeleteForever from '@mui/icons-material/DeleteForever'
import { useRouter } from 'next/router'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import makeBaseurl from '../../../utils/makeBaseurl'
import MusicianForm from '../../../components/MusicianForm'
import UploadMusicianAvatar from '../../../components/UploadMusicianAvatar'
import { useAuth, useIsAuth } from '../../../contexts/AuthContext'
import routes from '../../../config/routes'
import { CircularProgress } from '@mui/material'
import { LibraryMusic } from '@mui/icons-material'

const Musician = ({ initialData }: any) => {
  const auth = useAuth()
  const [openSuccess, setOpenSuccess] = useState(false)
  const [data, setData] = useState(initialData)
  const router = useRouter()

  const isLogin = useIsAuth(['admin'])

  const handleSave = async () => {
    const response = await fetch(`/api/musicians/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.data.token.jwt}`
      },
      body: JSON.stringify(data)
    })
    if (response.status === 200) {
      setOpenSuccess(true)
      setTimeout(() => {
        setOpenSuccess(false)
        router.push(routes.adminMusicians())
      }, 1000)
    }
  }

  const handleSaveAvatar = () => {
    setOpenSuccess(true)
    setTimeout(() => {
      setOpenSuccess(false)
      router.push(routes.adminMusicians())
    }, 1000)
  }

  const handleDelete = async () => {
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
        router.push(routes.adminMusicians())
      }, 1000)
    }
  }

  return data && isLogin
    ? (
      <div>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: (routes.home()) },
          { text: 'Musicians', url: (routes.adminMusicians()) },
          { text: data.id, url: (routes.adminMusician(data.id)) }
        ]} />
        <Grid>
          <Grid item xs={12}>
            <Card style={{ marginBottom: 10 }}>
              <CardContent>
                <UploadMusicianAvatar id={data.id} image={data.image} onSave={handleSaveAvatar} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={{ marginBottom: 10 }}>
              <CardHeader
                title="Musician"
                avatar={<LibraryMusic />}
                action={<Button variant="contained" color="error" startIcon={<DeleteForever />} onClick={handleDelete}>Delete</Button>}
              />
              <CardContent>
                <MusicianForm
                  data={data}
                  onSave={handleSave}
                  setData={setData}
                  openSuccess={openSuccess}
                  setOpenSuccess={setOpenSuccess}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    ) : (<CircularProgress />)
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
