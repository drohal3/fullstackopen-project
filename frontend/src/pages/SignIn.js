import TopNav from "./Layout/TopNav";
import SignInForm from '../components/user/SignInForm'

function SignIn() {
  return (
    <TopNav logButtons={ false }>
      <SignInForm/>
    </TopNav>
  )
}

export default SignIn;