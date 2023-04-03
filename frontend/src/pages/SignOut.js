import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signOut } from '../reducers/userReducer'

function SignOut() {
  const user = useSelector((state) => {
    return state.user
  })

  const navigate = useNavigate();

  if (!user.token) {
    navigate('/')
  }

  const dispatch = useDispatch();


  dispatch(signOut())

  return (
    <p>logout</p>
  )

}

export  default SignOut