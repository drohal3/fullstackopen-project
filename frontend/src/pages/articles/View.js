import { useParams } from 'react-router';
import articles from "../../services/articles";
import {useEffect, useState} from "react";
import TopNavLayout from "../Layout/TopNavLayout";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import {useSelector} from "react-redux";
import articlesService from "../../services/articles";


function View() {
  const [article, setArticle] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    async function fetchArticle() {
      const articleLoaded = await articlesService.get(id);
      setArticle(articleLoaded);
    }
    fetchArticle()

    console.log("useEffect article")
    const article = articles.get(id)
    setArticle(article)
  }, [])

  const user = useSelector((state) => {
    return state.user
  })

  if (!article) {
    return (<p>loading...</p>)
  }

  const author = article.author

  console.log("article", article)

  return (
    <>
      <TopNavLayout>
        <CssBaseline />
        <Container maxWidth={false} disableGutters bgcolor = "#f2f6fc">
          <Box sx={{
            width: '100%',
            height: 200,
            backgroundColor: 'gray',
            '&:hover': {
              backgroundColor: 'gray',
              opacity: [0.9, 0.8, 0.7],
            },}}>
            inside box
          </Box>
        </Container>
        <Container component="main">
          {article.content}
        </Container>
      </TopNavLayout>

    </>
  )
}

export default View