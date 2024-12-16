function Home() {
  return (
    <div>
      {/* Carousel Start */}
      <div className="container-fluid p-0" style={{ marginBottom: 90 }}>
        <div
          id="header-carousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="https://images.bisnis.com/uploads/images/nissan-gt-r-nismo-gt3-2018-.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: 900 }}>
                  <h4 className="text-white text-uppercase mb-md-3">
                    Rent A Car
                  </h4>
                  <h1 className="display-1 text-white mb-md-4">
                    Best Rental Cars In Your Location
                  </h1>
                  <a href className="btn btn-primary py-md-3 px-md-5 mt-2">
                    Reserve Now
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="../../../src/assets/landing/img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: 900 }}>
                  <h4 className="text-white text-uppercase mb-md-3">
                    Rent A Car
                  </h4>
                  <h1 className="display-1 text-white mb-md-4">
                    Quality Cars with Unlimited Miles
                  </h1>
                  <a href className="btn btn-primary py-md-3 px-md-5 mt-2">
                    Reserve Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#header-carousel"
            data-slide="prev"
          >
            <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
              <span className="carousel-control-prev-icon mb-n2" />
            </div>
          </a>
          <a
            className="carousel-control-next"
            href="#header-carousel"
            data-slide="next"
          >
            <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
              <span className="carousel-control-next-icon mb-n2" />
            </div>
          </a>
        </div>
      </div>
      {/* Carousel End */}
      {/* About Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-1 text-primary text-center">01</h1>
          <h1 className="display-4 text-uppercase text-center mb-5">
            Welcome To <span className="text-primary">Royal Cars</span>
          </h1>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <img className="w-75 mb-4" src="img/about.png" alt />
              <p>
                Justo et eos et ut takimata sed sadipscing dolore lorem, et
                elitr labore labore voluptua no rebum sed, stet voluptua amet
                sed elitr ea dolor dolores no clita. Dolores diam magna clita ea
                eos amet, amet rebum voluptua vero vero sed clita accusam
                takimata. Nonumy labore ipsum sea voluptua sea eos sit justo, no
                ipsum sanctus sanctus no et no ipsum amet, tempor labore est
                labore no. Eos diam eirmod lorem ut eirmod, ipsum diam
                sadipscing stet dolores elitr elitr eirmod dolore. Magna elitr
                accusam takimata labore, et at erat eirmod consetetur tempor
                eirmod invidunt est, ipsum nonumy at et.
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
      {/* Services Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-1 text-primary text-center">02</h1>
          <h1 className="display-4 text-uppercase text-center mb-5">
            Our Services
          </h1>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="fa fa-2x fa-taxi text-secondary" />
                  </div>
                  <h1 className="display-2 text-white mt-n2 m-0">01</h1>
                </div>
                <h4 className="text-uppercase mb-3">Car Rental</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="fa fa-2x fa-money-check-alt text-secondary" />
                  </div>
                  <h1 className="display-2 text-white mt-n2 m-0">02</h1>
                </div>
                <h4 className="text-uppercase mb-3">Car Financing</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="fa fa-2x fa-car text-secondary" />
                  </div>
                  <h1 className="display-2 text-white mt-n2 m-0">03</h1>
                </div>
                <h4 className="text-uppercase mb-3">Car Inspection</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="fa fa-2x fa-cogs text-secondary" />
                  </div>
                  <h1 className="display-2 text-white mt-n2 m-0">04</h1>
                </div>
                <h4 className="text-uppercase mb-3">Auto Repairing</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="fa fa-2x fa-spray-can text-secondary" />
                  </div>
                  <h1 className="display-2 text-white mt-n2 m-0">05</h1>
                </div>
                <h4 className="text-uppercase mb-3">Auto Painting</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-2">
              <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i className="fa fa-2x fa-pump-soap text-secondary" />
                  </div>
                  <h1 className="display-2 text-white mt-n2 m-0">06</h1>
                </div>
                <h4 className="text-uppercase mb-3">Auto Cleaning</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services End */}
      {/* Banner Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="bg-banner py-5 px-4 text-center">
            <div className="py-5">
              <h1 className="display-1 text-uppercase text-primary mb-4">
                50% OFF
              </h1>
              <h1 className="text-uppercase text-light mb-4">
                Special Offer For New Members
              </h1>
              <p className="mb-4">
                Only for Sunday from 1st Jan to 30th Jan 2045
              </p>
              <a className="btn btn-primary mt-2 py-3 px-5" href>
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Banner End */}
    </div>
  );
}
export default Home;