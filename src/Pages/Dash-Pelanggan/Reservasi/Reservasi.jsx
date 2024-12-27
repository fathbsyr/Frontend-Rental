import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Reservasi = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservasi, setReservasi] = useState([]);

  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/reservasi", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.success) {
          const pelangganId = localStorage.getItem("pelanggan_id"); // Ambil id pelanggan dari localStorage

          // Filter denda berdasarkan nama pelanggan yang login
          const filteredReservasi = response.data.data.filter((reservasi) => {
            const storedName = localStorage.getItem("name"); // Ambil nama pelanggan dari localStorage
            return reservasi.pelanggan === storedName; // Filter berdasarkan nama pelanggan
          });

          // Pastikan data sudah terfilter
          setReservasi(filteredReservasi); // Set denda yang sudah difilter
        } else {
          setError("Anda Belum Melakukan Reservasi");
        }
      } catch (error) {
        setError(error.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservasi();
  }, []);

  useEffect(() => {
    if (!loading && !error && reservasi.length > 0 && tableRef.current) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [loading, error, reservasi]);


  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Reservasi</h1>
      <p className="mb-4">History Reservasi Anda</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <Link to="/dashboard/reservasi/add" className="btn btn-primary btn-sm">
            Buat Reservasi Baru
          </Link>
        </div>
        <div className="card-body">
        {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Occurred: {error}</p>
          ) : reservasi.length === 0 ? ( 
            <p>Anda belum mendapatkan tagihan.</p>
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
