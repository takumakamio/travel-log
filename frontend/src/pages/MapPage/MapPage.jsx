import { Grid } from "@material-ui/core";
import Add from "../../components/Add/Add";
import Map from "../../components/Map/Map";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Navbar from "../../components/Navbar/Navbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useStyles } from "./styles";

const MapPage = () => {
  const classes = useStyles();
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
