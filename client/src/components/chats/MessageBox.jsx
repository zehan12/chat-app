import { ChatState } from "@/context/chat.provider";
import SingleChat from "./SingleChat";

const MessageBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChats } = ChatState();
  console.log(selectedChats, "selected-chats in Message box");

  return (
    <>
      <div
        className={`${
          selectedChats ? "flex" : "hidden"
        } w-full h-screen md:flex justify-center items-center bg-rose-700`}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </>
  );
};

export default MessageBox;
