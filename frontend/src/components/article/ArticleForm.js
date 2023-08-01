import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";


function ArticleForm( props ) {
  const {handleSubmit, articleData} = props

  const [title, setTitle] = useState("")
  const [abstract, setAbstract] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    setTitle(articleData?.title || "")
    setAbstract(articleData?.abstract || "")
    setContent(articleData?.content || "")
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit({title, abstract, content})
  }

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        autoFocus
      />
      <TextField
        margin="normal"

        fullWidth
        id="abstract"
        label="Abstract"
        minRows="3"
        multiline
        name="abstract"
        autoComplete="abstract"
        value={abstract}
        onChange={(event) => setAbstract(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label="Content"
        name="content"
        autoComplete="content"
        minRows="8"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        multiline
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  )
}

export default ArticleForm;