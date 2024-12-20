import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

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
          setPembayaran(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Pembayaran");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Sesi telah berakhir. Silakan login kembali.");
          window.location.href = "/"; // Redirect ke login
        } else {
          setError(err.response?.data?.message || "Terjadi kesalahan");
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
      <h1 className="h3 mb-2 text-gray-800">Table Data Pembayaran</h1>
      <p className="mb-4">Tempat Pengelolaan Data Pembayaran</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <a href="/admin/pembayaran/add" className="btn btn-primary btn-sm" >Tambah Data Pembayaran</a>
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
