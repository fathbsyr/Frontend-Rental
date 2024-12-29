import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditUlasan() {
  const [formData, setFormData] = useState({
    komentar: "",
    pelanggan_id: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [pelanggan, setPelanggan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("ID ulasan tidak ditemukan");
      return;
    }

    const fetchEditUlasan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/ulasan-edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            komentar: response.data.data[0].komentar || "",
            pelanggan_id: response.data.data[0].pelanggan_id || "",
          });
        } else {
          setError("Data ulasan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    const fetchPelanggan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/pelanggan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setPelanggan(response.data.data);
        } else {
          setError("Data pelanggan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    fetchEditUlasan();
    fetchPelanggan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/ulasan/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil diubah",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/ulasan");
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Data ulasan gagal diubah",
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
      <h2>Edit Ulasan Anda</h2>
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
              <option value="">Pilih Nama Anda</option>
              {pelanggan.map((pel) => (
                <option key={pel.id} value={pel.id}>
                  {pel.nama}
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
export default EditUlasan;
