import { Grid } from "@material-ui/core";
import Add from "../../components/Plus/Plus";
import Map from "../../components/Map/Map";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const FriendMap = () => {
  const [friend, setFriend] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setFriend(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={10} xs={10}>
          <Map friend={friend} />
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};

export default FriendMap;
