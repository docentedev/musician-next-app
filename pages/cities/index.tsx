import TableServerSide from '../../components/TableServerSide/index'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import BreadcrumbsSite from '../../components/BreadcrumbsSite'
import { GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'admin_name', headerName: 'Admin', width: 200, flex: 1, sortable: false }
]

const tableProps = { endpoint: '/api/cities', columns, initialSort: { field: 'id', direction: 'asc' } }

const Musicians = () => {
  return (
    <div>
      <BreadcrumbsSite urls={[
        { text: 'Home', url: '/' },
        { text: 'Cities', url: '/cities' }
      ]} />
      <Card>
        <CardHeader title="Cities" />
        <CardContent>
        <TableServerSide {...tableProps} makeActionView={data => `/cities/${data.row.id}`} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Musicians
