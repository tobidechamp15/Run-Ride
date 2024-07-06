import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Vehicles from "./Component/Vehicles";
import Landing from "./Component/Landing";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import SetupDriver from "./Component/SetupDriver";

// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/vehicles",
    element: <Vehicles />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/setup-driver",
    element: <SetupDriver />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
