import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(3),
    color: "white",
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "teal",
      color: "white",
      border: "1px solid #ece7e7",
    },
  },
  logoLg: {
    display: "flex",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "5px",
    color: "teal",
    marginBottom: theme.spacing(3),
    fontWeight: 800,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
