import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Profile = ({ open, setIsOpen }) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View profile</DialogTitle>
            <DialogDescription>Your profile is here.</DialogDescription>
          </DialogHeader>
          <div className="">
            <div class="w-full flex justify-center">
              <img
                class="h-56 w-56 rounded-full object-cover transition duration-1000  ease-linear hover:scale-110 hover:rounded-none"
                src="https://github.com/zehan12.png"
                alt="pp"
              />
            </div>
            <br />
            <div>
              <div>Name</div>
              <div>Zehan Khan</div>
              <br />
              <div>Email</div>
              <div>zehan125@gmail.com</div>
              <br />
              <div>Status</div>
              <div>the things you own end up owning you</div>
              <br />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
