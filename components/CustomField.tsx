import TextField from '@mui/material/TextField'

const CustomTextField = ({ model, name, label, onChange, ...props }: any) => {
    return (
        <TextField
            {...props}
            label={label}
            name={name}
            value={model[name]}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            fullWidth
        />
    )
}

export default CustomTextField