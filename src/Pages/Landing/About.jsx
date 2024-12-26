import Banner from "../../components/landing/About/Banner";

function About() {
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid page-header">
        <h1 className="display-3 text-uppercase text-white mb-3">About</h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <a className="text-white" href>
              Home
            </a>
          </h6>
          <h6 className="text-body m-0 px-3">/</h6>
          <h6 className="text-uppercase text-body m-0">About</h6>
        </div>
      </div>
      {/* Page Header Start */}

      {/* About Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Welcome To <span className="text-primary">El-Rental</span>
          </h1>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <img
                className="w-75 mb-4"
                src="../src/assets/landing/img/about.png"
                alt
              />
              <p>
                El-Rental hadir untuk memberikan pengalaman terbaik dalam
                menyewa mobil. Dengan layanan profesional dan armada kendaraan
                mewah yang terawat, kami siap memenuhi kebutuhan perjalanan
                Anda, baik untuk urusan bisnis, liburan, maupun acara spesial
                lainnya. Kami memahami bahwa kenyamanan, keamanan, dan kemudahan
                adalah prioritas utama bagi pelanggan. Oleh karena itu, kami
                berkomitmen untuk menyediakan layanan terbaik yang sesuai dengan
                kebutuhan Anda, kapan saja dan di mana saja.
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-light p-4 mb-4"
                style={{ height: 150 }}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-2x fa-headset text-secondary" />
                </div>
                <h4 className="text-uppercase m-0">24/7 Car Rental Support</h4>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-secondary p-4 mb-4"
                style={{ height: 150 }}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-2x fa-car text-secondary" />
                </div>
                <h4 className="text-light text-uppercase m-0">
                  Car Reservation Anytime
                </h4>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-light p-4 mb-4"
                style={{ height: 150 }}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{ width: 100, height: 100 }}
                >
                  <i className="fa fa-2x fa-map-marker-alt text-secondary" />
                </div>
                <h4 className="text-uppercase m-0">Lots Of Pickup Locations</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Banner Start */}
      <Banner/>
      {/* Banner End */}
    </div>
  );
  console.log("About component rendered");
}

export default About;
