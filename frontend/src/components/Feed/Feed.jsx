import { Container } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import Post from "../Post/Post";
import axios from "axios";
import Share from "../Share/Share";
import "./feed.css";

const Feed = ({ username, allPosts }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      let res;
      if (username) {
        res = await axios.get("/posts/profile/" + username);
      } else if (allPosts) {
        res = await axios.get("/posts");
      } else {
        res = await axios.get("/posts/timeline/" + user._id);
      }

      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user?._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
