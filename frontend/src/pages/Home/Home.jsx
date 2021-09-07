import { Grid } from "@material-ui/core";
import Add from "../../components/Add/Add";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useStyles } from "./styles";

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed />
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar />
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};

export default Home;
