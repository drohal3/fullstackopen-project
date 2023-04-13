import TopNav from "../Layout/TopNav";
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import articlesService from "../../services/articles";

function List () {
  const [articles, setArticles] = useState([]);

  useEffect( () => {
    async function fetchArticles() {
      const articlesLoaded = await articlesService.getAll();
      setArticles(articlesLoaded);
    }
    fetchArticles();
  })

  return (
    <TopNav>
      <Container component="main">
        {articles.map((article) => (<p key={article.id}>{article.content}</p>))}
      </Container>

    </TopNav>
  )
}

export default List