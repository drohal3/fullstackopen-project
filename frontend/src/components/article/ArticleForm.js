import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client'
import { addAlert, AlertTypes } from "../../reducers/alertReducer";
import Paper from "@mui/material/Paper";

import { useCreateArticle } from "../../services/graphql/useArticles";


function ArticleForm() {
  const navigate = useNavigate()
  const createArticle = useCreateArticle()
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let newArticle = null

    try {
        newArticle = await createArticle({
          title: formData.get("title"),
          abstract: formData.get("abstract"),
          content: formData.get("content")
      })
      console.log("new article", newArticle);
      dispatch(addAlert("Article created successfully.", AlertTypes.Success, 3))
      navigate(`/articles/${newArticle.data.createArticle.id}`)
    } catch (e) {
      dispatch(addAlert("Something went wrong!", AlertTypes.Error, 3))
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

        fullWidth
        id="abstract"
        label="Abstract"
        minRows="3"
        multiline
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
        minRows="8"
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