import { useEffect, useState } from "react";
import axios from "axios";
import Leftbar from "../../components/Leftbar/Leftbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Plus from "../../components/Plus/Plus";
import { useParams } from "react-router";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const friendId = useParams().id;
  console.log(friendId);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${friendId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [friendId]);

  return (
    <>
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? user.coverPicture.img
                    : PF + "/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? user.profilePicture.img
                    : PF + "/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed friendId={friendId} />
            <Rightbar user={user} />
            <Plus />
          </div>
        </div>
      </div>
    </>
  );
}
