import TopNav from "../Layout/TopNav";
import ArticleForm from "../../components/article/ArticleForm";
import Container from '@mui/material/Container';

function Create() {
  return (
    <>
      <TopNav>
        <Container maxWidth="md" component="main">
          <ArticleForm />
        </Container>
      </TopNav>
    </>
  )
}

export default Create;