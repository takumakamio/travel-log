import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import { Grid } from "@material-ui/core";

const FriendPost = () => {
  return (
    <>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Feed />
        </Grid>
      </Grid>
    </>
  );
};

export default FriendPost;
