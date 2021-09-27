import { useState } from "react";
import { useHistory } from "react-router";
import { TextField } from "@mui/material";
import { FormControl, Button } from "@mui/material";
import useStyles from "../../assets/styles/globalStyles/styles";

//importing firebase functions
import { auth, db } from "../../firebase/config";

function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    //creating a new user
    try {
      const newUser = await auth.signInWithEmailAndPassword(email, password);
      alert("signIn successful");
      history.push("/allClasses");
    } catch (e) {
      alert(e);
      history.push("/signUp");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1 style={{ textAlign: "center" }}>HELLO PLEASE LOGIN </h1>

      <FormControl noValidate autoComplete="on" className={classes.forms}>
        <TextField
          label="email"
          type="email"
          variant="outlined"
          color="primary"
          name="email"
          className={classes.inputFields}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="password"
          type="password"
          variant="outlined"
          color="primary"
          name="password"
          className={classes.inputFields}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.inputFields}
        >
          Login
        </Button>
      </FormControl>
    </form>
  );
}

export default Login;
