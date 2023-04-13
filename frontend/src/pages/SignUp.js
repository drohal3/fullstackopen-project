import TopNav from "./Layout/TopNav";
import SignUpForm from "../components/user/SignUpForm";
function SignUp() {
  return (
    <>
      <TopNav logButtons={ false }>
        <SignUpForm />
      </TopNav>
    </>
  )
}

export default SignUp;