import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditPromosi() {
  const [formData, setFormData] = useState({
    diskon: "",
    mobil_id: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [mobil, setMobil] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("ID ulasan tidak ditemukan");
      return;
    }

    const fetchEditPromosi = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/promosi-edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            diskon: response.data.data[0].diskon || "",
            mobil_id: response.data.data[0].mobil_id || "",
          });
        } else {
          setError("Data ulasan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    const fetchMobil = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/mobil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          setMobil(response.data.data);
        } else {
          setError("Data pelanggan tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    fetchEditPromosi();
    fetchMobil();
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
        `http://localhost:8000/api/promosi/${id}`,
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
          navigate("/admin/promosi");
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
      <h2>Edit Promosi</h2>
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
export default EditPromosi;
