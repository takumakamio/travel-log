import "./list.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const List = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getFollowings = async () => {
      try {
        const followings = await axios.get(
          "/users/followings/" + currentUser._id,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFollowings(followings.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
  }, [currentUser]);

  useEffect(() => {
    const getfollowers = async () => {
      try {
        const followers = await axios.get(
          "/users/followers/" + currentUser._id,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFollowers(followers.data);
      } catch (err) {
        console.log(err);
      }
    };
    getfollowers();
  }, [currentUser]);

  return (
    <>
      <div className="listContainer">
        <div className="listWrapper">
          <h4 className="listTitle">フォロー ({followings.length}人)</h4>
          <div className="listFollowings">
            {followings.map((following) => (
              <Link
                to={"/profile/" + following.username}
                style={{ textDecoration: "none" }}
              >
                <div className="listFollowing">
                  <img
                    src={
                      following.profilePicture
                        ? PF + following.profilePicture
                        : PF + "/noAvatar.png"
                    }
                    alt=""
                    className="listFollowingImg"
                  />
                  <span className="listFollowingName">
                    {following.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="listWrapper">
          <h4 className="listTitle">フォロワー({followers.length}人)</h4>
          <div className="listFollowings">
            {followers.map((follower) => (
              <Link
                to={"/profile/" + follower.username}
                style={{ textDecoration: "none" }}
              >
                <div className="listFollowing">
                  <img
                    src={
                      follower.profilePicture
                        ? PF + follower.profilePicture
                        : PF + "/noAvatar.png"
                    }
                    alt=""
                    className="listFollowingImg"
                  />
                  <span className="listFollowingName">{follower.username}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
