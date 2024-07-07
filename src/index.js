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
import DriverInfo from "./Component/DriverInfo";
import Bus from "./Component/Bus";
import Car from "./Component/Car";
import Keke from "./Component/Keke";

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
  {
    path: "/driver-info",
    element: <DriverInfo />,
  },
  {
    path: "/vehicles/bus",
    element: <Bus />,
  },
  {
    path: "/vehicles/car",
    element: <Car />,
  },
  {
    path: "/vehicles/keke",
    element: <Keke />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
