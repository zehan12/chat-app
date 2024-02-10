import { useState } from "preact/hooks";
import { Search } from "lucide-react";
import Tooltip from "../shared/Tooltip/index";
import { Button } from "../ui/button";

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
            <Search/>
            <Button variant="ghost">Search User</Button>
          </Tooltip>
        </div>
        <div className="fixed z-40 h-screen p-4 overflow-y-auto bg-amber-400/90 text-foreground w-56 left"></div>
      </div>
    </>
  );
};

export default SideDrawer;
