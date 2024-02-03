import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-red-700">
        <h1 className="text-center text-3xl text-white p-4">Home</h1>
        <Button className="w-40 bg-purple-600 hover:bg-purple-500 m-8">
          send
        </Button>{" "}
      </div>
    </>
  );
};

export default Home;
