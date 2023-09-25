import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-muted mt-5"
    >
      <section className="d-flex justify-content-center p-4 border-bottom">
        <div className="fs-1 links ">
          <a
            href="https://api.whatsapp.com/send?phone=972524046007"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="success" fab icon="whatsapp" />
          </a>
          <a
            href="https://www.linkedin.com/in/razgoanizada"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="primary" fab icon="linkedin" />
          </a>
          <a
            href="https://github.com/razgoanizada"
            target="_blank"
            className="me-4 text-reset"
          >
            <MDBIcon color="dark" fab icon="github" />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-3">
          <MDBRow className="mt-3">
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                written in languages
              </h6>
              <p> React </p>
              <p> Spring </p>
              <p> Java </p>
              <p> Type Script </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Workplaces</h6>
              <p> Visual Studio Code</p>
              <p> Intellj Idea </p>
            </MDBCol>

            <MDBCol
              md="4"
              lg="3"
              xl="3"
              className="mx-auto mb-md-0 mb-4 contact"
            >
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                Kfar Saba, Israel
              </p>
              <p>
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                <a href="mailto:razgoanizada@gmail.com">
                  razgoanizada@gmail.com
                </a>
              </p>
              <p>
                <MDBIcon color="secondary" icon="phone" className="me-3" />
                <a href="tel:0524046007">0524046007</a>
              </p>

              <p>
                <MDBIcon color="secondary" icon="desktop" className="me-3" />
                <a href="https://razgoanizada.com/" target="_blank">
                  razgoanizada.com
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright: Raz Goanizada
      </div>
    </MDBFooter>
  );
};

export default Footer;
