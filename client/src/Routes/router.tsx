import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import SignIn from "../pages/SignIn/SignIn";
import Events from "../pages/Events/Events";
import AddEvent from "../pages/AddEvent/AddEvent";

import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details/Details";
import MyEvents from "../pages/MyEvents/MyEvents";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/events",
        element: (
          <PrivateRoute>
            <Events></Events>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-events",
        element: (
          <PrivateRoute>
            <AddEvent></AddEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "my-event",
        element: (
          <PrivateRoute>
            <MyEvents></MyEvents>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      { path: "/sign-in", element: <SignIn></SignIn> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);
