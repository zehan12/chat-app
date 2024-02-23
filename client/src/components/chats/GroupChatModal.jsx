import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "preact/hooks";
import { ChatState } from "@/context/chat.provider";
import axios from "axios";
import UserBadge from "../users/UserBadge";

const GroupChatModal = ({ setClose }) => {
  const { user, chats, setChats } = ChatState();
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

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

  const handleAddUser = async (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("user already selected");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleRemoveUser = async (id) => {
    const filteredArr = selectedUsers.filter((user) => id !== user._id);
    console.log(filteredArr,"false coming from here")
    setSelectedUsers(filteredArr);
  };

  const handleCreateGroup = async () => {
    if (!groupName || !selectedUsers) {
      console.log("fill all  details");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const usersArray = selectedUsers.map((user) => user._id);
      const { data } = await axios.post(
        "http://localhost:3000/api/chat/group",
        {
          name: groupName,
          users: JSON.stringify(usersArray),
        },
        config
      );
      setChats([data, ...chats]);
      setClose(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Add member to the group.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-x-2">
          <div className="w-full flex flex-col gap-2">
            <h3>Group Name</h3>
            <Input
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Group Name"
            />
          </div>
          <br />
          <div className="w-full flex flex-col gap-2">
            <h3>Add User</h3>
            <Input
              placeholder="Add User"
              onChange={(e) => handleSearch(e.target.value)}
              onKeyup={(e)=>{
                
              }} 
            />
          </div>
          <br />
          <div className="w-full h-10 flex justify-start flex-wrap gap-3">
            {selectedUsers.map((user) => (
              <UserBadge
                onClick={handleRemoveUser}
                id={user._id}
                name={user.name}
              />
            ))}
          </div>
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
        <DialogFooter className="flex gap-3 sm:justify-start">
          <DialogClose asChild>
            <Button className="w-full" type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <div className="w-full">
            <Button
              onClick={handleCreateGroup}
              className="w-full"
              type="button"
              variant="secondary"
            >
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default GroupChatModal;
