import TableServerSide from '../../../components/TableServerSide/index'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import { GridColDef } from '@mui/x-data-grid'
import routes from '../../../config/routes'
import { useIsAuth } from '../../../contexts/AuthContext'
import { CircularProgress } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'admin_name', headerName: 'Admin', width: 200, flex: 1, sortable: false }
]

const tableProps = { endpoint: '/api/cities', columns, initialSort: { field: 'id', direction: 'asc' } }

const Cities = () => useIsAuth() ? (
  <>
    <BreadcrumbsSite urls={[
      { text: 'Home', url: routes.home() },
      { text: 'Cities', url: routes.adminCities() }
    ]} />
    <Card>
      <CardHeader title="Cities" />
      <CardContent>
        <TableServerSide {...tableProps} makeActionView={data => routes.adminCity(data.row.id)} />
      </CardContent>
    </Card>
  </>
) : (<CircularProgress />)

export default Cities
