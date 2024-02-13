import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const GroupChatModal = ({ open, setIsOpen }) => {
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
                group chat
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

export default GroupChatModal;
