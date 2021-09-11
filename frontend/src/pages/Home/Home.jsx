import { useEffect, useState } from "react";
import Plus from "../../components/Plus/Plus";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./home.css";
import axios from "axios";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setAllPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="homeContainer">
        <Leftbar />
        <Feed allPosts={allPosts} />

        <Plus />
      </div>
    </>
  );
};

export default Home;
