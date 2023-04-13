import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useSelector } from "react-redux";
import TopNav from "./Layout/TopNav";

import Nav from "../components/layout/Nav";

function Home() {
  const user = useSelector((state) => {
    return state.user
  })

  return (
    <TopNav>
      <p>Home</p>
    </TopNav>
  );
}

export default Home;