import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import UserCard from "./UserCard";
import UserCardSkeleton from "../skeleton/UserCardSkeleton";

const Drawer = ({ handleSearchUsers, searchResult, loading, getUserChat }) => {
  return (
    <>
      <SheetContent
        className="overflow-y-auto"
        style={{ zIndex: 999 }}
        side={"left"}
      >
        <SheetHeader>
          <SheetTitle>Search Users</SheetTitle>
          <hr />
          <SheetDescription>
            <div className="w-full max-w-sm relative">
              <Search className="w-5 h-5 absolute left-2.5 top-2 text-gray-500 dark:text-gray-400" />
              <Input
                onChange={handleSearchUsers}
                className="pl-10"
                placeholder="Search users for chat..."
                type="search"
              />
            </div>
          </SheetDescription>
        </SheetHeader>
        <br />
        <div>
          <h1>Results</h1>
          {Array.isArray(searchResult) && searchResult.length > 0
            ? searchResult.map(({ _id, email, avatar, name }) => (
                <SheetClose asChild>
                  <UserCard
                    key={_id}
                    id={_id}
                    email={email}
                    avatar={avatar}
                    name={name}
                    getUserChat={getUserChat}
                  />
                </SheetClose>
              ))
            : searchResult.length !== 0 && <p>No results found.</p>}
          {loading &&
            Array.from({ length: 10 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
        </div>
      </SheetContent>
    </>
  );
};

export default Drawer;
