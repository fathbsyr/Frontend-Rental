import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import alphard from "./img/alphard.png";
import amg from "./img/amg-one.jpg";
import gt3rs from "./img/gt3rs.jpg";
import turbo from "./img/turbo-s.jpg";

function ListCar() {
  
  const CarImage = {
    "Alphard": alphard,
    "AMG-One": amg,
    "911 GT3 RS": gt3rs,
    "911 Turbo S": turbo
  };

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
  }, []); // Dependency array kosong agar hanya dijalankan sekali
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <h1 className="display-4 text-uppercase text-center mb-5">
          Find Your Perfect Car
        </h1>
        <div className="row">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div className="col-lg-4 col-md-6 mb-2" key={car.id}>
                <div className="rent-item mb-4">
                  {/* Jika ada properti gambar, gunakan */}
                  {/* <img className="img-fluid mb-4" src={car.image} alt={car.nama} /> */}
                  <img
                    className="img-fluid mb-4"
                    src={CarImage[car.nama] || "./assets/cars/default.jpg"} // Gambar berdasarkan nama mobil
                    alt={car.nama || "Mobil"}
                  />
                  <h4 className="text-uppercase mb-4">{car.brand}</h4>
                  <h4 className="text-uppercase mb-4">{car.nama}</h4>
                  <div className="d-flex flex-column align-items-center mb-4">
                    <div className="py-2">
                      <i
                        className={`fa ${
                          car.ketersediaan === "tersedia"
                            ? "fa-check-circle text-success"
                            : "fa-times-circle text-danger"
                        } mr-1`}
                      />
                      <span>{car.ketersediaan}</span>
                    </div>
                    <div className="py-2">
                      <i className="fa fa-info-circle text-primary mr-1" />
                      <span>{car.deskripsi || "Deskripsi tidak tersedia"}</span>
                    </div>
                  </div>
                  <Link className="btn btn-primary px-3" to="/login">
                    Rp {car.harga.toLocaleString()}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Belum Ada Data</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ListCar;
