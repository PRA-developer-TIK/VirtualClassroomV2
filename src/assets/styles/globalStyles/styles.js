import { makeStyles } from "@material-ui/core";

//make different css classes

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    minHeight:"100vh",
    backgroundImage:`url()`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
  },
  inputFields: {
    margin: "5px",
    width: "30%",
  },
  createInputFields: {
    margin: "5px",
    width: "100%",
  },
  //joinClass
  joinClass: {
    border: "1px solid",
    textAlign: "center",
    padding: "22px",
    margin: "1%",
    borderRadius: "20px",
    width: "40%",
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
  listImg:{width:"5%",margin:"auto"},
  backGround:{

  }
}));

export default useStyles;
