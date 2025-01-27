import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      {/* Footer Start */}
      <div
        className="container-fluid bg-secondary py-5 px-sm-3 px-md-5"
        style={{ marginTop: 90 }}
      >
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-white mr-3" />
              Depok, Jawa Barat
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt text-white mr-3" />
              +6287878787
            </p>
            <p>
              <i className="fa fa-envelope text-white mr-3" />
              el-rent@car.com
            </p>
            <h6 className="text-uppercase text-white py-2">Follow Us</h6>
            <div className="d-flex justify-content-start">
              <Link className="btn btn-lg btn-dark btn-lg-square mr-2" target='_blank' to="https://x.com/">
                <i className="fab fa-x-twitter" />
              </Link>
              <Link className="btn btn-lg btn-dark btn-lg-square mr-2" target='_blank' to="https://web.facebook.com/">
                <i className="fab fa-facebook-f" />
              </Link>
              <Link className="btn btn-lg btn-dark btn-lg-square mr-2" target='_blank' to="https://www.linkedin.com/">
                <i className="fab fa-linkedin-in" />
              </Link>
              <Link className="btn btn-lg btn-dark btn-lg-square mr-2" target='_blank' to="https://instagram.com">
                <i className="fab fa-instagram" />
              </Link>
              <Link className="btn btn-lg btn-dark btn-lg-square" target='_blank' to="https://youtube.com">
                <i className="fab fa-youtube" />
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Usefull Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-body mb-2" to="/">
                <i className="fa fa-angle-right text-white mr-2" />
                Home
              </Link>
              <Link className="text-body mb-2" to="/about">
                <i className="fa fa-angle-right text-white mr-2" />
                About
              </Link>
              <Link className="text-body mb-2" to="/cars">
                <i className="fa fa-angle-right text-white mr-2" />
                Cars
              </Link>
              <Link className="text-body mb-2" to="/contact">
                <i className="fa fa-angle-right text-white mr-2" />
                Contact
              </Link>
              <Link className="text-body mb-2" to="/login">
                <i className="fa fa-angle-right text-white mr-2" />
                Login 
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Car Gallery</h4>
            <div className="row mx-n1">
              <div className="col-4 px-1 mb-2">
                <a href>
                  <img className="w-100" src="../src/assets/landing/img/gallery-1.jpg" alt />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href>
                  <img className="w-100" src="../src/assets/landing/img/gallery-2.jpg" alt />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href>
                  <img className="w-100" src="../src/assets/landing/img/gallery-3.jpg" alt />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href>
                  <img className="w-100" src="../src/assets/landing/img/gallery-4.jpg" alt />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href>
                  <img className="w-100" src="../src/assets/landing/img/gallery-5.jpg" alt />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href>
                  <img className="w-100" src="../src/assets/landing/img/gallery-6.jpg" alt />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">El-Rental</h4>
            <p className="mb-4">
              Tempat Rental Mobil Mewah Terbaik Di Depok
            </p>
            <div className="w-100 mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-dark border-dark"
                  style={{ padding: 25 }}
                  placeholder="Your Email"
                />
                <div className="input-group-append">
                  <Link to="/registrasi" className="btn btn-primary px-4 btn-lg">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/login-admin">Login Administrator</Link>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark py-4 px-sm-3 px-md-5">
        <p className="mb-2 text-center text-body">
          © <a href="/">El-Rental</a>. All Rights Reserved.
        </p>
        {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
        <p className="m-0 text-center text-body">
          Designed by <a href="https://htmlcodex.com">HTML Codex</a>
        </p>
      </div>
      {/* Footer End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-double-up" />
      </a>
    </div>
  );
}
export default Footer;
