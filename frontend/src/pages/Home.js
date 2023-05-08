import {AppBar, CssBaseline, Toolbar, Typography, Container, Card, CardContent, CardMedia} from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useSelector } from "react-redux";
import TopNavLayout from "./Layout/TopNavLayout";

import ArticleWall from "../components/article/ArticleWall";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import CardActionArea from '@mui/material/CardActionArea';

import * as PropTypes from "prop-types";
import { Link as RouterLink } from 'react-router-dom';

import coverImage from '../static/src/img/pexels-10529767.jpeg'
import articlesService from '../services/articles'
import Cover from "../components/layout/Cover";


function Home() {
  const [articles, setArticles] = useState([]);
  const user = useSelector((state) => {
    return state.user
  })

  useEffect( () => {
    async function fetchArticles() {
      const articlesLoaded = await articlesService.getAll();
      setArticles(articlesLoaded);
    }

    fetchArticles();
  }, [])

  return (
    <TopNavLayout>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
            {
              user.token
                ? <Cover title={`Welcome ${user.firstName} ${user.lastName}!`} content="few lines of content" link={{text: "link", address: "#"}} />
                : <Cover
                    title="Hello!"
                    content="Welcome to our website. If not already, Sign Up to share your stories and find support. We will be happy to stand by you!"
                    link={{text: "Sign Up here", address: '/register'}} />
            }
        </Container>
        <Container maxWidth="lg">
          <ArticleWall articles={articles}/>
        </Container>
    </TopNavLayout>
  );
}

export default Home;