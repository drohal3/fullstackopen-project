// import UserLayout from "../Layout/UserLayout";
import TopNavLayout from "../layout/TopNavLayout";
import AppLayout from "../../components/layout/AppLayout";
import ArticleList from "../../components/article/ArticleList";

import ChangePasswordForm from "../../components/user/ChangePasswordForm";
import {useParams} from "react-router";
import {useArticlesByUserId} from "../../services/graphql/useArticles";

function User () {
  const { id } = useParams()
  const articles = useArticlesByUserId( id )


  return (
    <AppLayout title="TODO: <Username>">

      <p>{id}</p>
      <ArticleList articles={articles} />
    </AppLayout>
  )
}

export default User