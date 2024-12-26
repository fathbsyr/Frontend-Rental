import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddReservasi() {
  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_akhir: "",
    pelanggan_id: "",
    mobil_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [pelanggan, setPelanggan] = useState([]);
  const [mobil, setMobil] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const pelangganResponse = await axios.get(
          "http://localhost:8000/api/pelanggan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const pelangganId = localStorage.getItem("pelanggan_id"); // Ambil id pelanggan dari localStorage
         // Cek ID pelanggan yang digunakan untuk filter
        // Filter denda berdasarkan ID pelanggan yang login
        const filteredPelanggan = pelangganResponse.data.data.filter(
          (pelanggan) => {
            return pelanggan.id === parseInt(pelangganId); // Filter berdasarkan ID pelanggan
          }
        );
        setPelanggan(filteredPelanggan); // Set pelanggan yang sudah difilter
        setFormData({ ...formData, pelanggan_id: filteredPelanggan[0]?.id });
        const mobilResponse = await axios.get(
          "http://localhost:8000/api/mobil",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMobil(mobilResponse.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/reservasi/create",
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
          text: "Data reservasi berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/reservasi");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data reservasi gagal ditambahkan.",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-3 p-3">
      <h2>Buat Reservasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tanggal_mulai">Tanggal Mulai</label>
          <input
            id="tanggal_mulai"
            name="tanggal_mulai"
            type="date"
            value={formData.tanggal_mulai}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tanggal_akhir">Tanggal Akhir</label>
          <input
            id="tanggal_akhir"
            name="tanggal_akhir"
            type="date"
            value={formData.tanggal_akhir}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pelanggan_id">Pilih Nama Anda</label>
          <select
            id="select"
            name="pelanggan_id"
            className="custom-select"
            value={formData.pelanggan_id}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Nama Anda</option>
            {pelanggan.map((pel) => (
              <option key={pel.id} value={pel.id}>
                {pel.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <option value="">Pilih Mobil</option>
          <select
            id="select"
            name="mobil_id"
            className="custom-select"
            value={formData.mobil_id}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Mobil</option>
            {mobil.map((mob) => (
              <option key={mob.id} value={mob.id}>
                {mob.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button
            name="submit"
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Pesan Reservasi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReservasi;
