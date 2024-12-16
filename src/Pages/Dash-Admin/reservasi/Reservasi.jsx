import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
const Reservasi = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservasi, setReservasi] = useState([]);

  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reservasi");
        if (response.data.success) {
          setReservasi(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Reservasi");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchReservasi();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && reservasi.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, reservasi]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Reservasi</h1>
      <p className="mb-4">Tempat Pengelolaan Data Reservasi</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Data Reservasi
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
                  <th>Pelanggan</th>
                  <th>Mobil</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Akhir</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Pelanggan</th>
                  <th>Mobil</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Akhir</th>
                  <th>Status</th>
                </tr>
              </tfoot>
              <tbody>
                {reservasi.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.pelanggan}</td>
                    <td>{item.mobil}</td>
                    <td>{item.tanggal_mulai}</td>
                    <td>{item.tanggal_akhir}</td>
                    <td>{item.status}</td>
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
export default Reservasi;