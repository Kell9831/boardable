import { createBrowserRouter, redirect } from "react-router-dom";
import Login, { action as loginAction } from "./components/Login";
import Signup, { action as signupAction } from "./components/Signup";
import { authProvider } from "./auth";
import App , { action as rootAction, loader as rootLoader } from "./components/App/App";
import Error from "./components/error/error";
import Boards from "./components/Boards";
import Account from "./components/Account";



export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <App />,
    loader: rootLoader,
    action: rootAction,
    error:<Error/>,
    children: [
      {
        index: true,
        element: <Boards />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    async action() {
      await authProvider.logout();
      return redirect("/login");
    },
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction,
    //loader: signupLoader ,
  },
  {
    path: "/account",
    element: <App />,
    loader: rootLoader,
    action: rootAction,
    error:<Error/>,
    children: [
      {
        index: true,
        element: <Account />,
      },
    ],
  },

]);
