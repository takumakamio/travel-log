import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">レジスター</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>名前</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Username"
          required
          ref={username}
        />
        <label>Eメール</label>
        <input
          className="registerInput"
          required
          type="email"
          placeholder="Enter your email..."
          ref={email}
        />
        <label>パスワード</label>
        <input
          placeholder="Password"
          required
          ref={password}
          className="registerInput"
          type="password"
          minLength="6"
        />
        <input
          placeholder="Password Again"
          required
          ref={passwordAgain}
          className="registerInput"
          type="password"
          minLength="6"
        />
        <button className="registerButton">レジスター</button>
      </form>
      <button className="registerLoginButton" type="submit">
        <Link to="/login" className="link">
          ログイン
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong
        </span>
      )}
    </div>
  );
}
