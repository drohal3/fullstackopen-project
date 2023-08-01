import AppLayout from "../../components/layout/AppLayout";
import ArticleForm from "../../components/article/ArticleForm";
import Container from '@mui/material/Container';
import {useParams} from "react-router";
import {useArticleById, useUpdateArticle} from "../../services/graphql/useArticles";
import {useNavigate} from "react-router-dom";

function Edit() {
  const { id } = useParams()
  const article = useArticleById(id)
  const navigate = useNavigate()
  const updateArticle = useUpdateArticle()

  if (!article) {
    return ("loading")
  }

  const handleSubmit = async (articleData) => {
    articleData = {...articleData, id}
    const updatedArticleResult = await updateArticle(articleData)
    console.log(updatedArticleResult)
    navigate(`/articles/${updatedArticleResult.data.updateArticle.id}`)
  }

  return (
    <>
      <AppLayout>
        <Container maxWidth="md" component="main">
          <ArticleForm handleSubmit={handleSubmit} articleData={article} />
        </Container>
      </AppLayout>
    </>
  )
}

export default Edit;