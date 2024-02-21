const ProfileModal = ({ user }) => {
  return (
    <div className="w-80 h-40 bg-green-500">
        <p>Profile modal</p>
      <h1>{user.name}</h1>
      <img className="w-12 h-12 rounded-full" src={user.avatar} />
    </div>
  );
};

export default ProfileModal;
