//styles import
import {useState,useEffect} from "react"

import theme from "./assets/styles/globalStyles/theme";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout/Layout"
//import routes
import { BrowserRouter as Router, Switch ,Route} from "react-router-dom";

//components import
import Navbar from "./components/navbar/Navbar";
import Login from "./components/userDetails/Login"
import AllClasses from "./components/Home/AllClasses"
import Class from "./components/teacher/Class"
//import firebase
import db,{auth} from "./firebase/config"

function App() {
  const [user,setUser]=useState("");
  const [role,setRole]=useState("");
  console.log("role",role);

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) {
        setUser(user);
        console.log(user.displayName);
        user.displayName==="teacher"?setRole("Teacher"):setRole("Student");
      }
      else setUser(null)
    })

  },[]);


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar user={user} />
        <Layout >
        <Switch>
        <Route path="/aClass" exact>
          <Class   />

        </Route>
        <Route path="/allClasses" exact>
          <AllClasses   />

        </Route>
        <Route path="/login" exact>
          <Login />

        </Route>
        </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
