import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import * as React from "react";

function ArticleListItem(props) {
  const { article } = props
  const author = article.author

  const user = useSelector((state) => {
    return state.user
  })

  console.log(article)
  console.log("author", author)
  console.log("user", user)



  return (
    <>
      <Typography variant="subtitle2" gutterBottom>{article.title}</Typography>
      <Link component={RouterLink} to={`/articles/${article.id}`} variant="body2">
        {"see more"}
      </Link>
      <Typography>{article.abstract}</Typography>
      {user.id === author.id ? (<Typography>You are author</Typography>) : (<Typography>You are not author</Typography>)}
      <hr />
    </>
  )
}

export default ArticleListItem