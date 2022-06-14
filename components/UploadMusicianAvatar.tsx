import { Avatar, Button, IconButton, Stack } from '@mui/material'
import DeleteForever from '@mui/icons-material/DeleteForever'
import { useState } from 'react'
import { styled } from '@mui/material/styles'

const Input = styled('input')({
  display: 'none'
})

const uploadFileWithIdRequest = async (id: string, file: any) => {
  const form = new FormData()
  form.append('file', file)
  form.append('id', id)

  try {
    const result = await fetch('/api/musicians/upload/file', {
      method: 'POST',
      body: form
    })
    const json = await result.json()
    return json
  } catch (error) {
    console.log(error)
    throw error
  }
}

const UploadForm = ({
  id: initialId,
  image: initialImage,
  onSave
}: { id: string, image: string, onSave: Function }) => {
  const [file, setFile] = useState<any>()

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (file && initialId) {
      await uploadFileWithIdRequest(initialId, file)
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
          <Button variant="contained" component="span">
            Load File
          </Button>
        </label>
        <Button type="submit" disabled={!file} variant="contained" color="success">Save</Button>
      </Stack>
    </form>
  )
}

export default UploadForm
