"bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Login from "./Login/Login";

const Home = () => {

  const {isLoggedIn } = useContext(AuthContext);
 
  if(isLoggedIn) {
    return (
      <>
      <h1>home</h1>
      </>
    );
  }


  else
  return <Login/>
};

export default Home;
