import { ChatState } from "@/context/chat.provider";
import { Button } from "../ui/button";
import { getSender } from "@/utils/chat.utils";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChats, setSelectedChats } = ChatState();
  return (
    <>
      {selectedChats ? (
        <div>
          <h3>
            {!selectedChats.isGroupChat ? (
              <>{getSender(user, selectedChats.users)}</>
            ) : (
              <>{selectedChats.chatName}</>
            )}
          </h3>
          <Button onClick={() => setSelectedChats("")}>Back </Button>
        </div>
      ) : (
        <>
          <h3>Select a user to start a chat</h3>
        </>
      )}
    </>
  );
};

export default SingleChat;
