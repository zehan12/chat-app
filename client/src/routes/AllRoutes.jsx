import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "@/page/Home";
import Chat from "@/page/Chat";
import AuthLayout from "@/page/(auth)/AuthLayout";
import SignIn from "@/page/(auth)/sign-in/index";
import SignUp from "@/page/(auth)/sign-up/index";

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
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-out",
        element: <></>,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/",
});

const AllRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AllRoutes;
