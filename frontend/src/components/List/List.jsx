import "./list.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { Grid } from "@material-ui/core";

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
        <Grid item sm={6} xs={6}>
          <div className="listWrapper">
            <h4 className="listTitleFollowings">
              フォロー ({followings.length}人)
            </h4>
            <div className="listFollowings">
              {followings.map((following) => (
                <div className="listFollowingWrapper">
                  <Link
                    to={"/profile/" + following._id}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={
                        following.profilePicture
                          ? PF + following.profilePicture
                          : PF + "/noAvatar.png"
                      }
                      alt=""
                      className="listFollowingImg"
                    />
                  </Link>
                  <span className="listFollowingName">
                    {following.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid item sm={6} xs={6}>
          <div className="listWrapper">
            <h4 className="listTitleFollowers">
              フォロワー({followers.length}人)
            </h4>
            <div className="listFollowings">
              {followers.map((follower) => (
                <Link
                  to={"/profile/" + follower._id}
                  style={{ textDecoration: "none" }}
                >
                  <div className="listFollowingWrapper">
                    <img
                      src={
                        follower.profilePicture
                          ? PF + follower.profilePicture
                          : PF + "/noAvatar.png"
                      }
                      alt=""
                      className="listFollowersImg"
                    />
                    <span className="listFollowersName">
                      {follower.username}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default List;
