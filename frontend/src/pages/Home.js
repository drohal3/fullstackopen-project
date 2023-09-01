import AppLayout from "../components/layout/AppLayout";
import Typography from "@mui/material/Typography";
import {useAuthData} from "../hooks/useAuthHooks";

function Home(){
  const auth = useAuthData()
  console.log(auth)
  return (
    <AppLayout title="Home">
      <Typography>This is home</Typography>
    </AppLayout>
  )
}

export default Home