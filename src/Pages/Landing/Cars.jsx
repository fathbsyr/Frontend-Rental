import ListCar from "../../components/landing/Cars/Cars";
import Banner from "../../components/landing/About/Banner";
import { Link } from "react-router-dom";
const Cars = () => {
  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid page-header">
        <h1 className="display-3 text-uppercase text-white mb-3">
          Car Listing
        </h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <Link className="text-white" to="/">
              Home
            </Link>
          </h6>
          <h6 className="text-body m-0 px-3">/</h6>
          <h6 className="text-uppercase text-body m-0">Car Listing</h6>
        </div>
      </div>
      {/* Page Header End */}

      {/* Rent A Car Start */}
      <ListCar/>
      {/* Rent A Car End */}
      <Banner/>  
      {/* Banner Start */}
      {/* Banner End */}
    </div>
  );
};

export default Cars;
