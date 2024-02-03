import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import { Button } from "../components/ui/button";

const Chat = () => {
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.get("http://localhost:3000/api/chat");
      setChats(response.data.chats);
    };

    fetchChats();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-red-700">
      <h1 className="text-center text-3xl text-white p-4">Chat</h1>
      {chats?.length &&
        chats.map(({ chatName, id }) => {
          console.log(chatName);
          return (
            <div className="text-white" key={id}>
              {chatName}
            </div>
          );
        })}
      <Button className="w-40 bg-purple-600 hover:bg-purple-500 m-8">
        send
      </Button>{" "}
    </div>
  );
};

export default Chat;
