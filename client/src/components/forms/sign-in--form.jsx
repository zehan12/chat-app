import { useEffect, useState } from "preact/hooks";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SignInForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLoginUser = async () => {
    const response = await axios.post("http://localhost:3000/api/auth/login",{
        body:JSON.stringify(user)
    });
    console.log(response);
}

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(user);
  };

  useEffect(() => {
    console.log(user, "user");
  }, [user]);

  return (
    <>
      <Label>Email</Label>
      <br />
      <Input
        className="text-white"
        name="email"
        type="email"
        placeholder="email"
        onChange={handleChange}
      />
      <Label>Password</Label>
      <br />
      <Input
        className="text-white"
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
      <Button className="hover:bg-green-700" onClick={handleLoginUser}>submit</Button>
    </>
  );
};

export default SignInForm;
