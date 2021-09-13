import { useEffect, useState } from "react";
import axios from "axios";
import Leftbar from "../../components/Leftbar/Leftbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useParams } from "react-router";
import "./profile.css";
import { Grid } from "@material-ui/core";

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
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? user.coverPicture.img
                      : PF + "/noCover.jpg"
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
              <Grid item sm={8} xs={0}>
                <div className="profileRightBottomFeed">
                  <Feed friendId={friendId} />
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                <div className="profileRightBottomRightbar">
                  <Rightbar user={user} />
                </div>
              </Grid>
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
}
