import DefaultLayout from "@/components/layouts/DefaultLayout";
import LoggedInLayouts from "@/components/layouts/LoggedInLayouts";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Drugs from "@/pages/loggedIn/Drugs";
import Home from "@/pages/loggedIn/Home";
import { createBrowserRouter } from "react-router";
import NewDrug from '../pages/loggedIn/NewDrug';
import AllSchedule from "@/pages/loggedIn/AllSchedule";
import Settings from "@/pages/loggedIn/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "verify",
        element: <VerifyOtp />,
      },
      {
        path: "*",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <LoggedInLayouts />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "drugs",
        element: <Drugs />,
      },
      {
        path: "new-drug",
        element: <NewDrug />,
      },
      {
        path: "all-schedule",
        element: <AllSchedule />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
