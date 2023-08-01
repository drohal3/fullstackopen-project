import ArticleForm from "../../components/article/ArticleForm";
import Container from '@mui/material/Container';
import AppLayout from "../../components/layout/AppLayout";
import {useNavigate} from "react-router-dom";
import {useCreateArticle} from "../../services/graphql/useArticles";

function Create() {
  const navigate = useNavigate()
  const createArticle = useCreateArticle()

  const handleSubmit = async (articleData) => {
      let newArticle = null

      try {
          newArticle = await createArticle(articleData)
        console.log("new article", newArticle);
        // dispatch(addAlert("Article created successfully.", AlertTypes.Success, 3))
        navigate(`/articles/${newArticle.data.createArticle.id}`)
      } catch (e) {
        // dispatch(addAlert("Something went wrong!", AlertTypes.Error, 3))
      }
  }

  return (
    <>
      <AppLayout title="Create Article">
        <Container maxWidth="md" component="main">
          <ArticleForm handleSubmit={handleSubmit} />
        </Container>
      </AppLayout>
    </>
  )
}

export default Create;