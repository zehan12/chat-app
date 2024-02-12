import axios from "axios";
import { ChatState } from "@/context/chat.provider";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const MyChats = () => {
  const {
    chats,
    selectedChats,
    setChats,
    setSelectedChats,
    setUser,
    userInfo,
    user,
  } = ChatState();

  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/chat/`,
        config
      );
      setChats(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <>
      <div className={`${selectedChats ? "flex" : "hidden"} w-full md:flex`}>
        <div className="w-full bg-purple-500">
          <div className="flex justify-between items-center px-4 py-6">
            <h1 className="text-3xl">My Chats</h1>
            <Button variant="default">
              New Group Chat
              {" "}
              <Plus size={16} />
            </Button>
          </div>
          <div className="flex flex-col overflow-y-hidden">
            {chats.map((chat)=>(<div key={chat.id}>
              <h4>{chat.chatName} {"  "} {chat.users}</h4>
            </div>))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats;
