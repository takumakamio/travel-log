import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import PublicIcon from "@material-ui/icons/Public";
import "./settings.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";
import Rightbar from "../../components/Rightbar/Rightbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import storage from "../../firebase";
import { CircularProgress } from "@material-ui/core";

export default function Settings() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
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
            setCoverPicture((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
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
    const updatedUser = {
      userId: user._id,
      username,
      email,
      profilePicture,
      password,
    };

    try {
      const res = await axios.put("/users/" + user._id, updatedUser, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <Leftbar />
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
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

          <label>Username</label>
          <input
            type="text"
            required
            defaultValue={user.username}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            required
            defaultValue={user.email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            required
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
          />

          {uploaded === 1 ? (
            <button
              type="submit"
              className="settingsSubmitButton"
              onClick={handleSubmit}
            >
              Update
            </button>
          ) : (
            <button
              className="settingsSubmitButton"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                " Upload"
              )}
            </button>
          )}
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
