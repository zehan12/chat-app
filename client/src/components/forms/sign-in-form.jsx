import { useEffect, useState } from "preact/hooks";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChatState } from "@/context/chat.provider";

const SignInForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const context = ChatState();


  const handleLoginUser = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      user
    );
    context.setUserToLocalStorage(response.data.user);
    console.log(response);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(user, "user");
  }, [user]);

  return (
    <>
      <Label>Email</Label>
      <Input
        className="text-foreground"
        name="email"
        type="email"
        placeholder="email"
        onChange={handleChange}
      />
      <Label>Password</Label>
      <Input
        className="text-foreground"
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
      <Button
        className="hover:bg-green-500 hover:text-white"
        onClick={handleLoginUser}
      >
        submit
      </Button>
    </>
  );
};

export default SignInForm;
