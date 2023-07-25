import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import { signOut } from '../reducers/loggedUserReducer'

function SignOut() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut())
  })

  return (
    <Navigate to='/' />
  )

}

export  default SignOut