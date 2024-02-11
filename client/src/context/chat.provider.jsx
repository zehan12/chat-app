import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChats, setSelectedChats] = useState();
  const [chats, setChats] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) return navigate("/signin");
    setUser(user);
  }, []);

  const setUserToLocalStorage = (userInfo) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    return;
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        setUserToLocalStorage,
        selectedChats,
        setSelectedChats,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
