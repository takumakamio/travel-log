import "./leftbar.css";
import {
  Bookmark,
  ExitToApp,
  Home,
  Laptop,
  Person,
  Settings,
  VpnKey,
} from "@material-ui/icons";
import GroupIcon from "@material-ui/icons/Group";
import FilterIcon from "@material-ui/icons/Filter";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import MapIcon from "@material-ui/icons/Map";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const Leftbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <div className="leftbarTitle">
          <div className="leftbarTitleIcon">
            <LoyaltyIcon />
          </div>
          <div className="leftbarTitleLetter">Travel Log </div>
        </div>
        <ul className="leftbarList">
          {user ? (
            <>
              <Link to="/" className="link">
                <li className="leftbarListItem">
                  <Home className="leftbarIcon" />
                  <span className="leftbarListItemText">ホーム</span>
                </li>
              </Link>
              <Link to="/mymap" className="link">
                <li className="leftbarListItem">
                  <MapIcon className="leftbarIcon" />
                  <span className="leftbarListItemText">マイマップ</span>
                </li>
              </Link>
              <Link to={`/profile/${user.username}`} className="link">
                <li className="leftbarListItem">
                  <Person className="leftbarIcon" />
                  <span className="leftbarListItemText">マイポスト</span>
                </li>
              </Link>
              <Link to={"/followers"} className="link">
                <li className="leftbarListItem">
                  <FilterIcon className="leftbarIcon" />
                  <span className="leftbarListItemText">フレンドポスト</span>
                </li>
              </Link>
              <Link to={"/list"} className="link">
                <li className="leftbarListItem">
                  <GroupIcon className="leftbarIcon" />
                  <span className="leftbarListItemText">フレンドリスト</span>
                </li>
              </Link>
              <li className="leftbarListItem">
                <Bookmark className="leftbarIcon" />
                <span className="leftbarListItemText">コレクション</span>
              </li>
              <Link to={`/settings/${user?._id}`} className="link">
                <li className="leftbarListItem">
                  <Settings className="leftbarIcon" />
                  <span className="leftbarListItemText">セッティング</span>
                </li>
              </Link>
              <li className="leftbarListItem">
                <ExitToApp className="leftbarIcon" />
                <span className="leftbarListItemText" onClick={handleLogout}>
                  ログアウト
                </span>
              </li>
            </>
          ) : (
            <>
              <Link to={"/register"} className="link">
                <li className="leftbarListItem">
                  <Laptop className="leftbarIcon" />
                  <span className="leftbarListItemText">レジスター</span>
                </li>
              </Link>
              <Link to={"/login"} className="link">
                <li className="leftbarListItem">
                  <VpnKey className="leftbarIcon" />
                  <span className="leftbarListItemText">ログイン</span>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
