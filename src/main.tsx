import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={Router} />
);
