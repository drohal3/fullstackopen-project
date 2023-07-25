import ArticleForm from "../../components/article/ArticleForm";
import Container from '@mui/material/Container';
import AppLayout from "../../components/layout/AppLayout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TopNavLayout from "../layout/TopNavLayout";

function Create() {
  return (
    <>
      <AppLayout title="Create Article">
        <Container maxWidth="md" component="main">
          <ArticleForm />
        </Container>
      </AppLayout>
    </>
  )
}

export default Create;