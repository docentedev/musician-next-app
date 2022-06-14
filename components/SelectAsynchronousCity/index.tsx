import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

interface City {
  city_name: string;
  city_fk: number;
  country_name: string;
}

interface CityResonse {
  name: string
  id: number
  country_name: string
}

const fetchDataAsync = async (search: string) => {
  try {
    const response = await fetch(`/api/cities/search?q=${search}`)
    const data = await response.json()
    const options = data.map((city: CityResonse) => ({
      city_name: city.name,
      city_fk: city.id,
      country_name: city.country_name
    }))
    return options
  } catch (error) {
    return []
  }
}

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [delay, value])
  return debouncedValue
}

type SelectAsynchronousProps = {
  label?: string
  name?: string
  value: any
  onChange: (value: any) => void
}

function SelectAsynchronous ({ onChange, value, label, name }: SelectAsynchronousProps) {
  const [options, setOptions] = React.useState<City[]>([])
  const [loading, setLoading] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<City | null>(null)
  const debouncedValue = useDebounce(internalValue, 500)

  const find = (q: string) => {
    setLoading(true)
    setOptions([])
    fetchDataAsync(q).then(async data => {
      setLoading(false)
      setOptions(data)
    }).catch(() => {
      setLoading(false)
    })
  }

  React.useEffect(() => {
    if (debouncedValue && debouncedValue.length > 2) {
      find(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <Autocomplete
      id={`${name}-select-asynchronous`}
      options={[value, ...options]}
      loading={loading}
      filterSelectedOptions
      isOptionEqualToValue={(option: City, value: City) => option.city_fk === value.city_fk}
      getOptionLabel={(option: City) => option.city_name || ''}
      onChange={(event, value) => {
        console.log(value)
        if (value) {
          onChange(value)
        } else {
          onChange({
            city_fk: 0,
            city_name: '',
            country_name: ''
          })
        }
      }}
      value={value}
      renderInput={(params: { [key: string]: any }) => (
        <TextField
          {...params}
          label={label ?? 'Select a city'}
          variant="outlined"
          onChange={(event: any) => {
            setInternalValue(event.target.value)
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />)
}

export default SelectAsynchronous
