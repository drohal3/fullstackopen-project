import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { setUser } from "./reducers/loggedUserReducer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NoPage from "./pages/NoPage";
import SignOut from "./pages/SignOut";
import User from "./pages/user/User"

import ArticleList from "./pages/articles/List";
import ArticleView from "./pages/articles/View";
import ArticleCreate from './pages/articles/Create';
import ArticleEdit from './pages/articles/Edit';
import {useEffect} from "react";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = window.localStorage.getItem("UATalkUser")

    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="logout" element={<SignOut />} />
        <Route path="*" element={<NoPage />} />

        <Route path="users/:id" element={<User />} />


        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/create" element={<ArticleCreate />} />

        <Route path="articles/:id" element={<ArticleView />} />
        <Route path="articles/:id/edit" element={<ArticleEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
