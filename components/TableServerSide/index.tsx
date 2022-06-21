import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'

type TableProps = {
  columns: any[],
  endpoint: string,
  initialSort: {
    field: string,
    direction: string,
  },
  makeActionView?: (data: any) => string
}
const getData = async (endpoint: string, queryOptions: any, auth: any) => {
  const url = endpoint
  const get = async () => {
    const response = await fetch(`${url}?${new URLSearchParams(queryOptions)}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.data.token.jwt}`
      },
    })
    const data = await response.json()
    return data
  }

  return await get()
}

const exect = async (endpoint: string, data: any, auth: any) => {
  return await getData(endpoint, {
    size: data.pageSize,
    page: data.page,
    order: data.field,
    sort: data.direction
  }, auth)
}

const appendActions = (columns: any[], makeActionView: any) => {
  if (makeActionView) {
    return [...columns, {
      field: 'actions',
      sortable: false,
      flex: 1,
      headerName: 'Actions',
      headerAlign: 'right',
      align: 'right',
      renderCell: (rowData: any) => (
        <Link href={makeActionView(rowData)}>
          <a>
            <VisibilityIcon fontSize="small" />
          </a>
        </Link>
      )
    }]
  }
  return columns
}

function TableServerSide(props: TableProps) {
  const auth = useAuth()
  const [data, setData] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    pageSize: 10,
    page: 1,
    sort: props.initialSort
  })

  const updateData = (k: string, v: any) => setData((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    updateData('loading', true)
    exect(props.endpoint, {
      pageSize: data.pageSize,
      page: data.page,
      sort: data.sort,
      field: data.sort.field,
      direction: data.sort.direction
    }, auth).then((result: any) => {
      if (result.error) {
        setData((d) => ({ ...d, rowCount: 0, totalRows: 0, rows: [], loading: false }))
        return
      }
      setData((d) => ({ ...d, rowCount: result.rows.length, totalRows: result.count, rows: result.rows, loading: false }))
    }).catch(() => {
      setData((d) => ({ ...d, rowCount: 0, totalRows: 0, rows: [], loading: false }))
    })
  }, [data.page, data.pageSize, props.endpoint, data.sort])

  return (
    <DataGrid
      density="compact"
      autoHeight
      pagination
      paginationMode="server"
      loading={data.loading}
      rowCount={data.totalRows}
      rowsPerPageOptions={data.rowsPerPageOptions}
      page={data.page - 1}
      pageSize={data.pageSize}
      rows={data.rows}
      disableColumnFilter
      columns={appendActions(
        props.columns,
        props.makeActionView
      )}
      onPageChange={(data) => {
        updateData('page', data + 1)
      }}
      onPageSizeChange={(data) => {
        updateData('page', 1)
        updateData('pageSize', data)
      }}
      onSortModelChange={(data) => {
        updateData('sort', {
          field: data[0]?.field ?? props.initialSort.field,
          direction: data[0]?.sort ?? props.initialSort.direction
        })
      }}
    />
  )
}

export default TableServerSide
