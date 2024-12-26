import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

function AddUlasan() {
  const [formData, setFormData] = useState({
    komentar: "",
    pelanggan_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [pelanggan, setPelanggan] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const token = localStorage.getItem("token");
        const pelangganResponse = await axios.get(
          "http://localhost:8000/api/pelanggan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (pelangganResponse.data.success) {
          const pelangganId = localStorage.getItem("pelanggan_id"); // Ambil id pelanggan dari localStorage
           // Cek ID pelanggan yang digunakan untuk filter

          // Filter denda berdasarkan ID pelanggan yang login
          const filteredPelanggan = pelangganResponse.data.data.filter(
            (pelanggan) => {
              return pelanggan.id === parseInt(pelangganId); // Filter berdasarkan ID pelanggan
            }
          );

          setPelanggan(filteredPelanggan); // Set pelanggan yang sudah difilter
          setFormData({ ...formData, pelanggan_id: filteredPelanggan[0]?.id }); // Set pelanggan_id default
        } else {
          setError(pelangganResponse.data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPelanggan();
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
        "http://localhost:8000/api/ulasan/create",
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
          text: "Data berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/ulasan");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5 p-3">
      <h2>Buat Ulasan</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Komentar</label>
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <input
              id="text"
              name="komentar"
              type="text"
              value={formData.komentar}
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
              name="pelanggan_id"
              className="custom-select"
              value={formData.pelanggan_id}
              onChange={handleChange}
            >
              <option>Pilih Nama Anda</option>
              {pelanggan.map((pel) => (
                <option key={pel.id} value={pel.id}>
                  {pel.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <button name="submit" type="submit" className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Kirim Ulasan"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUlasan;
