import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Mobil = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobil, setMobil] = useState([]);

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mobil");
        if (response.data.success) {
          setMobil(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Mobil");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchMobil();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && mobil.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, mobil]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Serius?",
      text: "Anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:8000/api/mobil/${id}`
          , {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then ((response) => {
          if (response.data.success) {
            Swal.fire({
              title: "Terhapus",
              text: "Data Sudah Terhapus",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Eror!",
              text: "Your file has not been deleted.",
              icon: "error"
            })
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Eror!",
            text: "an error occurred",
            icon: "error"
          });
          console.error("Deleting Error", error);
        })
      }
    });
  }

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Mobil</h1>
      <p className="mb-4">Tempat Pengelolaan Data Mobil</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <Link to="/admin/mobil/add" className="btn btn-primary btn-sm">
            Tambah Data Mobil
          </Link>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Occurred: {error}</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
            <table ref={tableRef} className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Brand</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Ketersediaan</th>
                  <th>Deskripsi</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Brand</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Ketersediaan</th>
                  <th>Deskripsi</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {mobil.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.brand}</td>
                    <td>{item.nama}</td>
                    <td>{item.harga}</td>
                    <td>{item.ketersediaan}</td>
                    <td>{item.deskripsi}</td>
                    <td>
                      <Link to={`/admin/mobil/edit/${item.id}`} className="btn btn-warning btn-sm">Edit</Link>
                      <button className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(item.id)}>
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

export default Mobil;
