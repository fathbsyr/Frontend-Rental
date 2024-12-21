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
        const response = await axios.get("http://localhost:8000/api/denda");
        if (response.data.success) {
          setDenda(response.data.data);
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
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && denda.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, denda]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Serius?",
      text: "Anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axios
          .delete(`http://localhost:8000/api/denda/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                title: "Terhapus",
                text: "Data Sudah Terhapus",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Eror!",
                text: "Your file has not been deleted.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Eror!",
              text: "an error occurred",
              icon: "error",
            });
            console.error("Deleting Error", error);
          });
      }
    });
  };

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Denda</h1>
      <p className="mb-4">Tempat Pengelolaan Data Denda</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
        `<a href="/admin/denda/add" className="btn btn-primary btn-sm">Tambah Denda</a>
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
                  <th>Keterangan</th>
                  <th>Pelanggan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Keterangan</th>
                  <th>Pelanggan</th>
                  <th>Aksi</th>
                </tr>
              </tfoot>
              <tbody>
                {denda.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.keterangan}</td>
                    <td>{item.pelanggan}</td>
                    <td>
                      <a href={`/admin/denda/edit/${item.id}`} className="btn btn-warning btn-sm">Edit</a>
                      <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
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

export default Denda;
