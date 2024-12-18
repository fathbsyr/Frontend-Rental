import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; 
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

const Pelanggan = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pelanggan, setPelanggan] = useState([]);

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token
        const response = await axios.get("http://localhost:8000/api/pelanggan", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token
          },
        });
        if (response.data.success) {
          setPelanggan(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Pelanggan");
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
    fetchPelanggan();
  }, []);

  useEffect(() => {
    if (!loading && !error && pelanggan.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, pelanggan]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Pelanggan</h1>
      <p className="mb-4">Tempat Pengelolaan Data Pelanggan</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Data Pelanggan
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
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>Email</th>
                  <th>Nomor HP</th>
                  <th>Alamat Lengkap</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>Email</th>
                  <th>Nomor HP</th>
                  <th>Alamat Lengkap</th>
                </tr>
              </tfoot>
              <tbody>
                {pelanggan.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.nik}</td>
                    <td>{item.email}</td>
                    <td>{item.no_hp}</td>
                    <td>{item.alamat_lengkap}</td>
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

export default Pelanggan;
