const UserCard = ({ email, avatar, name }) => {
  return (
    <>
      <section class="mb-2 border bg-background p-2 rounded-lg max-w-full cursor-pointer">
        <div class="mx-auto">
          <div class="card md:flex gap-3 max-w-lg">
            <div class="w-14 h-14 mx-auto flex-shrink-0">
              <img class="object-cover rounded-full" src={avatar} />
            </div>
            <div class="flex-grow text-center md:text-left">
              <p class="font-bold">{email}</p>
              <h3 class="text-md heading">{name}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCard;
