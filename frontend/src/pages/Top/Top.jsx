import "./top.css";
import { init } from "ityped";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Intro() {
  const textRef = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["旅の写真を", "みんなに共有して", "旅に出よう"],
    });
  }, []);

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imgContainer">
          <img src={PF + "/pin.png"} alt="" className="topImg" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>ようこそ</h2>
          <h1>TraveLogへ</h1>
          <h3>
            <span ref={textRef}></span>
          </h3>
          <div className="buttonWrapper">
            <Link to="/login" className="link">
              <div className="loginButton">ログイン</div>
            </Link>
            <Link to="/register" className="link">
              <div className="registerButton">レジスター</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
