"bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Login from "../login/Login";
import { TypeAnimation } from "react-type-animation";

const About = () => {

  const { isLoggedIn } = useContext(AuthContext);
  
  if(isLoggedIn) {

    return (
      <>
       <TypeAnimation
        sequence={[
          "I'm a Python Full Stack Developer.",
          2000,
          "That's not all.",
          1000,
          "I can code with ReactJS, JavaScript, TypeScript VBA and Java.",
          3000,
          "Of course HTML, CSS, SASS and modern design frameworks too.",
          3000,
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        omitDeletionAnimation={false}
        className="text-center"
      />
      </>
    );
  }
  
  else
  return <Login />
};

export default About;