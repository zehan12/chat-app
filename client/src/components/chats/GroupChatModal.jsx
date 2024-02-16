import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "preact/hooks";
import { ChatState } from "@/context/chat.provider";
import axios from "axios";

const GroupChatModal = () => {
  const { user } = ChatState();
  const [groupName, setGroupName] = useState("");
  const [usersList, setUsersList] = useState([]);
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

  const handleGroupChat = async (userToAdd) => {
    if (selectedUsers.included(userToAdd)) {
      console.log("user already selected");
    }
    return;

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
            <Input placeholder="Enter Group Name" />
          </div>
          <br />
          <div className="w-full flex flex-col gap-2">
            <h3>Add User</h3>
            <Input
              placeholder="Add User"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <br />
          <div className="h-10 bg-red-800 w-full overflow-y-auto">
            {selectedUsers.map((user)=>(<></>))}
            {loading ? (
              <p>Loading...</p>
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <div onClick={() => handleGroupChat(user)}>
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
            <Button className="w-full" type="button" variant="secondary">
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default GroupChatModal;