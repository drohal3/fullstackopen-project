import Nav from "../../components/layout/Nav";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import * as React from "react";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function TopNavLayout (props) {
  const user = useSelector((state) => {
    return state.user
  })

  const { logButtons = true } = props

  let buttons = null;

  if (logButtons) {
    buttons = (user.token)
      ? (
        <Button href="/logout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Logout
        </Button>
      )
      : (
        <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      );
  }

  return (
    <>
      <Nav>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Features
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Enterprise
        </Link>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Support
        </Link>
        { buttons }
      </Nav>
      { props.children }
      <Copyright sx={{ mt: 8, mb: 4 }}/>
    </>

  )
}

export default TopNavLayout;