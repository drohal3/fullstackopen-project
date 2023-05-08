import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import coverImage from "../../static/src/img/pexels-10529767.jpeg";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import articlesService from "../../services/articles";

function ArticleWallBrick( {article} ) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${article.id}`)
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={handleClick}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {/*{post.title}*/}
              { article.title }
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {/*{post.date}*/}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              { article.content }
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={coverImage}
            alt="todo: image label"
          />
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default ArticleWallBrick