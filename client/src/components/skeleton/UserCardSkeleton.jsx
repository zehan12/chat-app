import { Skeleton } from "../ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <section class="mb-2 border bg-background p-2 rounded-lg max-w-full cursor-pointer">
      <div class="mx-auto">
        <div class="card md:flex gap-3 max-w-lg">
          <Skeleton className="h-10 w-12 rounded-full" />
          <div class="flex flex-col flex-grow gap-1 text-center md:text-left">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCardSkeleton;
