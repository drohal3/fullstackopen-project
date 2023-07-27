import TopNavLayout from "./layout/TopNavLayout";
import SignInForm from '../components/user/SignInForm'

function SignIn() {
  return (
    <TopNavLayout logButtons={ false }>
      <SignInForm/>
    </TopNavLayout>
  )
}

export default SignIn;