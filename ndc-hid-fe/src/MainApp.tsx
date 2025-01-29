import {createBrowserRouter,RouterProvider,redirect,} from "react-router-dom";
import { useSelector } from "react-redux";
import Employee from "./components/pages/employee"
import SignIn from "./components/pages/authentication/SignIn"
import Header from "./components/layouts/Header";
import Controller from "./components/pages/controller";
import EmployeeEventDetails from "./components/pages/event";
import EventReport from "./components/pages/reports/EventReport";

const MainApp = () => {
  const authenticated = useSelector((state:any) => state.auth.authenticated);
  const router = createBrowserRouter([
    {
      path: "login",
      element: <SignIn />,
      loader: async () => (authenticated ? redirect("/list") : null),
    },
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "list",
          element:<Employee/>,
        },
        {
          path: "controller",
          element:<Controller/>,
        },
        {
          path: "event",
          element:<EmployeeEventDetails/>,
        },
        {
          path: "report",
          element:<EventReport/>,
        }
      ],
      loader: async () => (authenticated ? null : redirect("/login")),
    }
  ]);

  return <RouterProvider router={router} />;
};

export default MainApp;
