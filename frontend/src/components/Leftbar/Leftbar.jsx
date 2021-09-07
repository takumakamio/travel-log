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
import { useStyles } from "./styles";

const Leftbar = () => {
  const classes = useStyles();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h6" className={classes.logoLg}>
        Travel Log
      </Typography>
      <Typography variant="h6" className={classes.logoSm}>
        TLG
      </Typography>
      <Link to="/" className="link">
        <div className={classes.item}>
          <Home className={classes.icon} />
          <Typography className={classes.text}>Home</Typography>
        </div>
      </Link>
      <Link to="/map" className="link">
        <div className={classes.item}>
          <MapIcon className={classes.icon} />
          <Typography className={classes.text}>Map</Typography>
        </div>
      </Link>
      <div className={classes.item}>
        <Person className={classes.icon} />
        <Typography className={classes.text}>Friends</Typography>
      </div>
      <div className={classes.item}>
        <FilterIcon className={classes.icon} />
        <Typography className={classes.text}>All User's Posts</Typography>
      </div>

      <div className={classes.item}>
        <FilterBAndWIcon className={classes.icon} />
        <Typography className={classes.text}>Following Posts</Typography>
      </div>
      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>Collections</Typography>
      </div>
      <Link to={`/settings/${user?._id}`} className="link">
        <div className={classes.item}>
          <Settings className={classes.icon} />
          <Typography className={classes.text}>Settings</Typography>
        </div>
      </Link>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text} onClick={handleLogout}>
          Logout
        </Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
