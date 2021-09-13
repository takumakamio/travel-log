import "./login.css";
import { useRef, useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import { loginCall } from "../../context/auth/AuthApi";
import { AuthContext } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
      console.log(dispatch)
    );
  };

  return (
    <div className="login">
      <span className="loginTitle">ログイン</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Eメール</label>
        <input
          placeholder="Email"
          type="email"
          className="loginInput"
          ref={email}
          required
          autoComplete={true}
        />
        <label>パスワード</label>
        <input
          placeholder="Password"
          type="password"
          className="loginInput"
          minLength="6"
          ref={password}
          required
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? (
            <CircularProgress color="white" size="20px" />
          ) : (
            "ログイン"
          )}
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          レジスター
        </Link>
      </button>
    </div>
  );
}
