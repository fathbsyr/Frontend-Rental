import React, { useEffect, useState } from "react";
import axios from "axios";

const Cars = () => {
    // State untuk menyimpan data mobil
    const [cars, setCars] = useState([]);

    // Ambil data dari API saat komponen dimuat
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/mobil")
            .then((response) => {
                // Akses properti "data" di dalam respons
                console.log("Response Data:", response.data.data); // Pastikan data terlihat dengan benar
                setCars(response.data.data); // Gunakan response.data.data
            })
            .catch((error) => {
                console.error("Error fetching car data:", error);
            });
    }, []);     // Dependency array kosong agar hanya dijalankan sekali

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
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <div className="col-lg-4 col-md-6 mb-2" key={car.id}>
                                    <div className="rent-item mb-4">
                                        {/* Jika ada properti gambar, gunakan */}
                                        {/* <img className="img-fluid mb-4" src={car.image} alt={car.nama} /> */}
                                        <h4 className="text-uppercase mb-4">{car.brand}</h4>
                                        <h4 className="text-uppercase mb-4">{car.nama}</h4>
                                        <div className="d-flex flex-column align-items-center mb-4">
                                            <div className="py-2">
                                                <i className={`fa ${car.ketersediaan === 'tersedia' ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} mr-1`} />
                                                <span>{car.ketersediaan}</span>
                                            </div>
                                            <div className="py-2">
                                                <i className="fa fa-info-circle text-primary mr-1" />
                                                <span>{car.deskripsi || "Deskripsi tidak tersedia"}</span>
                                            </div>
                                        </div>
                                        <a className="btn btn-primary px-3" href="#">Rp {car.harga.toLocaleString()}</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No cars available.</p>
                        )}
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
