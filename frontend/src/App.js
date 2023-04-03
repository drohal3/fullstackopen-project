import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { setUser } from "./reducers/userReducer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NoPage from "./pages/NoPage";
import SignOut from "./pages/SignOut";
function App() {
  const dispatch = useDispatch();

  const user = window.localStorage.getItem("UATalkUser")

  console.log("step 1 - set user in App.js, user: ", user)
  if (user) {
    dispatch(setUser(JSON.parse(user)))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="logout" element={<SignOut />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
