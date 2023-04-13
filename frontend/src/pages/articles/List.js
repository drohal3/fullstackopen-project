import TopNav from "../Layout/TopNav";
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import articlesService from "../../services/articles";

import ArticleList from "../../components/article/ArticleList";

function List () {

  return (
    <TopNav>
      <Container component="main">
        <ArticleList />
      </Container>
    </TopNav>
  )
}

export default List