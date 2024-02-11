import { useState } from "preact/hooks";
import { Search, Bell } from "lucide-react";
import Tooltip from "../shared/Tooltip/index";
import { Button } from "../ui/button";
import ThemeToggle from "../ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import Profile from "./Profile";
import { Sheet, SheetTrigger } from "../ui/sheet";
import Drawer from "./Drawer";
import axios from "axios";
import { ChatState } from "@/context/chat.provider";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { user } = ChatState();

  const handleSearchUsers = async (e) => {
    const searchParam = e.target.value;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user?search=${searchParam}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center bg-background p-1 px-6">
          <Sheet>
            <SheetTrigger>
              <Tooltip text="Search Users for Chat">
                <Search />
                <Button variant="ghost">Search User</Button>
              </Tooltip>
            </SheetTrigger>
            <Drawer
              searchResult={searchResult}
              handleSearchUsers={handleSearchUsers}
              loading={loading}
            />
          </Sheet>
          <div className="flex justify-center items-center gap-2">
            <Bell />
            <Profile
              open={isProfileDialogOpen}
              setIsOpen={setIsProfileDialogOpen}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-9" variant="ghost">
                  <Avatar size="xs">
                    <AvatarImage src="https://github.com/zehan12.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => setIsProfileDialogOpen(true)}
                  >
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Keyboard shortcuts
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
