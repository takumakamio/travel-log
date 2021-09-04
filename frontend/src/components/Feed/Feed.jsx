import { Container } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import Post from "../Post/Post";
import { useStyles } from "./styles";
import axios from "axios";
import Share from "../Share/Share";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username, {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
        : await axios.get("posts/timeline/" + user._id, {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <Container className={classes.container}>
      <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Feed;
