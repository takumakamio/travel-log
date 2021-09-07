import { Container } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import Post from "../Post/Post";
import axios from "axios";
import Share from "../Share/Share";
import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
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
