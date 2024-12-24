import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";

const Pembayaran = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pembayaran, setPembayaran] = useState([]);

  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token
        const response = await axios.get(
          "http://localhost:8000/api/pembayaran",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token
            },
          }
        );
        if (response.data.success) {
          const pelangganId = localStorage.getItem("pelanggan_id"); // Ambil id pelanggan dari localStorage
          // Cek ID pelanggan yang digunakan untuk filter

          // Filter denda berdasarkan nama pelanggan yang login
          const filteredPembayaran = response.data.data.filter((pembayaran) => {
            const storedName = localStorage.getItem("name"); // Ambil nama pelanggan dari localStorage
            return pembayaran.pelanggan === storedName; // Filter berdasarkan nama pelanggan
          });

          // Pastikan data sudah terfilter
          setPembayaran(filteredPembayaran); // Set denda yang sudah difilter
        } else {
          setError("Anda Belum Melakukan Pembayaran");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Sesi telah berakhir. Silakan login kembali.");
          window.location.href = "/"; // Redirect ke login
        } else {
          setError("Anda Belum Membuat Pembayaran");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPembayaran();
  }, []);

  useEffect(() => {
    if (!loading && !error && pembayaran.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, pembayaran]);


  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Tagihan</h1>
      <p className="mb-4">Berikut Adalah Tagihan Anda</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Tagihan Anda</h6>
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
                  <th>Metode</th>
                  <th>Tanggal Bayar</th>
                  <th>Status</th>
                  <th>Pelanggan</th>
                  <th>Diskon</th>
                  <th>Denda</th>
                  <th>Total Bayar</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Metode</th>
                  <th>Tanggal Bayar</th>
                  <th>Status</th>
                  <th>Pelanggan</th>
                  <th>Diskon</th>
                  <th>Denda</th>
                  <th>Total Bayar</th>
                </tr>
              </tfoot>
              <tbody>
                {pembayaran.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.metode}</td>
                    <td>{item.tanggal_bayar}</td>
                    <td>{item.status}</td>
                    <td>{item.pelanggan}</td>
                    <td>{item.diskon}</td>
                    <td>{item.denda}</td>
                    <td>{item.total_bayar}</td>
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
export default Pembayaran;
