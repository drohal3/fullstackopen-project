import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import articles from "../../services/articles";
import { useSelector } from "react-redux";


function ArticleForm() {
  const user = useSelector((state) => {
    return state.user
  })
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const articleData = {
      title: formData.get("title"),
      abstract: formData.get("abstract"),
      content: formData.get("content")
    }

    console.log(articleData)

    if (user) {
      articles.setToken(user.token)
    }

    const newArticle = await articles.create(articleData);

    if (newArticle && newArticle.id) {
      console.log(newArticle);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="abstract"
        label="Abstract"
        name="abstract"
        autoComplete="abstract"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="content"
        label="Content"
        name="content"
        autoComplete="content"
        minRows="5"
        multiline
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Create
      </Button>
    </Box>
  )
}

export default ArticleForm;