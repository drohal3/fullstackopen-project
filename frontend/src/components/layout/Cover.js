import Paper from "@mui/material/Paper";
import coverImage from "../../static/src/img/pexels-10529767.jpeg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router-dom";
import React from "react";

function Cover({title, content, link}) {

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // backgroundImage: `url(${post.image})`,
        // backgroundImage: `url(https://images.pexels.com/photos/2990671/pexels-photo-2990671.jpeg)`,
        backgroundImage: `url(${coverImage})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {/*{<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}*/}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              { title }
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {/*{post.description}*/}
              { content }
            </Typography>
            {
              link &&
              <Link component={RouterLink} variant="subtitle1" to={link.address}>
                {/*{post.linkText}*/}
                { link.text }
              </Link>
            }

          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Cover