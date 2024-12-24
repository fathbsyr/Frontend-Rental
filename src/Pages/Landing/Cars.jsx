const Cars = () => {
    // Data array untuk mobil
    const cars = [
        {
            name: "Mercedes Benz R3",
            year: 2015,
            transmission: "Automatic",
            mileage: "25,000 KM",
            price: "$99.00/Day",
            image: "../src/assets/landing/img/car-rent-1.png"
        },
        {
            name: "BMW X5",
            year: 2018,
            transmission: "Automatic",
            mileage: "20,000 KM",
            price: "$120.00/Day",
            image: "../src/assets/landing/img/car-rent-2.png"
        },
        {
            name: "Audi A4",
            year: 2020,
            transmission: "Manual",
            mileage: "15,000 KM",
            price: "$110.00/Day",
            image: "../src/assets/landing/img/car-rent-3.png"
        },
        {
            name: "Toyota Supra",
            year: 2022,
            transmission: "Manual",
            mileage: "10,000 KM",
            price: "$150.00/Day",
            image: "../src/assets/landing/img/car-rent-4.png"
        },
        {
            name: "Honda Civic",
            year: 2021,
            transmission: "Automatic",
            mileage: "12,000 KM",
            price: "$95.00/Day",
            image: "../src/assets/landing/img/car-rent-5.png"
        },
        {
            name: "Ford Mustang",
            year: 2019,
            transmission: "Automatic",
            mileage: "18,000 KM",
            price: "$180.00/Day",
            image: "../src/assets/landing/img/car-rent-6.png"
        }
    ];

    return (
        <div>
            {/* Page Header Start */}
            <div className="container-fluid page-header">
                <h1 className="display-3 text-uppercase text-white mb-3">Car Listing</h1>
                <div className="d-inline-flex text-white">
                    <h6 className="text-uppercase m-0"><a className="text-white" href="#">Home</a></h6>
                    <h6 className="text-body m-0 px-3">/</h6>
                    <h6 className="text-uppercase text-body m-0">Car Listing</h6>
                </div>
            </div>
            {/* Page Header End */}

            {/* Rent A Car Start */}
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">
                    <h1 className="display-4 text-uppercase text-center mb-5">Find Your Perfect Car</h1>
                    <div className="row">
                        {cars.map((car, index) => (
                            <div className="col-lg-4 col-md-6 mb-2" key={index}>
                                <div className="rent-item mb-4">
                                    <img className="img-fluid mb-4" src={car.image} alt={car.name} />
                                    <h4 className="text-uppercase mb-4">{car.name}</h4>
                                    <div className="d-flex justify-content-center mb-4">
                                        <div className="px-2">
                                            <i className="fa fa-car text-primary mr-1" />
                                            <span>{car.year}</span>
                                        </div>
                                        <div className="px-2 border-left border-right">
                                            <i className="fa fa-cogs text-primary mr-1" />
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="px-2">
                                            <i className="fa fa-road text-primary mr-1" />
                                            <span>{car.mileage}</span>
                                        </div>
                                    </div>
                                    <a className="btn btn-primary px-3" href="#">{car.price}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Rent A Car End */}

            {/* Banner Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row mx-0">
                        <div className="col-lg-6 px-0">
                            <div className="px-5 bg-secondary d-flex align-items-center justify-content-between" style={{ height: 350 }}>
                                <img className="img-fluid flex-shrink-0 ml-n5 w-50 mr-4" src="../src/assets/landing/img/banner-left.png" alt="Join as a Driver" />
                                <div className="text-right">
                                    <h3 className="text-uppercase text-light mb-3">Join Our Team as a Driver</h3>
                                    <p className="mb-4">Take control of your career and earn with flexibility. Start driving today!</p>
                                    <a className="btn btn-primary py-2 px-4" href="#">Apply Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 px-0">
                            <div className="px-5 bg-dark d-flex align-items-center justify-content-between" style={{ height: 350 }}>
                                <div className="text-left">
                                    <h3 className="text-uppercase text-light mb-3">Looking for a Car to Rent?</h3>
                                    <p className="mb-4">Find reliable and comfortable cars at the best prices. Book yours today!</p>
                                    <a className="btn btn-primary py-2 px-4" href="#">Explore Now</a>
                                </div>
                                <img className="img-fluid flex-shrink-0 mr-n5 w-50 ml-4" src="../src/assets/landing/img/banner-right.png" alt="Rent a Car" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End */}

            {/* Vendor Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="owl-carousel vendor-carousel">
                        {[...Array(8)].map((_, index) => (
                            <div className="bg-light p-4" key={index}>
                                <img src={`img/vendor-${index + 1}.png`} alt={`Vendor ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Vendor End */}
        </div>
    );
};

export default Cars;
