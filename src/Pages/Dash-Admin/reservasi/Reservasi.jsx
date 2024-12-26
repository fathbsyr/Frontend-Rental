import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Reservasi = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservasi, setReservasi] = useState([]);

  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/reservasi", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.success) {
          setReservasi(response.data.data);
        } else {
          setError("Gagal menampilkan data reservasi.");
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservasi();
  }, []);

  useEffect(() => {
    if (!loading && !error && reservasi.length > 0 && tableRef.current) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [loading, error, reservasi]);

  const handleDelete = async (id) => {
    if (!id) {
      Swal.fire({
        title: "Error!",
        text: "ID tidak ditemukan.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Serius?",
      text: "Anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire({
            title: "Error!",
            text: "Token tidak ditemukan. Harap login kembali.",
            icon: "error",
          });
          return;
        }

        try {
          const response = await axios.delete(
            `http://localhost:8000/api/reservasi/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            Swal.fire({
              title: "Terhapus",
              text: "Data berhasil dihapus.",
              icon: "success",
            });
            setReservasi((prevReservasi) =>
              prevReservasi.filter((item) => item.id !== id)
            );
          } else {
            Swal.fire({
              title: "Error!",
              text: "Gagal menghapus data.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Terjadi kesalahan saat menghapus data.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Table Data Reservasi</h1>
      <p className="mb-4">Tempat Pengelolaan Data Reservasi</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <Link to="/admin/reservasi/add" className="btn btn-primary btn-sm">
            Tambah Data Reservasi
          </Link>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
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
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.pelanggan}</td>
                    <td>{item.mobil}</td>
                    <td>{item.tanggal_mulai}</td>
                    <td>{item.tanggal_akhir}</td>
                    <td>{item.status}</td>
                    <td>
                    <Link to={`/admin/reservasi/edit/${item.id}`} className="btn btn-warning btn-sm">Edit</Link>

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
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservasi;
