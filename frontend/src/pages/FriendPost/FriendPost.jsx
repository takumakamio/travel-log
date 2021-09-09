import Plus from "../../components/Plus/Plus";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./friendPost.css";

const FriendPost = () => {
  return (
    <>
      <div className="friendPostContainer">
        <Leftbar />
        <Feed />
        <Rightbar />
        <Plus />
      </div>
    </>
  );
};

export default FriendPost;
