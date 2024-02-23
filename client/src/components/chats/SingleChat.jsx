import { ChatState } from "@/context/chat.provider";
import { Button } from "../ui/button";
import { User, ArrowLeft, UserRoundCog } from "lucide-react";
import { getSender, getSenderData } from "@/utils/chat.utils";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ProfileModal from "../users/ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "preact/hooks";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChats, setSelectedChats } = ChatState();
  const [isProfileViewOpen, setProfileViewOpen] = useState(false);
  const [isUpdateGroupChatOpen, setUpdateGroupChatOpen] = useState(false);

  return (
    <div className="w-full bg-green-600 h-screen">
      {selectedChats ? (
        <div className="flex items-center bg-amber-500">
          <Button variant="ghost" onClick={() => setSelectedChats("")}>
            <ArrowLeft />{" "}
          </Button>
          <div className="flex items-center gap-1">
            {!selectedChats.isGroupChat ? (
              <div className="flex justify-center items-center">
                <Dialog
                  open={isProfileViewOpen}
                  onOpenChange={setProfileViewOpen}
                >
                  <DialogTrigger>
                    <Button
                      variant="ghost"
                      className=" hover:bg-transparent"
                      onSelect={() => setProfileViewOpen(true)}
                    >
                      <Avatar size="xs">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DialogTrigger>
                  <ProfileModal
                    user={getSenderData(user, selectedChats.users)}
                    setClose={setProfileViewOpen}
                  />
                </Dialog>
                <h3>{getSender(user, selectedChats.users)}</h3>
              </div>
            ) : (
              <div className="w-full flex flex-row justify-between items-center">
                <div>
                  <h4>{selectedChats.chatName}</h4>
                </div>
                <div>
                  <Dialog
                    open={isUpdateGroupChatOpen}
                    onOpenChange={setUpdateGroupChatOpen}
                  >
                    <DialogTrigger>
                      <Button
                        variant="ghost"
                        className=" hover:bg-transparent"
                        onSelect={() => setUpdateGroupChatOpen(true)}
                      >
                        <UserRoundCog />
                      </Button>
                    </DialogTrigger>
                    <UpdateGroupChatModal
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                      setClose={setUpdateGroupChatOpen}
                    />
                  </Dialog>
                </div>
              </div>
            )}
            {/* <div className="flex items-center">
              <h5>s</h5>
              <div>s</div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center ">
          <h3>Select a user to start a chat</h3>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
