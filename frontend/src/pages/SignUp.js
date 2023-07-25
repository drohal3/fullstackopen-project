import TopNavLayout from "./Layout/TopNavLayout";
import SignUpForm from "../components/user/SignUpForm";
function SignUp() {
  return (
    <>
      <TopNavLayout logButtons={ false }>
        <SignUpForm />
      </TopNavLayout>
    </>
  )
}

export default SignUp;