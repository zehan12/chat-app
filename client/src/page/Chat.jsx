import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { Button } from "../components/ui/button";
import { ChatState } from "@/context/chat.provider";
import SideDrawer from "@/components/misc/SideDrawer";

const Chat = () => {
  const [chats, setChats] = useState(null);

  const { user } = ChatState();

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     const response = await axios.get("http://localhost:3000/api/chat");
  //     setChats(response.data.chats);
  //   };

  //   fetchChats();
  // }, []);

  return (
    <div className="bg-background h-screen">
      <h1 className="text-foreground">chat</h1>
      {user && <SideDrawer />}
    </div>
  );
};

export default Chat;
