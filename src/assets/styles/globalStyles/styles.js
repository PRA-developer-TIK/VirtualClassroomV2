import { makeStyles } from "@material-ui/core";

//make different css classes

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  inputFields: {
    margin: "5px",
    width: "30%",
  },
  forms: {
    display: "flex",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  pageBody: {
    backgroundColor: "#ffeb3b",
  },
  postBtn: {
    backgroundColor: "green",
    color: "#FFF",
    padding: "20%",
    display: "inline-block",
  },
  listImg:{width:"5%",margin:"auto"}
}));

export default useStyles;
