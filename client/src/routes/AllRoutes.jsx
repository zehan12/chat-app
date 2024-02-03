import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "@/page/Home";
import Chat from "@/page/Chat";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/chats",
    element: <Chat />,
    errorElement: <h1>error</h1>,
  },
];

const router = createBrowserRouter(routes, {
  basename: "/",
});

const AllRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AllRoutes;
