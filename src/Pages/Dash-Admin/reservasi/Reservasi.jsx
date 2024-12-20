import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
import Swal from "sweetalert2";
const Reservasi = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservasi, setReservasi] = useState([]);

  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reservasi");
        if (response.data.success) {
          setReservasi(response.data.data);
        } else {
          setError("Gagal Menampilkan Data Reservasi");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchReservasi();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading && !error && reservasi.length > 0) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error, reservasi]);

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
          .delete(`http://localhost:8000/api/reservasi/${id}`, {
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
                title: "Error!",
                text: "Your file has not been deleted.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Terjadi kesalahan",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Reservasi</h1>
      <p className="mb-4">Tempat Pengelolaan Data Reservasi</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <a href="/admin/reservasi/add" className="btn btn-primary btn-sm">
            Tambah Data Reservasi
          </a>
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
                  <th>Pelanggan</th>
                  <th>Mobil</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Akhir</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Pelanggan</th>
                  <th>Mobil</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Akhir</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {reservasi.map((item, index) => (
                  console.log("Data item:", item),
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.pelanggan}</td>
                    <td>{item.mobil}</td>
                    <td>{item.tanggal_mulai}</td>
                    <td>{item.tanggal_akhir}</td>
                    <td>{item.status}</td>
                    <td>
                      <a className="btn btn-warning btn-sm">Edit</a>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => {
                          console.log("Item yang akan dihapus:", item); // Tambahkan log ini
                          handleDelete(item.id);
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
};
export default Reservasi;
