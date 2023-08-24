import "bootstrap/dist/css/bootstrap.min.css";
import unauthorized from "../../images/Unauthorized.jpg";
import { Link } from "react-router-dom";

const Unauthorized  = () => {
  return (
    <>
     <div className="d-flex justify-content-center align-items-center mt-4">
      <div className="text-center">
      <div>
          <h3>Sorry, you do not have permission for this page</h3>
        </div>
        <img src={unauthorized} alt="404" />
      </div>
    </div>
    <Link to={"/"} className="d-flex justify-content-center align-items-center mt-4 fs-1 text-green-600">Back to home</Link>
    </>
  );
};

export default Unauthorized ;
