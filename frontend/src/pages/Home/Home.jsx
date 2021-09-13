import { useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import axios from "axios";
import { Grid } from "@material-ui/core";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setAllPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Feed allPosts={allPosts} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
