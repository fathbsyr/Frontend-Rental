import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";

const Denda = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [denda, setDenda] = useState([]);

  useEffect(() => {
    const fetchDenda = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/denda", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          const pelangganId = localStorage.getItem("pelanggan_id"); // Ambil id pelanggan dari localStorage

          // Filter denda berdasarkan nama pelanggan yang login
          const filteredDenda = response.data.data.filter((denda) => {
            const storedName = localStorage.getItem("name"); // Ambil nama pelanggan dari localStorage
            return denda.pelanggan === storedName; // Filter berdasarkan nama pelanggan
          });

          // Pastikan data sudah terfilter
          setDenda(filteredDenda); // Set denda yang sudah difilter
        } else {
          setError("Gagal Menampilkan Data Denda");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDenda();
  }, []);

  useEffect(() => {
    if (!loading && !error && denda.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, denda]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Denda</h1>
      <p className="mb-4">Denda Yang Anda Terima</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Data Denda</h6>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Occurred: {error}</p>
          ) : denda.length === 0 ? (
            <p>Selamat anda tidak mendapatkan denda</p>
          ) : (
            <div style={{ overflowX: "auto" }} className="table-responsive">
              <table
                ref={tableRef}
                className="display"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Keterangan</th>
                    <th>Pelanggan</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>No</th>
                    <th>Keterangan</th>
                    <th>Pelanggan</th>
                  </tr>
                </tfoot>
                <tbody>
                  {denda.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.pelanggan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Denda;
