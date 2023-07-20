"bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Login from "./Login/Login";

const About = () => {

  const { isLoggedIn } = useContext(AuthContext);
  
  if(isLoggedIn) {

    return (
      <>
      <h1>About</h1>
      </>
    );
  }
  
  else
  return <Login />
};

export default About;