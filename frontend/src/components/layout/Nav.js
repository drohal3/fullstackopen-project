import {AppBar, CssBaseline, Toolbar, Typography} from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";

function Nav() {
  return (
    <>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <SupportIcon/>
          <Typography variant="h6">UaTalk</Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Nav;