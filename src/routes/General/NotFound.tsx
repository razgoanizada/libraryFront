import "bootstrap/dist/css/bootstrap.min.css";
import notFound from "../../images/notfound.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="text-center">
          <div>
            <h3>This page could not be found</h3>
          </div>
          <img src={notFound} alt="404" />
        </div>
      </div>
      <Link
        to={"/"}
        className="d-flex justify-content-center align-items-center mt-4 fs-1 text-green-600"
      >
        Back to home
      </Link>
    </>
  );
};

export default NotFound;
