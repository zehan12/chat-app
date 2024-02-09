import { Route, Routes } from "react-router-dom";
import Home from "@/page/Home";
import Chat from "@/page/Chat";
import AuthLayout from "@/page/(auth)/AuthLayout";
import SignIn from "@/page/(auth)/sign-in/index";
import SignUp from "@/page/(auth)/sign-up/index";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
