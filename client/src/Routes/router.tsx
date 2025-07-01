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
import UpdateEvent from "../pages/MyEvents/UpdateEvent";
import ErrorElement from "../components/ErrorElement";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorElement></ErrorElement>,
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
      {
        path: "/update-event/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent></UpdateEvent>
          </PrivateRoute>
        ),
      },
      { path: "/sign-in", element: <SignIn></SignIn> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);
