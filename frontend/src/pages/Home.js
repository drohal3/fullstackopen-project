import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useSelector } from "react-redux";


function Home() {
  const user = useSelector((state) => {
    return state.user
  })

  console.log("user in Home", user)
  console.log("token", user.token)

  return (
    <>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <SupportIcon/>
          <Typography variant="h6">UaTalk</Typography>
        </Toolbar>
      </AppBar>
      <main>

        <p>main</p>
      </main>
    </>
  );
}

export default Home;