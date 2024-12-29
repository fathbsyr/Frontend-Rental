import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Brand() {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/brand");
        if (response.data.success) {
          setBrand(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Promosi");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, []);

  useEffect(() => {
    if (!loading && !error && brand.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, brand]);

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
          .delete(`http://localhost:8000/api/brand/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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
    <>
      <div>
        <h1 className="h3 mb-2 text-gray-800">Table Data Brand</h1>
        <p className="mb-4">Tempat Pengelolaan Data Brand</p>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <Link to="/admin/brand/add" className="btn btn-primary btn-sm">
              Tambah Data Brand
            </Link>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error Occurred: {error}</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  ref={tableRef}
                  className="display"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Brand</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>No</th>
                      <th>Nama Brand</th>
                      <th>Aksi</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {brand.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <Link
                            to={`/admin/brand/edit/${item.id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger btn-sm m-2"
                            onClick={() => {
                              handleDelete(item.id),
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Brand;
