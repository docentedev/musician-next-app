import { Avatar, Button, IconButton, Stack } from '@mui/material'
import DeleteForever from '@mui/icons-material/DeleteForever'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useAuth } from '../contexts/AuthContext'
import { Save, UploadFile } from '@mui/icons-material'

const Input = styled('input')({
  display: 'none'
})

const uploadFileWithIdRequest = async (id: string, file: any, jwt: any) => {
  const form = new FormData()
  form.append('file', file)
  form.append('id', id)

  try {
    const result = await fetch('/api/musicians/upload/file', {
      method: 'POST',
      body: form,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    const json = await result.json()
    return json
  } catch (error) {
    throw error
  }
}

const UploadForm = ({
  id: initialId,
  image: initialImage,
  onSave
}: { id: string, image: string, onSave: Function }) => {
  const auth: any = useAuth()
  const [file, setFile] = useState<any>()

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (file && initialId) {
      await uploadFileWithIdRequest(initialId, file, auth.data.token.jwt)
      onSave()
    } else {
      console.log('no file or id')
    }
  }

  const removeSelectedImage = () => {
    setFile(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {file && (
          <>
            <Avatar alt="Image Profile" src={URL.createObjectURL(file)} />
            <IconButton onClick={removeSelectedImage} color="error" aria-label="upload picture" component="span">
              <DeleteForever />
            </IconButton>
          </>
        )}
        {!file && initialImage && (
          <>
            <Avatar alt="Image Profile" src={initialImage} />
          </>
        )}
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" onChange={handleFileChange} type="file" />
          <Button variant="contained" component="span" endIcon={<UploadFile />}>
            Load File
          </Button>
        </label>
        <Button
          disabled={!file}
          variant="contained"
          color="success"
          size="large"
          type="submit"
          endIcon={<Save />}
        >
          Save
        </Button>
      </Stack>
    </form>
  )
}

export default UploadForm
