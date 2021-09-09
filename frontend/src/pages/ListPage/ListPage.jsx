import { useEffect, useState } from "react";
import Plus from "../../components/Plus/Plus";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./listPage.css";
import axios from "axios";
import List from "../../components/List/List";

const ListPage = () => {
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
      <div className="listPageContainer">
        <Leftbar />
        <List />
        <Rightbar />
        <Plus />
      </div>
    </>
  );
};

export default ListPage;
