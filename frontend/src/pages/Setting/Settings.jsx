import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";
import Leftbar from "../../components/Leftbar/Leftbar";
import storage from "../../firebase";
import { Grid, CircularProgress } from "@material-ui/core";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import "./settings.css";

export default function Settings() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [city, setCity] = useState();
  const [from, setFrom] = useState();
  const [success, setSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // for firebase storage
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/user/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setProfilePicture((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
            setLoading(false);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePicture, label: "img" }]);
    setLoading(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    setLoading(true);
    const updatedUser = {
      userId: user._id,
      username,
      email,
      profilePicture,
      password,
      city,
      from,
    };
    try {
      const res = await axios.put("/users/" + user._id, updatedUser, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <Grid item sm={2} xs={2}>
        <Leftbar />
      </Grid>
      <Grid item sm={10} xs={10}>
        <div className="settingsWrapper">
          <div className="settingsTitle"></div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>プロフィール写真</label>
            <div className="settingsPP">
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture.img
                    : PF + "/noAvatar.png"
                }
                alt=""
              />
              <label htmlFor="file">
                <PersonRoundedIcon className="settingsPPIcon" />
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
            {profilePicture && (
              <button
                className="settingsSubmitButton"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading && profilePicture ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  profilePicture && <span>写真をアップロード</span>
                )}
              </button>
            )}
            <label>ユーザーネーム</label>
            <input
              type="text"
              required
              defaultValue={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Eメール</label>
            <input
              type="email"
              required
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>出身</label>
            <input
              type="text"
              defaultValue={user.from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <label>居住地</label>
            <input
              type="text"
              defaultValue={user.city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label>パスワード</label>
            <input
              type="password"
              required
              minLength="6"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="settingsSubmitButton"
              onClick={handleSubmit}
            >
              アップデート
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                更新完了...
              </span>
            )}
          </form>
        </div>
      </Grid>
    </div>
  );
}
