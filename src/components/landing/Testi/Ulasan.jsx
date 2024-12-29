import axios from "axios";
import { React, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";

function Ulasan() {
  const [ulasan, setUlasan] = useState([]);

  useEffect(() => {
    // Fetch data dari API
    axios
      .get("http://localhost:8000/api/ulasan")
      .then((response) => {
        setUlasan(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <h1 className="display-4 text-uppercase text-center mb-5">Ulasan</h1>
        {ulasan.length > 0 ? (
          <OwlCarousel
            className="owl-carousel testimonial-carousel"
            loop
            margin={10}
            nav
          >
            {ulasan.map((item) => (
              <div
                key={item.id}
                className="testimonial-item d-flex flex-column justify-content-center px-4"
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h1 className="display-2 text-white m-0 fa fa-quote-right" />
                </div>
                <h3 className="text-uppercase mb-2">{item.pelanggan}</h3>
                <h5 className="m-0">{item.komentar}</h5>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <p className="text-center">Tidak ada ulasan untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
}

export default Ulasan;
