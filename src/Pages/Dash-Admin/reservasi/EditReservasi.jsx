import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditReservasi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [pelanggan, setPelanggan] = useState([]);
  const [mobil, setMobil] = useState([]);

  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_akhir: "",
    pelanggan_id: "",
    status: "",
    mobil_id: "",
  });

  const statusOptions = [
    { id: 1, value: "pending", label: "Pending" },
    { id: 2, value: "complete", label: "Complete" },
    { id: 3, value: "cancel", label: "Cancel" },
  ];

  useEffect(() => {
    const fetchEditReservasi = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/reservasi-edit/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            tanggal_mulai: response.data.data[0].tanggal_mulai || "",
            tanggal_akhir: response.data.data[0].tanggal_akhir || "",
            pelanggan_id: response.data.data[0].pelanggan_id || "",
            status: response.data.data[0].status || "",
            mobil_id: response.data.data[0].mobil_id || "",
          });
        } else {
          setError("Data reservasi tidak ditemukan");
        }
      } catch (error) {
        setError(error.message || "Api gagal di akses");
      }
    };

    const fetchPelanggan = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/pelanggan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPelanggan(response.data.data);
    };

    const fetchMobil = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/mobil", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMobil(response.data.data);
    };

    if (id) {
      fetchEditReservasi();
      fetchPelanggan();
      fetchMobil();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "id reservasi tidak ditemukan",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      !formData.tanggal_mulai ||
      !formData.tanggal_akhir ||
      !formData.pelanggan_id ||
      !formData.status ||
      !formData.mobil_id
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Harap isi semua field.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8000/api/reservasi/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil diubah.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/reservasi");
        });
      } else {
        throw new Error(response.data.message || "Data reservasi gagal diubah");
      }
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: err.message || "Terjadi Kesalahan",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="m-3 p-3">
      <h2>Edit Reservasi</h2>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="pelanggan_id">Pelanggan</label>
          <select
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
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            className="custom-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Pilih Status</option>
            {statusOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mobil_id">Mobil</label>
          <select
            name="mobil_id"
            className="custom-select"
            value={formData.mobil_id}
            onChange={handleChange}
          >
            <option value="">Pilih Mobil Anda</option>
            {mobil.map((mob) => (
              <option key={mob.id} value={mob.id}>
                {mob.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditReservasi;
