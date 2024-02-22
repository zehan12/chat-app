import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

const ProfileModal = ({ user, setClose }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>User Info</DialogTitle>
        <DialogDescription>Info about the user</DialogDescription>
      </DialogHeader>
      <div>
        <div className="w-full flex justify-center items-center px-5 gap-4">
          <img className="h-40 w-40 rounded-full" alt="pp" src={user.avatar} />
        </div>
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <h3>About</h3>
          <p>desc...</p>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button className="w-full" type="button" variant="destructive">
            close
          </Button>
        </DialogClose>{" "}
      </DialogFooter>
    </DialogContent>
  );
};

export default ProfileModal;
