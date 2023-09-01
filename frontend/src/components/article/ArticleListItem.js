import {Link as RouterLink} from "react-router-dom";


function ArticleListItem( {article} ) {
  return (
    <p>
      {article.title} <br/>
      {article.abstract} <br/>
      <RouterLink to={`/articles/${article.id}`}>read more...</RouterLink>
    </p>
  )
}

export default ArticleListItem