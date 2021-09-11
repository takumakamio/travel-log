import { Grid } from "@material-ui/core";
import Add from "../../components/Plus/Plus";
import Map from "../../components/Map/Map";
import Leftbar from "../../components/Leftbar/Leftbar";

const MyMap = () => {
  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Map />
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};

export default MyMap;
