import { ChatState } from "@/context/chat.provider";
import SingleChat from "./SingleChat";

const MessageBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChats } = ChatState();
  console.log(selectedChats, "selected-chats");

  return (
    <>
      <div
        className={`${
          selectedChats ? "flex" : "hidden"
        } w-full h-screen md:flex bg-rose-700`}
      >
        <div>message box</div>
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </>
  );
};

export default MessageBox;
