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
import { AuthContext } from "./context/auth/AuthContext";
import Settings from "./pages/Setting/Settings";

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
        {/* <Route path="/write">{user ? <Write /> : <Register />}</Route> */}
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        {/* <Route path="/post/:postId"> */}
        {/* <Single />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
