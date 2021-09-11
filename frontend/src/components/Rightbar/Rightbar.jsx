import "./rightbar.css";
import Friend from "../Friend/Friend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Add, Map, Remove } from "@material-ui/icons";
import { AuthContext } from "../../context/auth/AuthContext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  const handleClick = async () => {
    const followedId = {
      userId: currentUser._id,
    };
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, followedId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setFollowed(false);
      } else {
        await axios.put(`/users/${user._id}/follow`, followedId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        setFollowed(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user?._id, currentUser.followings]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/followings/" + user._id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, followed]);

  const handleToMap = (e) => {
    e.preventDefault();
    history.push(`/map/${user._id}`);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        {/* <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Friend key={u.id} user={u} />
          ))}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="profileRightbarContainer">
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
          <Link to={`/map/${user._id}`} className="Link">
            <Map
              style={{
                fontSize: "60px",
                color: "teal",
              }}
              onClick={handleToMap}
            />
          </Link>

          <h4 className="rightbarTitle">ユーザー情報</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">居住地:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">出身:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
          </div>
          <h4 className="rightbarTitle">フォロー</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link to={"/profile/" + friend._id} className="Link">
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture.img
                        : PF + "/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
