import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; 
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

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
          setUlasan(response.data.data);
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
      <h1 className="h3 mb-2 text-gray-800">Table Data Ulasan</h1>
      <p className="mb-4">Tempat Pengelolaan Data Ulasan</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <a href="/admin/ulasan/add" className="btn btn-primary btn-sm">Tambah Data Ulasan</a>
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
                  <th>Komentar</th>
                  <th>Pelanggan</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Komentar</th>
                  <th>Pelanggan</th>
                </tr>
              </tfoot>
              <tbody>
                {ulasan.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.komentar}</td>
                    <td>{item.pelanggan}</td>
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

export default Ulasan;
