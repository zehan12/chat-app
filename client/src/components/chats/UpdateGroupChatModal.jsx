import { useState } from "preact/hooks";
import axios from "axios";
import UserBadge from "../users/UserBadge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { ChatState } from "@/context/chat.provider";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, setClose }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [renameLoading, setRenameLoading] = useState();
  const { selectedChats, setSelectedChats, user } = ChatState();

  console.log(selectedChats, "update group modal");

  const handleRemoveUser = async (userId) => {
    if (selectedChats.groupAdmin !== user.id && userId !== user.id) {
      console.log("only admin can remove from group");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(config)
      const { data } = await axios.delete(
        "http://localhost:3000/api/chat/remove-from-group",
        {
          data: {
            chatId: selectedChats._id,
            userId: userId,
          },
          headers: config.headers,
        }
      );

      userId === user._id ? setSelectedChats() : setSelectedChats(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (addUser) => {
    console.log(addUser._id, selectedChats.users, "both");
    if (selectedChats.users.find((user) => user._id === addUser._id)) {
      console.log("user is already in the group");
      return;
    }
    if (selectedChats.groupAdmin._id !== addUser._id) {
      console.log("only admin can add user");
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:3000/api/chat/add-to-group",
        {
          chatId: selectedChats._id,
          userId: addUser._id,
        },
        config
      );
      setSelectedChats(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      setClose(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setGroupChatName("");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:3000/api/chat/rename",
        {
          chatId: selectedChats._id,
          chatName: groupChatName,
        },
        config
      );
      console.log(data, "rename data");
      setSelectedChats(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (err) {
      console.log(err.message);
      setRenameLoading(false);
      setGroupChatName("");
    } finally {
      setRenameLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedChats.chatName}</DialogTitle>
          <DialogDescription>Update the group from here</DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <h5>{selectedChats?.chatName}</h5>
          </div>
          <div className="flex py-5 gap-3">
            {selectedChats?.users?.map((user) => (
              <UserBadge
                id={user._id}
                name={user.name}
                onClick={handleRemoveUser}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="chat name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button onClick={handleRename}>Rename</Button>
          </div>
          <div>
            <Input
              placeholder="Add user to group"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="h-10 bg-red-800 w-full overflow-y-auto">
              {loading ? (
                <p>Loading...</p>
              ) : (
                searchResult?.map((user) => (
                  <div onClick={() => handleAddUser(user)} onKeyUp={null}>
                    {user.name}
                    {user.email}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
};

export default UpdateGroupChatModal;
