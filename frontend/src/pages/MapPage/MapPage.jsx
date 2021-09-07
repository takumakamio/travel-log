import { Grid } from "@material-ui/core";
import Add from "../../components/Plus/Plus";
import Map from "../../components/Map/Map";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Navbar from "../../components/Navbar/Navbar";
import Rightbar from "../../components/Rightbar/Rightbar";

const MapPage = () => {
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

export default MapPage;
