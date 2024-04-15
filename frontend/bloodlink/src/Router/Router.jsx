import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Request from "../Pages/Request";
import Donate from "../Pages/Donate";
import ContactUs from "../Pages/ContactUs";
import Community from "../Pages/Community";
import SignUp from "../Pages/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/request", element: <Request /> },
      { path: "/donate", element: <Donate /> },
      { path: "/community", element: <Community /> },
      { path: "/contact", element: <ContactUs /> },

      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

export default router;
