import { Typography, CssBaseline, AppBar, Toolbar, Container } from "@mui/material";
import SupportIcon from '@mui/icons-material/Support';
import SignIn from "./components/user/SignIn";
function App() {
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
        <SignIn />
      </main>
    </>
  );
}

export default App;
