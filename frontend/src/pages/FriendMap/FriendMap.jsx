import { Grid } from "@material-ui/core";
import Map from "../../components/Map/Map";
import Leftbar from "../../components/Leftbar/Leftbar";
import { useParams } from "react-router";

const FriendMap = () => {
  const friendId = useParams().id;

  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Map friendId={friendId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FriendMap;
