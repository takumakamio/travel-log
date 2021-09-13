import "./post.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [postUser, setPostUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setPostUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
  }, [currentUser?._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put(
        "/posts/" + post._id + "/like",
        { userId: currentUser._id },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/posts/${post._id}`,
        {
          data: { userId: currentUser._id },
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      window.location.replace(`/profile/${currentUser._id}`);
    } catch (err) {}
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${postUser._id}`}>
              <img
                className="postProfileImg"
                src={
                  postUser.profilePicture
                    ? postUser.profilePicture.img
                    : PF + "/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{postUser.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {post.userId === currentUser?._id && (
              <DeleteOutlineIcon
                onClick={handleDelete}
                style={{ fontSize: "30px" }}
              />
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.title}</span>
          <img className="postImg" src={post.img?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />

            <span className="postLikeCounter">{like} いいね</span>
          </div>
          <div className="postBottomRight">
            <span className="postCategoryText">
              カテゴリー: {post.categories}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
