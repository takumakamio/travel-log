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
import Top from "./pages/Top/Top";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/map">
          {user ? <MyMap /> : <Login />}
        </Route>
        <Route path="/map/:id">{user ? <FriendMap /> : <Login />}</Route>
        <Route path="/profile/:id">{user ? <Profile /> : <Register />}</Route>
        <Route exact path="/followers">
          {user ? <FriendPost /> : <Login />}
        </Route>
        <Route exact path="/list">
          {user ? <ListPage /> : <Login />}
        </Route>
        <Route path={`/settings/${user?._id}`}>
          {user ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
