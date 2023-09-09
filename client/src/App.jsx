import "./App.css";
import Answers from "./views/Answers";
import Home from "./views/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/answers", element: <Answers /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
