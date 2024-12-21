import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditDenda() {
  const [formData, setFormData] = useState({
    keterangan: "",
    reservasi_id: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [reservasi, setReservasi] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("ID ulasan tidak ditemukan");
      return;
    }

    const fetchEditDenda = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/denda-edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            keterangan: response.data.data[0].keterangan || "",
            reservasi_id: response.data.data[0].reservasi_id || "",
          });
        } else {
          setError("Data ulasan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    const fetchReservasi = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/reservasi",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setReservasi(response.data.data);
        } else {
          setError("Data pelanggan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    fetchEditDenda();
    fetchReservasi();
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
        `http://localhost:8000/api/denda/${id}`,
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
          navigate("/admin/denda");
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
      <h2>Edit Denda</h2>
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
          <label htmlFor="select">Reservasi</label>
          <div>
            <select
              id="select"
              name="reservasi_id"
              className="custom-select"
              value={formData.reservasi_id}
              onChange={handleChange}
            >
              <option value="">Pilih Reservasi</option>
              {reservasi.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.tanggal_mulai}
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
export default EditDenda;
