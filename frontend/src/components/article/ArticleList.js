import {useEffect, useState} from "react";
import articlesService from "../../services/articles";
import ArticleListItem from "./ArticleListItem";


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
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article}/>
      ))}
    </>
  )
}

export default ArticleList