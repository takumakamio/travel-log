import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Setting/Settings";
import Profile from "./pages/Profile/Profile";
import { AuthContext } from "./context/auth/AuthContext";

import MapPage from "./pages/MapPage/MapPage";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/map">{user ? <MapPage /> : <Register />}</Route>
        <Route path={`/settings/${user?._id}`}>
          {user ? <Settings /> : <Register />}
        </Route>
        <Route path={`/profile/${user?.username}`}>
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
