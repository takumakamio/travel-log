import { Grid } from "@material-ui/core";
import Plus from "../../components/Plus/Plus";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <Leftbar />
        <Feed />
        <Rightbar /> 
        <Plus />
      </div>
    </>
  );
};

export default Home;
