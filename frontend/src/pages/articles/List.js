import TopNavLayout from "../Layout/TopNavLayout";
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import articlesService from "../../services/articles";

import ArticleList from "../../components/article/ArticleList";

function List () {

  return (
    <TopNavLayout>
      <Container component="main">
        <ArticleList />
      </Container>
    </TopNavLayout>
  )
}

export default List