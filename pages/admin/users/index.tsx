import TableServerSide from '../../../components/TableServerSide/index'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import BreadcrumbsSite from '../../../components/BreadcrumbsSite'
import { GridColDef } from '@mui/x-data-grid'
import routes from '../../../config/routes'
import { useIsAuth } from '../../../contexts/AuthContext'
import { Chip, CircularProgress } from '@mui/material'
import { AccountBox } from '@mui/icons-material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'username', headerName: 'Username', flex: 1 },
  {
    field: 'roles',
    headerName: 'Roles',
    sortable: false,
    headerAlign: 'left',
    align: 'left',
    flex: 1,
    renderCell: (rowData: any) => (
      <div>{rowData.row.roles && (
        rowData.row.roles.map((role: any, i: number) => (
          <Chip key={i} size="small" label={role.name} style={{ margin: '1rem 1rem 1rem 0' }} />
        ))
      )}</div>
    )
  },
]

const tableProps = { endpoint: '/api/users', columns, initialSort: { field: 'id', direction: 'asc' } }

const Users = () => useIsAuth(['admin']) ? (
  <>
    <BreadcrumbsSite urls={[
      { text: 'Home', url: routes.home() },
      { text: 'Users', url: routes.adminUsers() }
    ]} />
    <Card>
      <CardHeader title="Users" avatar={<AccountBox />} />
      <CardContent>
        <TableServerSide {...tableProps} makeActionView={data => routes.adminUser(data.row.id)} />
      </CardContent>
    </Card>
  </>
) : (<CircularProgress />)

export default Users
