import AppLayout from "../../components/layout/AppLayout";
import Typography from "@mui/material/Typography";
import {useAuthData} from "../../hooks/useAuthHooks";

function Network(){
  const auth = useAuthData()
  console.log(auth)
  return (
    <AppLayout title="Network">
      <Typography>This is Network</Typography>
      <p>
        TODO: list of followed users
      </p>
      <p>
        Followed user does not necessarily share contact - separate functionality - share contact should be request,
         that could be dismissed or approved
      </p>
    </AppLayout>
  )
}

export default Network