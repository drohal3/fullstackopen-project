import {AppBar, CssBaseline, Toolbar, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import SupportIcon from "@mui/icons-material/Support";

import { useSelector } from "react-redux";


function Nav(props) {
  return (
    <>
      <CssBaseline/>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <RouterLink to='/'>Company name</RouterLink>
          </Typography>
          <nav>
            { props.children }
          </nav>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Nav;