import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddPromosi() {
  const [formData, setFormData] = useState({
    diskon: 0,
    mobil_id: "",
  });
  const [error, setError] = useState(null);
  const [mobil, setMobil] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const mobilResponse = await axios.get(
          "http://localhost:8000/api/mobil"
        );
        setMobil(mobilResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMobil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/promosi/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        // SweetAlert2 untuk pesan sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Data promosi berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/promosi");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data promosi gagal ditambahkan.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text:
          err.response?.data?.message ||
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Tambah Promosi</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Diskon</label>
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <input
              id="text"
              name="diskon"
              type="number"
              min="0"
              value={formData.diskon}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="select">Mobil</label>
          <div>
            <select
              id="select"
              name="mobil_id"
              className="custom-select"
              value={formData.mobil_id}
              onChange={handleChange}
            >
              <option value="">Pilih Mobil</option>
              {mobil.map((mob) => (
                <option key={mob.id} value={mob.id}>
                  {mob.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <button
            name="submit"
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddPromosi;
