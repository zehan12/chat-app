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

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const handleDrawerClose = () => {};
  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center bg-background p-1 px-6">
          <Tooltip text="Search Users for Chat">
            <Search />
            <Button variant="ghost">Search User</Button>
          </Tooltip>
          <div className="flex justify-center items-center gap-2">
            <Bell />
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
                  <DropdownMenuItem>
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
        <div className="fixed z-40 h-screen p-4 overflow-y-auto bg-amber-400/90 text-foreground w-56 left"></div>
      </div>
    </>
  );
};

export default SideDrawer;
