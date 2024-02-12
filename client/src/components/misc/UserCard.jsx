const UserCard = ({ id, email, avatar, name, getUserChat }) => {
  return (
    <>
      <section
        onClick={() => getUserChat(id)}
        className="mb-2 border bg-background p-2 rounded-lg max-w-full cursor-pointer"
      >
        <div className="mx-auto">
          <div className="card md:flex gap-3 max-w-lg">
            <div className="w-14 h-14 mx-auto flex-shrink-0">
              <img className="object-cover rounded-full" src={avatar} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <p className="font-bold">{email}</p>
              <h3 className="text-md heading">{name}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCard;
