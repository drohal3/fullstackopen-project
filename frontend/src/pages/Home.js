import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useSelector } from "react-redux";
import TopNavLayout from "./Layout/TopNavLayout";

import Nav from "../components/layout/Nav";

function Home() {
  const user = useSelector((state) => {
    return state.user
  })

  return (
    <TopNavLayout>
      <p>Home</p>
    </TopNavLayout>
  );
}

export default Home;