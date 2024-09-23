import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";
import "./router.css";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

export default Router;
