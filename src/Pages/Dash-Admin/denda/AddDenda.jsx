import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddDenda() {
  const [formData, setFormData] = useState({
    keterangan: "",
    reservasi_id: "",
  });

  const [reservasi, setReservasi] = useState([]); // State to store reservasi data
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reservasi");
        setReservasi(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchReservasi();
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
        "http://localhost:8000/api/denda/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Perbaiki penulisan Authorization
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        // SweetAlert2 untuk pesan sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/denda");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data gagal ditambahkan.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi Kesalahan!",
        text:
          error.response?.data?.message ||
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Tambah Denda</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Keterangan</label>
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <input
              id="text"
              name="keterangan"
              type="text"
              value={formData.keterangan}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="select">Pelanggan</label>
          <div>
            <select
              id="select"
              name="reservasi_id"
              className="custom-select"
              value={formData.reservasi_id}
              onChange={handleChange}
            >
              <option value="">Pilih Reservasi</option>
              {reservasi.map((item) => ( // Ganti nama variabel di sini
                <option key={item.id} value={item.id}>
                  {item.tanggal_mulai}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDenda;
