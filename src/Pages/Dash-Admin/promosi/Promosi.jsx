import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";

function Promosi() {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promosi, setPromosi] = useState([]);

  useEffect(() => {
    const fetchPromosi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/promosi");
        if (response.data.success) {
          setPromosi(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Promosi");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchPromosi();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && promosi.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, promosi]);

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Promosi</h1>
      <p className="mb-4">Tempat Pengelolaan Data Promosi</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
        <a href="/admin/promosi/add" className="btn btn-primary btn-sm">Tambah Data Promosi</a>
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
                  <th>Mobil</th>
                  <th>Diskon</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Mobil</th>
                  <th>Diskon</th>
                </tr>
              </tfoot>
              <tbody>
                {promosi.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.mobil}</td>
                    <td>{item.diskon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Promosi;
