import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Ulasan = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ulasan, setUlasan] = useState([]);

  useEffect(() => {
    const fetchUlasan = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ulasan");
        if (response.data.success) {
          const pelangganId = localStorage.getItem("pelanggan_id"); // Ambil id pelanggan dari localStorage

          // Filter denda berdasarkan nama pelanggan yang login
          const filteredUlasan = response.data.data.filter((ulasan) => {
            const storedName = localStorage.getItem("name"); // Ambil nama pelanggan dari localStorage
            return ulasan.pelanggan === storedName; // Filter berdasarkan nama pelanggan
          });

          // Pastikan data sudah terfilter
          setUlasan(filteredUlasan);
        } else {
          setError("Gagal Menampilkan Data Ulasan");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUlasan();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && ulasan.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, ulasan]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Ulasan</h1>
      <p className="mb-4">Ulasan Anda Kepada Kami</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <Link to="/dashboard/ulasan/add" className="btn btn-primary btn-sm">
            Buat Ulasan Baru
          </Link>
        </div>
        <div className="card-body">
        {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Occurred: {error}</p>
          ) : ulasan.length === 0 ? ( 
            <p>Anda belum membuat ulasan.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
            <table ref={tableRef} className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Komentar</th>
                  <th>Pelanggan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Komentar</th>
                  <th>Pelanggan</th>
                  <th>Aksi</th>
                </tr>
              </tfoot>
              <tbody>
                {ulasan.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.komentar}</td>
                    <td>{item.pelanggan}</td>
                    <td>
                      <a
                        href={`/dashboard/ulasan/edit/${item.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </a>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
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

export default Ulasan;
