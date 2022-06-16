import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import SelectAsynchronous from './SelectAsynchronousCity'
import Button from '@mui/material/Button'
import { Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import CustomTextField from './CustomField'

const MusicianForm = ({
  data,
  onSave,
  setData,
  openSuccess,
  setOpenSuccess
}: any) => {
  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(event: any) => {
              event.preventDefault()
              onSave()
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <CustomTextField model={data} required name="first_name" label="First Name" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <CustomTextField model={data} name="second_name" label="Second Name" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <CustomTextField model={data} name="last_name" label="Last Name" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <CustomTextField model={data} name="second_last_name" label="Second Last Name" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <CustomTextField model={data} name="alias" label="Alias coma separated" onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <SelectAsynchronous
                        value={{
                          city_fk: data.city_fk,
                          city_name: data.city_name,
                          country_name: data.country_name
                        }}
                        onChange={(value: any) => setData({ ...data, ...value })}
                    />
                </Grid>
                <Grid item>
                    <DesktopDatePicker
                        label="Birth Date"
                        inputFormat="MM/dd/yyyy"
                        value={data.birth_date}
                        onChange={(date: any) => setData({ ...data, birth_date: date })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item>
                    <DesktopDatePicker
                        label="Death Date"
                        inputFormat="MM/dd/yyyy"
                        value={data.death_date}
                        onChange={(date: any) => setData({ ...data, death_date: date })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Button Save */}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!data.first_name || !data.last_name}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={openSuccess}>
                    <Alert
                        style={{ marginTop: 10 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                  setOpenSuccess(false)
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Saved successfully
                    </Alert>
                </Collapse>
            </Grid>
        </Box>
  )
}

export default MusicianForm
