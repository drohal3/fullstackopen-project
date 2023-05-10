import TopNavLayout from "../Layout/TopNavLayout";
import ArticleForm from "../../components/article/ArticleForm";
import Container from '@mui/material/Container';

function Edit() {
  return (
    <>
      <TopNavLayout>
        <Container maxWidth="md" component="main">
          <ArticleForm />
        </Container>
      </TopNavLayout>
    </>
  )
}

export default Edit;