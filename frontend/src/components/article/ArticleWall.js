import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";

import ArticleWallBrick from "./ArticleWallBrick";

import articlesService from "../../services/articles";
import CardActionArea from "@mui/material/CardActionArea";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';

function ArticleWall({articles}) {
  // const [articles, setArticles] = useState([]);
  const user = useSelector((state) => {
    return state.user
  })

  // useEffect( () => {
  //   async function fetchArticles() {
  //     const articlesLoaded = await articlesService.getAll();
  //     setArticles(articlesLoaded);
  //   }
  //
  //   fetchArticles();
  // }, [])

  const navigate = useNavigate();

  const articleWallNav = (user.token)
    ? (
      <Button size="small" variant="outlined" startIcon={<CreateIcon />} onClick={() => navigate('/articles/create')}>
        Create article
      </Button>
    )
    : null

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        { articleWallNav }
      </Grid>
      {articles.map((article) => <ArticleWallBrick key={article.id} article={article} />)}
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" onClick={() => navigate('/articles')}>
          <Grid container direction="row" alignItems="bottom">
            <Grid item>
              <Typography component="h2" variant="h5">More articles...</Typography>
            </Grid>
            <Grid item>
              <KeyboardTabIcon fontSize="large"/>
            </Grid>
          </Grid>

        </CardActionArea>
      </Grid>
    </Grid>
  )
}

export default ArticleWall