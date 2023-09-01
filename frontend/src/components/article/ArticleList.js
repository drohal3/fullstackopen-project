import ArticleListItem from "./ArticleListItem";

function ArticleList( {articles} ) {
  const articleItems = articles.map((article) => (<ArticleListItem article={article} />))

  return (
    <p>
      {articleItems}
    </p>
  )
}

export default ArticleList