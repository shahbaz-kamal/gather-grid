import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import SignIn from "../pages/SignIn/SignIn";
import Events from "../pages/Events/Events";
import AddEvent from "../pages/AddEvent/AddEvent";
import MyEvent from "../pages/MyEvent/MyEvent";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      { path: "/events", element: <Events></Events> },
      { path: "/add-events", element: <AddEvent></AddEvent> },
      { path: "my-event", element: <MyEvent></MyEvent> },
      { path: "/sign-in", element: <SignIn></SignIn> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);
