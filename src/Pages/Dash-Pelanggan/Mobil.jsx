import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";

const Mobil = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobil, setMobil] = useState([]);

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mobil");
        if (response.data.success) {
          setMobil(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Mobil");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMobil();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && mobil.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, mobil]);


  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Mobil</h1>
      <p className="mb-4">Mobil-Mobil Mewah Yang Tersedia</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Mobil
          </h6>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Occurred: {error}</p>
          ) : (
            <table ref={tableRef} className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Brand</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Ketersediaan</th>
                  <th>Deskripsi</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Brand</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Ketersediaan</th>
                  <th>Deskripsi</th>
                </tr>
              </tfoot>
              <tbody>
                {mobil.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.brand}</td>
                    <td>{item.nama}</td>
                    <td>{item.harga}</td>
                    <td>{item.ketersediaan}</td>
                    <td>{item.deskripsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mobil;
