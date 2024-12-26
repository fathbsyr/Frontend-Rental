import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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

  const handleDelete = async (id) => {
    console.log("ID yang akan dihapus:", id); // Log ID yang akan dihapus untuk debugging
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
          .delete(`http://localhost:8000/api/promosi/${id}`, {
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
      <h1 className="h3 mb-2 text-gray-800">Table Data Promosi</h1>
      <p className="mb-4">Tempat Pengelolaan Data Promosi</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <Link to="/admin/promosi/add" className="btn btn-primary btn-sm">
            Tambah Data Promosi
          </Link>
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
                  <th>Aksi</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Mobil</th>
                  <th>Diskon</th>
                  <th>Aksi</th>
                </tr>
              </tfoot>
              <tbody>
                {promosi.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.mobil}</td>
                    <td>{item.diskon}</td>
                    <td>
                      <Link
                        to={`/admin/promosi/edit/${item.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => {handleDelete(item.id),
                          console.log("Item yang akan dihapus:", item); // Tambahkan log ini
                        }}
                      >
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
}

export default Promosi;
