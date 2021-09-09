import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Setting/Settings";
import Profile from "./pages/Profile/Profile";
import MyMap from "./pages/MyMap/MyMap";
import FriendPost from "./pages/FriendPost/FriendPost";
import ListPage from "./pages/ListPage/ListPage";
import FriendMap from "./pages/FriendMap/FriendMap";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/mymap">{user ? <MyMap /> : <Login />}</Route>
        <Route path="/map">{user ? <FriendMap /> : <Login />}</Route>
        <Route path="/followers">{user ? <FriendPost /> : <Login />}</Route>
        <Route path="/list">{user ? <ListPage /> : <Login />}</Route>
        <Route path={`/settings/${user?._id}`}>
          {user ? <Settings /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Register />}
        </Route>
        {/* <Route path="/post/:postId"> */}
        {/* <Single />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
