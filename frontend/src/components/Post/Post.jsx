import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";

const Post = ({ post }) => {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={PF + post.img}
          title="My Post"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {post.title}
          </Typography>
          <Typography variant="body2">{post.desc}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
