import { Grid } from "@material-ui/core";
import Add from "../../components/Plus/Plus";
import Map from "../../components/Map/Map";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import { useEffect, useState } from "react";
import axios from "axios";
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
      <Add />
    </div>
  );
};

export default FriendMap;
