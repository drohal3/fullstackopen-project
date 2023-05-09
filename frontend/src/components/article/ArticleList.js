import {useEffect, useState} from "react";
import articlesService from "../../services/articles";
import ArticleListItem from "./ArticleListItem";
import ArticleWall from "./ArticleWall";


function ArticleList() {

  const [articles, setArticles] = useState([]);

  useEffect( () => {
    async function fetchArticles() {
      const articlesLoaded = await articlesService.getAll();
      setArticles(articlesLoaded);
    }

    fetchArticles();
  }, [])

  return (
    <>
      <ArticleWall articles={articles} />
    </>
  )
}

export default ArticleList