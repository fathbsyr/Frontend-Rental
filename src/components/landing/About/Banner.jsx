import { Link } from "react-router-dom";
function Banner() {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row mx-0">
            <div className="col-lg-6 px-0">
              <div
                className="px-5 bg-secondary d-flex align-items-center justify-content-between"
                style={{ height: 350 }}
              >
                <img
                  className="img-fluid flex-shrink-0 ml-n5 w-50 mr-4"
                  src="../src/assets/landing/img/banner-left.png"
                  alt="Join as a Driver"
                />
                <div className="text-right">
                  <h3 className="text-uppercase text-light mb-3">
                    Join Our Team as a Driver
                  </h3>
                  <p className="mb-4">
                    Take control of your career and earn with flexibility. Start
                    driving today!
                  </p>
                  <Link className="btn btn-primary py-2 px-4" to="/login">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 px-0">
              <div
                className="px-5 bg-dark d-flex align-items-center justify-content-between"
                style={{ height: 350 }}
              >
                <div className="text-left">
                  <h3 className="text-uppercase text-light mb-3">
                    Looking for a Car to Rent?
                  </h3>
                  <p className="mb-4">
                    Find reliable and comfortable cars at the best prices. Book
                    yours today!
                  </p>
                  <Link className="btn btn-primary py-2 px-4" to="/login">
                    Explore Now
                  </Link>
                </div>
                <img
                  className="img-fluid flex-shrink-0 mr-n5 w-50 ml-4"
                  src="../src/assets/landing/img/banner-right.png"
                  alt="Rent a Car"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Banner;
