import axios from "axios";
import { ChatState } from "@/context/chat.provider";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { getSender } from "@/utils/chat.utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
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
  const [isCreateGroupChatOpen, setCreateGroupChatOpen] = useState(false);

  const fetchChats = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3000/api/chat/",
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
  }, [fetchAgain]);

  console.log(chats, "chats", loggedUser);
  return (
    <>
      <div className={`${selectedChats ? "flex" : "hidden"} w-full md:flex`}>
        <div className="w-full min-h-screen bg-purple-500">
          <div className="flex justify-between items-center px-4 py-6">
            <h1 className="text-3xl">My Chats</h1>
            <Dialog
              open={isCreateGroupChatOpen}
              onOpenChange={setCreateGroupChatOpen}
            >
              <DialogTrigger>
                <Button
                  variant="default"
                  onSelect={() => setCreateGroupChatOpen(true)}
                >
                  New Group Chat <Plus size={16} />
                </Button>
              </DialogTrigger>
              <GroupChatModal setClose={setCreateGroupChatOpen} />
            </Dialog>
          </div>
          <div className="flex flex-col overflow-y-hidden">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`${
                  selectedChats === chat ? "bg-green-400 text-red-700" : ""
                } `}
              >
                <h4>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats;
