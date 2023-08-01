import AppLayout from "../../components/layout/AppLayout";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAuthData} from "../../hooks/useAuthHooks";
import {useArticlesByUserId} from "../../services/graphql/useArticles";

function Articles() {
  const auth = useAuthData()

  console.log(auth)

  const articlesResult = useArticlesByUserId(auth.id)

  console.log(articlesResult)

  const articles = !articlesResult || articlesResult.loading || !articlesResult.data ? [] : articlesResult.data.allArticles

  console.log(articles)

  const articlesElements = (
    <>
      {articles.map((article) => {
        const linkTo = `/articles/${article.id}`
        return (
          <div key={article.id}>
            {/*<Typography key={article.id}>{JSON.stringify(article)}</Typography>*/}
            <Typography>
              Article: <RouterLink to={linkTo}>{article.title}</RouterLink>
            </Typography>
          </div>
        )
      })}
    </>
  )


  return (
    <AppLayout title="Articles">
      <RouterLink to="/articles/create">Add article</RouterLink>
      {articlesElements}
    </AppLayout>
  )
}

export default Articles;