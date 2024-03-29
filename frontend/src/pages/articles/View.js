import { useParams } from 'react-router';
import articles from "../../services/articles";
import {useEffect, useState} from "react";
import AppLayout from "../../components/layout/AppLayout";
import articlesService from "../../services/articles";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addAlert, AlertTypes} from "../../reducers/alertReducer";
import {useAuthData} from "../../hooks/useAuthHooks";
import {useDeleteArticle} from "../../services/graphql/useArticles";
import Typography from "@mui/material/Typography";


function ArticleActionButtons( { user, article } ) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const deleteArticle = useDeleteArticle()
  console.log("user", user)
  console.log("article", article)

  if (!article || !article.author || !user || !user.token) {
    return null
  }

  articles.setToken(user.token)

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(article.id)
    } catch (e) {
      dispatch(addAlert("Something went wrong!", AlertTypes.Error, 3))
      handleClose()
      return
    }

    dispatch(addAlert("Article removed successfully.", AlertTypes.Success, 3))
    navigate('/articles')
  }

  const author = article.author
  return user.id === author.id ? (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete the article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Stack direction="row" flexWrap="wrap" spacing={{ xs: 1, sm: 2 }}>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`/articles/${article.id}/edit`)}>
          Edit
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
          Delete
        </Button>
      </Stack>
    </>
  ) : null
}

function View() {
  const [article, setArticle] = useState(null);
  const { id } = useParams()

  useEffect( () => {
    async function fetchArticle() {
      const articleLoaded = await articlesService.get(id);
      setArticle(articleLoaded);
    }
    fetchArticle()

    console.log("useEffect article")
    const article = articles.get(id)
    setArticle(article)
  }, [])

  const user = useAuthData()

  if (!article) {
    return (<p>loading...</p>)
  }

  return (
    <>
      <AppLayout>
        <Typography variant="h1"> {article.title} </Typography>
        <ArticleActionButtons article={article} user={user} />
        <Typography>{article.content}</Typography>
      </AppLayout>
    </>
  )
}

export default View