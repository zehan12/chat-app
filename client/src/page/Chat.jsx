import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { Button } from "../components/ui/button";
import { ChatState } from "@/context/chat.provider";
import SideDrawer from "@/components/misc/SideDrawer";
import MyChats from "@/components/chats/MyChats";
import MessageBox from "@/components/chats/MessageBox";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="bg-background h-screen">
      {user && <SideDrawer />}
      <div className="flex justify-evenly items-center">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <MessageBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chat;
