import AppLayout from "../../components/layout/AppLayout";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'

import Link from "@mui/material/Link";
import {useState} from "react";
import {useAuthData} from "../../hooks/useAuthHooks";
import {useAllArticlesByUserId} from "../../services/graphql/useArticles";

function Articles() {
  const auth = useAuthData()

  console.log(auth)

  const articlesResult = useAllArticlesByUserId(auth.id)

  console.log(articlesResult)

  const articles = !articlesResult || articlesResult.loading || !articlesResult.data ? [] : articlesResult.data.allArticles

  console.log(articles)

  const articlesElements = (
    <>
      {articles.map((article) => (<Typography key={article.id}>{JSON.stringify(article)}</Typography>))}
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