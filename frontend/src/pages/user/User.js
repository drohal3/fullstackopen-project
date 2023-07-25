// import UserLayout from "../Layout/UserLayout";
import TopNavLayout from "../layout/TopNavLayout";
import ChangePasswordForm from "../../components/user/ChangePasswordForm";
import {useParams} from "react-router";

function User () {
  const { id } = useParams()



  return (
    <TopNavLayout>
      {/*<ChangePasswordForm />*/}
    </TopNavLayout>
  )
}

export default User