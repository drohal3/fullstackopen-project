import {AppBar, CssBaseline, Toolbar, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import SupportIcon from "@mui/icons-material/Support";

import { useSelector } from "react-redux";


function Nav() {
  const user = useSelector((state) => {
    return state.user
  })

  const buttons = (user.token)
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
            Company name
          </Typography>
          <nav>
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
          </nav>
          { buttons }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Nav;