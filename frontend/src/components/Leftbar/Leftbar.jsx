import "./leftbar.css";
import { Container, Typography } from "@material-ui/core";
import {
  Bookmark,
  ExitToApp,
  Home,
  Person,
  Settings,
} from "@material-ui/icons";
import FilterIcon from "@material-ui/icons/Filter";
import FilterBAndWIcon from "@material-ui/icons/FilterBAndW";
import MapIcon from "@material-ui/icons/Map";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const Leftbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <div className="leftbarTitle">Travel Log</div>
        <ul className="leftbarList">
          <Link to="/" className="link">
            <li className="leftbarListItem">
              <Home className="leftbarIcon" />
              <span className="leftbarListItemText">ホーム</span>
            </li>
          </Link>
          <Link to="/map" className="link">
            <li className="leftbarListItem">
              <MapIcon className="leftbarIcon" />
              <span className="leftbarListItemText">マップ</span>
            </li>
          </Link>
          <li className="leftbarListItem">
            <Person className="leftbarIcon" />
            <span className="leftbarListItemText">フレンド</span>
          </li>
          <li className="leftbarListItem">
            <FilterIcon className="leftbarIcon" />
            <span className="leftbarListItemText">みんなのぽすと</span>
          </li>
          <li className="leftbarListItem">
            <FilterBAndWIcon className="leftbarIcon" />
            <span className="leftbarListItemText">フレンドポスト</span>
          </li>
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
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
