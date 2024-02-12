import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { Button } from "../components/ui/button";
import { ChatState } from "@/context/chat.provider";
import SideDrawer from "@/components/misc/SideDrawer";
import MyChats from "@/components/chats/MyChats";

const Chat = () => {
  const [chats, setChats] = useState(null);

  const { user } = ChatState();

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     const response = await axios.get("http://localhost:3000/api/chat");
  //     setChats(response.data.chats);
  //   };

  //   fetchChats();
  // }, []);  const [sheetOpen, setSheetOpen] = useState(false);


  return (
    <div className="bg-background h-screen">
      {user && <SideDrawer />}
      {user && <MyChats />}
    </div>
  );
};

export default Chat;
