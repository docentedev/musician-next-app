import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import makeBaseurl from '../../../utils/makeBaseurl'
import routes from '../../../config/routes'
import { useIsAuth } from '../../../contexts/AuthContext'
import { CircularProgress } from '@mui/material'

const CustomTextField = ({ model, name, label, onChange }: any) => {
  return (
    <TextField
      label={label}
      name={name}
      value={model[name]}
      onChange={onChange}
      margin="normal"
      variant="outlined"
      required
      error={model[name] === ''}
    />
  )
}

const Musician = ({ initialData }: any) => {
  const [data, setData] = useState(initialData)

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const isLogin = useIsAuth()
  return data && isLogin
    ? (
      <div>
        <BreadcrumbsSite urls={[
          { text: 'Home', url: routes.home() },
          { text: 'Cities', url: routes.adminCities() },
          { text: data.id, url: routes.adminMusician(data.id) }
        ]} />
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: 10, marginBottom: 10 }}>
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
                <CustomTextField model={data} name="name" label="Name" onChange={handleChange} />
                <CustomTextField model={data} name="admin_name" label="Admin Name" onChange={handleChange} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: 10 }}>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
    : (
      <CircularProgress />
    )
}

export async function getServerSideProps({ query, req }: any) {
  try {
    const baseUrl = makeBaseurl(req)
    const id = query.id
    const res = await fetch(`${baseUrl}/api/cities/${id}`)
    const json = await res.json()
    return { props: { initialData: json } }
  } catch (error) {
    return { props: { initialData: null, error } }
  }
}

export default Musician
