import TableServerSide from '../../../components/TableServerSide/index'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import { GridColDef } from '@mui/x-data-grid'
import NextLink from 'next/link'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, CircularProgress } from '@mui/material'
import { useIsAuth } from '../../../contexts/AuthContext'
import routes from '../../../config/routes'

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: '',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (rowData: any) => (
      <div>{rowData.row.image && (
        <Avatar alt={rowData.row.first_name} src={rowData.row.image} sx={{ width: 24, height: 24 }} />
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
  initialSort: { field: 'id', direction: 'asc' }
}

const Musicians = () => useIsAuth() ? (
  <div>
    <BreadcrumbsSite urls={[
      { text: 'Home', url: routes.home() },
      { text: 'Musicians', url: routes.adminMusicians() }
    ]} />
    <Card>
      <CardHeader
        title="Musicians"
        action={<NextLink href={routes.adminMusicianCreate()}>
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
        <TableServerSide {...tableProps} makeActionView={data => routes.adminMusician(data.row.id)} />
      </CardContent>
    </Card>
  </div>
) : (<CircularProgress />)

export default Musicians
