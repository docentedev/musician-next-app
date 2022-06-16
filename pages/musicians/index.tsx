import TableServerSide from '../../components/TableServerSide/index'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import BreadcrumbsSite from '../../components/BreadcrumbsSite'
import { GridColDef } from '@mui/x-data-grid'
import NextLink from 'next/link'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
// import Image from 'next/image'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID' },
  {
    field: 'image',
    headerName: '',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (rowData: any) => (
      <div>{rowData.row.image && (
        <Avatar
          alt={rowData.row.first_name}
          src={rowData.row.image}
          sx={{ width: 24, height: 24 }}
        />
        /* <Image
          src={`http://localhost:3001/api/v1/files/${rowData.row.image}`}
          width={40} height={40}
          objectFit="cover"
          objectPosition="center"
          alt={rowData.row.first_name}
        /> */
      )}</div>
    )
  },
  { field: 'first_name', headerName: 'First Name' },
  { field: 'last_name', headerName: 'Last Name' },
  { field: 'city_name', headerName: 'City', sortable: false },
  { field: 'country_name', headerName: 'Country', sortable: false }
]
const tableProps = {
  endpoint: '/api/musicians',
  columns,
  initialSort: {
    field: 'id',
    direction: 'asc'
  }
}

const Musicians = () => {
  const router = useRouter()
  const auth = useAuth()

  const authCheck = useCallback(() => {
    if (auth.data) {
      console.log(auth.data.isLogin)
      if (!auth.data.isLogin) {
        router.push('/')
      }
    }
  }, [auth.data, router])

  useEffect(() => {
    router.events.on('routeChangeComplete', authCheck)
    return () => {
      // router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, [auth.data, authCheck, router])

  return (
    <div>
      <BreadcrumbsSite urls={[
        { text: 'Home', url: '/' },
        { text: 'Musicians', url: '/musicians' }
      ]} />
      <Card>
        <CardHeader
          title="Musicians"
          action={<NextLink href={'/musicians/create'}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Create
            </Button>
          </NextLink>}
        />
        <CardContent>
          <TableServerSide {...tableProps} makeActionView={data => `/musicians/${data.row.id}`} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Musicians
