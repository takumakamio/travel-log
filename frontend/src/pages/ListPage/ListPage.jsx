import Leftbar from "../../components/Leftbar/Leftbar";
import List from "../../components/List/List";
import { Grid } from "@material-ui/core";

const ListPage = () => {
  return (
    <>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default ListPage;
